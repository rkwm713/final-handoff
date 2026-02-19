import { useState, useEffect } from 'react';
import './PayWall.css';

export default function PayWall({ children }) {
  const [showPaywall, setShowPaywall] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Check if user has already "subscribed"
    const hasSubscription = localStorage.getItem('techserv_premium_subscriber');
    if (!hasSubscription) {
      // Small delay before showing paywall for dramatic effect
      const timer = setTimeout(() => {
        setShowPaywall(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubscribe = (plan) => {
    setSelectedPlan(plan);
    setProcessing(true);
    
    // Fake processing delay
    setTimeout(() => {
      setProcessing(false);
      setShowSuccess(true);
      
      // Save subscription to localStorage
      localStorage.setItem('techserv_premium_subscriber', 'true');
      localStorage.setItem('techserv_subscription_plan', plan);
      localStorage.setItem('techserv_subscription_date', new Date().toISOString());
      
      // Close paywall after showing success
      setTimeout(() => {
        setShowPaywall(false);
      }, 2500);
    }, 2000);
  };

  if (!showPaywall) {
    return children;
  }

  return (
    <>
      {children}
      <div className="paywall-overlay">
        <div className="paywall-modal">
          {!processing && !showSuccess && (
            <>
              <div className="paywall-header">
                <div className="paywall-logo">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="paywall-icon">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  <span>TechServ Docs</span>
                </div>
                <h1>Premium Documentation Access</h1>
                <p className="paywall-subtitle">
                  You've reached the limit of free documentation views.
                  Subscribe to continue accessing this knowledge base.
                </p>
              </div>

              <div className="paywall-plans three-plans">
                <div 
                  className={`plan-card ${selectedPlan === 'paygo' ? 'selected' : ''}`}
                  onClick={() => setSelectedPlan('paygo')}
                >
                  <div className="plan-badge">FLEXIBLE</div>
                  <h3>Pay As You Go</h3>
                  <div className="plan-price">
                    <span className="price">$5</span>
                    <span className="period">/minute</span>
                  </div>
                  <ul className="plan-features">
                    <li>Unlimited page views</li>
                    <li>Real-time billing</li>
                    <li>No commitment</li>
                  </ul>
                  <div className="plan-note">
                    Billed every 60 seconds
                  </div>
                </div>

                <div 
                  className={`plan-card recommended ${selectedPlan === 'monthly' ? 'selected' : ''}`}
                  onClick={() => setSelectedPlan('monthly')}
                >
                  <div className="plan-badge best">BEST VALUE</div>
                  <h3>Monthly Pro</h3>
                  <div className="plan-price">
                    <span className="price">$20</span>
                    <span className="period">/month</span>
                  </div>
                  <ul className="plan-features">
                    <li>Unlimited access</li>
                    <li>All documentation</li>
                    <li>Priority updates</li>
                    <li>24/7 support</li>
                  </ul>
                  <div className="plan-savings">
                    Save $280/hour vs Pay As You Go!
                  </div>
                </div>

                <div 
                  className={`plan-card cheapskate ${selectedPlan === 'free' ? 'selected' : ''}`}
                  onClick={() => setSelectedPlan('free')}
                >
                  <div className="plan-badge lame">CHEAPSKATE</div>
                  <h3>Free</h3>
                  <div className="plan-price">
                    <span className="price">$0</span>
                    <span className="period">/forever</span>
                  </div>
                  <ul className="plan-features">
                    <li>Basic access</li>
                    <li>Limited features</li>
                    <li>No support</li>
                  </ul>
                  <div className="plan-shame">
                    If you're too cheap...
                  </div>
                </div>
              </div>

              <button 
                className="paywall-subscribe-btn"
                disabled={!selectedPlan}
                onClick={() => handleSubscribe(selectedPlan)}
              >
                {selectedPlan 
                  ? `Subscribe to ${selectedPlan === 'monthly' ? 'Monthly Pro' : selectedPlan === 'free' ? 'Free Plan' : 'Pay As You Go'}` 
                  : 'Select a Plan to Continue'}
              </button>

              <div className="paywall-footer">
                <p>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                  </svg>
                  Secure payment processing by TechServ Financial Services
                </p>
                <p className="paywall-legal">
                  By subscribing you agree to our Terms of Service and acknowledge 
                  that your card will be charged immediately.
                </p>
              </div>
            </>
          )}

          {processing && (
            <div className="paywall-processing">
              <div className="spinner"></div>
              <h2>Processing Payment...</h2>
              <p>Please wait while we verify your payment details</p>
              <div className="fake-card">
                <span>VISA ****4242</span>
              </div>
              {selectedPlan === 'free' && (
                <div className="processing-charge">
                  Charging: <strong>$20.00/month</strong> to your card...
                </div>
              )}
            </div>
          )}

          {showSuccess && (
            <div className="paywall-success">
              <div className="success-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <h2>Welcome, Premium Member!</h2>
              <p>Your subscription is now active.</p>
              <p className="success-note">Just kidding, Steve! It's all free. 😄</p>
              <p className="success-note">Good luck with everything! - Ryan</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
