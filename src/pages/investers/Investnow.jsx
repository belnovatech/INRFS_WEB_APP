import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useInvestorData, formatINR } from "./InvestorDataContext";
import "../../Styles/Investor/InvestNow.css";

const quickAmounts = [100000, 500000, 1000000, 2500000];

const tenureOptions = [
  { months: 6, rate: 11 },
  { months: 12, rate: 12 },
  { months: 24, rate: 12.5 },
  { months: 36, rate: 13 },
];

export default function InvestNow() {
  const navigate = useNavigate();
  const { addInvestment } = useInvestorData();

  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(500000);
  const [tenure, setTenure] = useState(12);
  const [processing, setProcessing] = useState(false);
  const [createdBond, setCreatedBond] = useState(null);

  const selectedTenure = tenureOptions.find((t) => t.months === tenure);

  const { monthlyInterest, totalInterest, maturityAmount } = useMemo(() => {
    const monthly = Math.round((amount * (selectedTenure.rate / 100)) / 12);
    const total = monthly * tenure;
    return { monthlyInterest: monthly, totalInterest: total, maturityAmount: amount + total };
  }, [amount, tenure, selectedTenure]);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      const inv = addInvestment({ amount, rateValue: selectedTenure.rate, tenure });
      setCreatedBond(inv);
      setProcessing(false);
      setStep(3);
    }, 900);
  };

  const steps = [
    { num: 1, label: "Investment Details" },
    { num: 2, label: "Payment" },
    { num: 3, label: "Confirmation" },
  ];

  return (
    <div className="investor-page">
      <p className="investor-page-subtitle">Start a new investment and earn competitive returns</p>

      <div className="invest-layout">
        <div className="invest-form-card">
          <div className="invest-stepper">
            {steps.map((s, i) => (
              <React.Fragment key={s.num}>
                <div className={`invest-step${step >= s.num ? " invest-step--active" : ""}`}>
                  <span className="invest-step__num">
                    {step > s.num ? <CheckCircle2 size={16} /> : s.num}
                  </span>
                  <span className="invest-step__label">{s.label}</span>
                </div>
                {i < steps.length - 1 && <div className="invest-step__connector" />}
              </React.Fragment>
            ))}
          </div>

          {step === 1 && (
            <>
              <label className="invest-field-label" htmlFor="amount">
                Investment Amount (₹) <span className="invest-required">*</span>
              </label>
              <div className="invest-amount-input">
                <span>₹</span>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value) || 0)}
                />
              </div>

              <div className="invest-quick-amounts">
                {quickAmounts.map((val) => (
                  <button
                    key={val}
                    type="button"
                    className={`invest-chip${amount === val ? " invest-chip--active" : ""}`}
                    onClick={() => setAmount(val)}
                  >
                    {formatINR(val)}
                  </button>
                ))}
              </div>

              <p className="invest-field-label">Investment Tenure</p>
              <div className="invest-tenure-grid">
                {tenureOptions.map((t) => (
                  <button
                    key={t.months}
                    type="button"
                    className={`invest-tenure-card${tenure === t.months ? " invest-tenure-card--active" : ""}`}
                    onClick={() => setTenure(t.months)}
                  >
                    <span className="invest-tenure-card__months">{t.months}</span>
                    <span className="invest-tenure-card__unit">Months</span>
                    <span className="invest-tenure-card__rate">{t.rate}% p.a.</span>
                  </button>
                ))}
              </div>

              <div className="invest-form-actions">
                <button className="investor-btn investor-btn--outline" onClick={() => navigate("/investor/dashboard")}>
                  &lt; Cancel
                </button>
                <button
                  className="investor-btn investor-btn--primary"
                  disabled={amount <= 0}
                  onClick={() => setStep(2)}
                >
                  Continue to Payment &gt;
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <div className="invest-payment-step">
              <p className="invest-field-label">Choose Payment Method</p>
              <div className="invest-payment-options">
                <label className="invest-payment-option invest-payment-option--active">
                  <input type="radio" name="pay" defaultChecked /> Net Banking
                </label>
                <label className="invest-payment-option">
                  <input type="radio" name="pay" /> UPI
                </label>
                <label className="invest-payment-option">
                  <input type="radio" name="pay" /> NEFT / RTGS
                </label>
              </div>
              <p className="invest-payment-note">
                You're about to pay <strong>{formatINR(amount)}</strong> for a {tenure}-month bond at{" "}
                {selectedTenure.rate}% p.a.
              </p>
              <div className="invest-form-actions">
                <button className="investor-btn investor-btn--outline" onClick={() => setStep(1)}>
                  &lt; Back
                </button>
                <button className="investor-btn investor-btn--primary" onClick={handlePay} disabled={processing}>
                  {processing ? "Processing..." : `Pay ${formatINR(amount)}`}
                </button>
              </div>
            </div>
          )}

          {step === 3 && createdBond && (
            <div className="invest-confirmation-step">
              <span className="invest-confirmation-icon">
                <CheckCircle2 size={40} />
              </span>
              <p className="invest-confirmation-title">Investment Successful!</p>
              <p className="invest-confirmation-sub">
                Bond <strong className="mono">{createdBond.bond}</strong> has been created and will reflect in
                your dashboard, bonds and investments right away.
              </p>
              <div className="invest-form-actions invest-form-actions--center">
                <button className="investor-btn investor-btn--outline" onClick={() => navigate("/investor/my-bonds")}>
                  View My Bonds
                </button>
                <button className="investor-btn investor-btn--primary" onClick={() => navigate("/investor/dashboard")}>
                  Go to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="invest-summary-card">
          <p className="investor-section__title">Investment Summary</p>
          <div className="invest-summary-row">
            <span>Principal Amount</span>
            <span className="mono">{formatINR(amount)}</span>
          </div>
          <div className="invest-summary-row">
            <span>Annual Interest Rate</span>
            <span className="mono">{selectedTenure.rate}% per annum</span>
          </div>
          <div className="invest-summary-row">
            <span>Tenure</span>
            <span className="mono">{tenure} months</span>
          </div>
          <div className="invest-summary-row">
            <span>Monthly Interest</span>
            <span className="mono">{formatINR(monthlyInterest)}</span>
          </div>
          <div className="invest-summary-row">
            <span>Total Interest</span>
            <span className="mono">{formatINR(totalInterest)}</span>
          </div>
          <div className="invest-summary-row invest-summary-row--total">
            <span>Maturity Amount</span>
            <span className="mono">{formatINR(maturityAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}