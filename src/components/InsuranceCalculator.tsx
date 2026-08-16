import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface InsuranceCalculatorProps {
  className?: string;
}

const InsuranceCalculator: React.FC<InsuranceCalculatorProps> = ({ className }) => {
  const [policyType, setPolicyType] = useState<'life' | 'health' | 'motor' | 'term'>('life');
  const [age, setAge] = useState(35);
  const [coverage, setCoverage] = useState(500000);
  const [termLength, setTermLength] = useState(20);
  const [premium, setPremium] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const calculatePremium = () => {
    let baseRate = 0;
    
    switch (policyType) {
      case 'life':
        baseRate = 0.0005;
        break;
      case 'health':
        baseRate = 0.0008;
        break;
      case 'motor':
        baseRate = 0.0012;
        break;
      case 'term':
        baseRate = 0.0007;
        break;
    }

    // Adjust for age
    const ageFactor = age < 30 ? 0.8 : age > 50 ? 1.2 : 1;
    
    // Adjust for term length (for term policies only)
    const termFactor = policyType === 'term' ? (termLength / 20) : 1;
    
    // Calculate premium
    const calculatedPremium = coverage * baseRate * ageFactor * termFactor;
    setPremium(Math.round(calculatedPremium));
    setShowResult(true);
  };

  const resetCalculator = () => {
    setShowResult(false);
    setPremium(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br from-white to-blue-50 rounded-3xl border border-blue-100 shadow-2xl overflow-hidden ${className}`}
    >
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Policy Type Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Policy Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPolicyType('life')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${policyType === 'life' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                Life
              </button>
              <button
                onClick={() => setPolicyType('health')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${policyType === 'health' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                Health
              </button>
              <button
                onClick={() => setPolicyType('motor')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${policyType === 'motor' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                Motor
              </button>
              <button
                onClick={() => setPolicyType('term')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${policyType === 'term' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                Term
              </button>
            </div>
          </div>

          {/* Age Slider */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="18"
                max="80"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-blue-200 to-blue-400 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-slate-900 font-medium w-12 text-right">{age}</span>
            </div>
          </div>

          {/* Coverage Amount */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Coverage Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
              <input
                type="number"
                min="100000"
                max="10000000"
                step="100000"
                value={coverage}
                onChange={(e) => setCoverage(parseInt(e.target.value))}
                className="w-full pl-8 pr-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              />
            </div>
          </div>

          {/* Term Length (only for term policies) */}
          {policyType === 'term' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Term Length (Years)</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={termLength}
                  onChange={(e) => setTermLength(parseInt(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-blue-200 to-blue-400 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-slate-900 font-medium w-12 text-right">{termLength}</span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={calculatePremium}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
          >
            Calculate Premium
          </button>
          <button
            onClick={resetCalculator}
            className="px-4 py-3 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 shadow-sm"
          >
            Reset
          </button>
        </div>

        {/* Result Display */}
        {showResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8l3 5m0 0l3-5m-3 5v4"/></svg>
              </div>
              <h3 className="text-lg font-semibold text-blue-800">Estimated Premium</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">₹{premium.toLocaleString()}</p>
            <p className="text-sm text-slate-600 mt-2">This is an estimate based on your inputs. Actual premium may vary.</p>
            <div className="mt-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <p className="text-sm text-slate-600">For exact quotes, please consult with an insurance advisor.</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default InsuranceCalculator;
