import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, ShieldEllipsis, ArrowRight, RefreshCcw, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface QuizQuestion {
  id: string;
  questionKey: string;
  options: {
    labelKey: string;
    value: string;
    scoreWeight: number;
  }[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'breadwinner',
    questionKey: 'quiz_breadwinner',
    options: [
      { labelKey: 'yes', value: 'yes', scoreWeight: 10 },
      { labelKey: 'no', value: 'no', scoreWeight: 0 },
    ],
  },
  {
    id: 'dependents',
    questionKey: 'quiz_dependents',
    options: [
      { labelKey: 'none', value: '0', scoreWeight: 0 },
      { labelKey: '1_2', value: '1-2', scoreWeight: -10 },
      { labelKey: '3_plus', value: '3+', scoreWeight: -20 },
    ],
  },
  {
    id: 'insuranceGap',
    questionKey: 'quiz_insurance_gap',
    options: [
      { labelKey: 'none', value: 'none', scoreWeight: 10 },
      { labelKey: 'partial', value: 'partial', scoreWeight: -5 },
      { labelKey: 'significant', value: 'significant', scoreWeight: -20 },
    ],
  },
  {
    id: 'life_changes',
    questionKey: 'quiz_life_changes',
    options: [
      { labelKey: 'yes', value: 'yes', scoreWeight: -15 },
      { labelKey: 'no', value: 'no', scoreWeight: 0 },
    ],
  },
];

interface LeadMagnetQuizProps {
  onComplete: (data: { score: number; riskLevel: string }) => void;
}

const LeadMagnetQuiz: React.FC<LeadMagnetQuizProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(((currentStep + 1) / QUESTIONS.length) * 100);
  }, [currentStep]);

  const handleOptionSelect = (scoreWeight: number) => {
    const newAnswers = { ...answers, [QUESTIONS[currentStep].id]: scoreWeight };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<string, number>) => {
    let score = 70; // Base score
    Object.values(finalAnswers).forEach(weight => {
      score += weight;
    });

    // Clamp score
    score = Math.max(0, Math.min(100, score));

    let riskLevel = 'MEDIUM';
    if (score < 40) riskLevel = 'HIGH';
    else if (score > 75) riskLevel = 'LOW';

    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'lead_magnet_completed', {
        'event_category': 'engagement',
        'event_label': riskLevel,
        'value': score
      });
    }

    setIsFinished(true);
    onComplete({ score, riskLevel });
  };

  const restartQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsFinished(false);
  };

  const getRiskInfo = () => {
    let score = 0;
    Object.values(answers).forEach(w => score += w);
    score += 70;
    score = Math.max(0, Math.min(100, score));

    if (score < 40) {
      return {
        label: t('high_risk'),
        color: 'text-red-500',
        bg: 'bg-red-500/10',
        icon: <ShieldAlert className="w-12 h-12 text-red-500" />, description: t('you_may_need_comprehensive_coverage')
      };
    }
    if (score > 75) {
      return {
        label: t('low_risk'),
        color: 'text-green-500',
        bg: 'bg-green-500/10',
        icon: <ShieldCheck className="w-12 h-12 text-green-500" />, description: t('consider_maintaining_current_plan')
      };
    }
    return {
      label: t('medium_risk'),
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
      icon: <ShieldEllipsis className="w-12 h-12 text-yellow-500" />, description: t('consider_optimizing_existing_coverage')
    };
  };

  const calculateFinalScore = () => {
    let score = 0;
    Object.values(answers).forEach(w => score += w);
    score += 70;
    return Math.max(0, Math.min(100, score));
  };

  return (
    <div className="w-full max-w-xl mx-auto glass-card border-primary/10 overflow-hidden rounded-3xl shadow-2xl">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key="quiz-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-8 md:p-10"
          >
            {/* Progress Header */}
            <div className="flex justify-between items-center mb-8">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
                {t('step_of', { current: currentStep + 1, total: QUESTIONS.length })}
              </span>
              <div className="h-1.5 w-32 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 leading-tight">
              {t(QUESTIONS[currentStep].questionKey)}
            </h3>

            <div className="grid grid-cols-1 gap-4 mt-8">
              {QUESTIONS[currentStep].options.map((opt) => (
                <motion.button
                  key={opt.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionSelect(opt.scoreWeight)}
                  className={cn(
                    'w-full h-14 justify-between px-6 text-base font-medium rounded-2xl transition-all group',
                    'border-2 border-slate-200 dark:border-slate-700',
                    'hover:border-primary hover:bg-primary/5 hover:text-primary'
                  )}
                >
                  <span>{t(opt.labelKey)}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quiz-result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 md:p-12 text-center"
          >
            <div className={cn("inline-flex items-center justify-center p-4 rounded-full mb-6", getRiskInfo().bg)}>
              {getRiskInfo().icon}
            </div>

            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
              {t('your_risk_score')}: <span className={getRiskInfo().color}>{calculateFinalScore()}</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium mb-2">
              {t('risk_level_assessment', { level: getRiskInfo().label })}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              {getRiskInfo().description}
            </p>

            <div className="space-y-4">
              <button
                onClick={() => {
                  if ((window as any).triggerLeadMagnetHandoff) {
                    (window as any).triggerLeadMagnetHandoff({
                      score: calculateFinalScore(),
                      riskLevel: getRiskInfo().label
                    });
                  }
                }}
                className="w-full h-14 bg-primary text-white text-lg font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                <FileText className="w-5 h-5" />
                {t('get_personalized_report')}
              </button>

              <button
                onClick={restartQuiz}
                className="w-full h-12 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors rounded-xl font-medium flex items-center justify-center gap-2"
              >
                <RefreshCcw className="w-4 h-4" />
                {t('re_calculate')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeadMagnetQuiz;
