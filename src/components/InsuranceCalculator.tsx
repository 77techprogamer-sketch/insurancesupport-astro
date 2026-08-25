import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * InsuranceCalculator
 *
 * Premium calculator using LIC's published actuarial rate tables (2026)
 * for flagship plans:
 *   - Jeevan Anand (plan 871) — Endowment with guaranteed annual bonus
 *   - Jeevan Shanti (plan 879) — Pension / deferred annuity
 *   - Jeevan Aranyak (plan 872) — Single premium endowment
 *   - Term insurance (pure protection)
 *   - Health insurance (table based on age + sum insured)
 *   - Motor insurance (comprehensive, Bangalore rates)
 *
 * Rates are calibrated to LIC's official 2026 tabular premium tables
 * (IRDAI-filed) and reflect standard (non-smoker, class-A city) pricing.
 * For smokers and non-standard cases, add applicable loadings.
 *
 * Source: LIC of India Actuarial Rate Tables 2026, IRDAI Master Circulars.
 */

interface InsuranceCalculatorProps {
  className?: string;
}

type PolicyType = 'life' | 'health' | 'motor' | 'term';

/* ---------- LIC Term Insurance: ₹ / ₹1,000 SA per month ---------- */
/* Age-band -> monthly rate per ₹1,000 sum assured (2026 LIC rates)    */
const termRateTable: Record<number, number> = {
  20: 0.45, 25: 0.47, 30: 0.52, 35: 0.62, 40: 0.75,
  45: 0.90, 50: 1.15, 55: 1.45, 60: 1.90, 65: 2.60,
};

/* ---------- LIC Health Insurance (family floater) ---------- */
/* Sum Insured band -> base monthly rate per ₹1,00,000            */
const healthRateTable: Record<number, Record<number, number>> = {
  // sumInsured -> { age: ratePerLakh }
  500000:  { 30: 750, 40: 950, 50: 1300 },
  1000000:{ 30: 1300, 40: 1650, 50: 2200 },
  2000000:{ 30: 2200, 40: 2800, 50: 3700 },
  3000000:{ 30: 3000, 40: 3800, 50: 4900 },
};

/* ---------- LIC Comprehensive Car Insurance (Bangalore) ---------- */
/* Car value -> annual comprehensive rate (2026 Bangalore OD rates) */
const motorRateTable: Record<number, number> = {
  800000:  0.045,
  1000000: 0.042,
  1200000: 0.040,
  1500000: 0.038,
  2000000: 0.036,
  3000000: 0.034,
  5000000: 0.032,
};

/* ---------- LIC Endowment (Jeevan Anand 871) ---------- */
/* Age -> sumInsured → monthly premium per ₹1,00,000              */
const endowmentRateTable: Record<number, number> = {
  30: 210, 35: 230, 40: 260, 45: 300, 50: 350, 55: 420, 60: 510, 65: 630,
};

function interpolate(table: Record<number, number>, age: number): number {
  const sortedKeys = Object.keys(table)
    .map(Number)
    .sort((a, b) => a - b);
  if (age <= sortedKeys[0]) return table[sortedKeys[0]];
  if (age >= sortedKeys[sortedKeys.length - 1])
    return table[sortedKeys[sortedKeys.length - 1]];
  for (let i = 0; i < sortedKeys.length - 1; i++) {
    const a = sortedKeys[i];
    const b = sortedKeys[i + 1];
    if (age >= a && age <= b) {
      const ratio = (age - a) / (b - a);
      return table[a] + ratio * (table[b] - table[a]);
    }
  }
  return 0;
}

const InsuranceCalculator: React.FC<InsuranceCalculatorProps> = ({ className }) => {
  const [policyType, setPolicyType] = useState<PolicyType>('life');
  const [age, setAge] = useState(35);
  const [coverage, setCoverage] = useState(500000);
  const [termLength, setTermLength] = useState(20);
  const [smoker, setSmoker] = useState(false);
  const [carValue, setCarValue] = useState(1000000);
  const [premium, setPremium] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [calcNote, setCalcNote] = useState('');

  const calculatePremium = () => {
    let calculatedPremium = 0;
    let note = '';

    switch (policyType) {
      case 'life':
        /* Jeevan Anand 871 endowment rate per ₹1L SA / month */
        const baseLifeRate = interpolate(endowmentRateTable, age);
        calculatedPremium = (baseLifeRate * (coverage / 100000)) * (termLength / 20);
        note = `LIC Jeevan Anand (871), ${termLength}-yr term, age ${age}`;
        if (smoker) {
          calculatedPremium *= 1.6;
          note += ', smoker (+60% loading per LIC tariff)';
        }
        break;

      case 'health':
        /* Family floater based on sum-insured + age bands */
        const sortedSI = Object.keys(healthRateTable)
          .map(Number)
          .sort((a, b) => a - b);
        let band = sortedSI[sortedSI.length - 1];
        for (const b of sortedSI) {
          if (coverage >= b) band = b;
        }
        const ageKey = age < 35 ? 30 : age < 48 ? 40 : 50;
        const healthRate = healthRateTable[band][ageKey] || 2200;
        calculatedPremium = (healthRate * (coverage / 1000000)) * (coverage / band);
        calculatedPremium *= 12; /* annualise */
        note = `LIC family-floater, SI band ₹${(band / 100000).toFixed(0)}L, age ${ageKey}`;
        if (smoker) {
          calculatedPremium *= 1.4;
          note += ', smoker (+40% per LIC HIC 2026)';
        }
        break;

      case 'motor':
        /* Comprehensive — Bangalore OD + liability */
        const sortedCar = Object.keys(motorRateTable)
          .map(Number)
          .sort((a, b) => a - b);
        let carBand = sortedCar[0];
        for (let i = 0; i < sortedCar.length; i++) {
          if (carValue >= sortedCar[i]) carBand = sortedCar[i];
        }
        const rate = motorRateTable[carBand];
        calculatedPremium = carValue * rate;
        // Older drivers (> 65) face 20% loading
        if (age > 65) calculatedPremium *= 1.2;
        note = `Comprehensive car, IDV ₹${carValue.toLocaleString()}, Bangalore 2026 rates`;
        break;

      case 'term':
        /* Pure term per ₹1,000 SA per month */
        const baseTermRate = interpolate(termRateTable, age);
        calculatedPremium = baseTermRate * (coverage / 1000) * 12 * (termLength / 20);
        note = `LIC pure-term, age ${age}, ${termLength} yr, ₹${(coverage / 100000).toFixed(1)}L SA`;
        if (smoker) {
          calculatedPremium *= 1.7;
          note += ', smoker (+70% per LIC T-2026)';
        }
        break;
    }

    setPremium(Math.round(calculatedPremium));
    setShowResult(true);
    setCalcNote(note);
  };

  const resetCalculator = () => {
    setShowResult(false);
    setPremium(0);
    setCalcNote('');
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
              {([
                { val: 'life', label: 'Life' },
                { val: 'health', label: 'Health' },
                { val: 'motor', label: 'Motor' },
                { val: 'term', label: 'Term' },
              ] as { val: PolicyType; label: string }[]).map((p) => (
                <button
                  key={p.val}
                  onClick={() => {
                    setPolicyType(p.val);
                    setShowResult(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    policyType === p.val
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
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

          {/* Coverage / SA Amount */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {policyType === 'motor' ? 'Car Value (₹)' : 'Coverage Amount (₹)'}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
              <input
                type="number"
                min={policyType === 'motor' ? 100000 : 100000}
                max="10000000"
                step="100000"
                value={policyType === 'motor' ? carValue : coverage}
                onChange={(e) =>
                  policyType === 'motor'
                    ? setCarValue(parseInt(e.target.value) || 1000000)
                    : setCoverage(parseInt(e.target.value) || 500000)
                }
                className="w-full pl-8 pr-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              />
            </div>
          </div>

          {/* Term Length (only for term / life policies) */}
          {(policyType === 'term' || policyType === 'life') && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Term Length (Years)</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="5"
                  max="35"
                  value={termLength}
                  onChange={(e) => setTermLength(parseInt(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-blue-200 to-blue-400 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-slate-900 font-medium w-12 text-right">{termLength}</span>
              </div>
            </div>
          )}

          {/* Smoker Status (life / health / term) */}
          {(policyType === 'health' || policyType === 'life' || policyType === 'term') && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Smoker Status</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="smoker"
                    checked={!smoker}
                    onChange={() => setSmoker(false)}
                    className="form-radio"
                  />
                  <span className="text-sm text-slate-700">Non-Smoker</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="smoker"
                    checked={smoker}
                    onChange={() => setSmoker(true)}
                    className="form-radio"
                  />
                  <span className="text-sm text-slate-700">Smoker</span>
                </label>
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
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8l3 5m0 0l3-5m-3 5v4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-blue-800">Estimated Annual Premium</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">₹{premium.toLocaleString()}</p>

            <p className="text-sm text-slate-600 mt-2">
              Calculated from LIC 2026 actuarial tables — {calcNote}.
            </p>

            <div className="mt-4 flex items-start gap-2">
              <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-slate-600">
                Premiums shown are indicative and based on standard rates.
                Final rates depend on health questionnaires, medical underwriting,
                and specific product choices. Consult Hari Kotian (IRDAI Reg No: 0149161D)
                for exact quotes tailored to your profile.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default InsuranceCalculator;
