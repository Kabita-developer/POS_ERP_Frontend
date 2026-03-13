import React, { useState } from 'react';
import { Mail, Lock, LogIn, TrendingUp, Building2, ShieldCheck, ArrowRight } from 'lucide-react';

function Login({ onLogin }) {
    const [email, setEmail] = useState('demo@example.com');
    const [password, setPassword] = useState('password123');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate login delay
        setTimeout(() => {
            setIsSubmitting(false);
            onLogin();
        }, 1500);
    };

    return (
        <div className="login-wrapper">
            <div className="login-visuals">
                <div className="visuals-content">
                    <div className="logo-brand">
                        <Building2 className="brand-icon" />
                        <h2>POS ERP</h2>
                    </div>
                    <h1>Transform Your Business Management.</h1>
                    <p>
                        Streamline your invoicing, accelerate payments, and gain powerful financial insights with our modern billing platform.
                    </p>
                    <div className="features-list">
                        <div className="feature-item">
                            <div className="feature-icon-wrapper"><TrendingUp size={20} /></div>
                            <span>Real-time Financial Analytics</span>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon-wrapper"><ShieldCheck size={20} /></div>
                            <span>Enterprise-grade Security</span>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="decoration-circle top-right"></div>
                <div className="decoration-circle bottom-left"></div>
                <div className="glass-card">
                    <div className="card-header">Monthly Revenue</div>
                    <div className="card-value">$45,230.00</div>
                    <div className="card-trend">+12.5%</div>
                </div>
            </div>

            <div className="login-form-container">
                <div className="form-header">
                    <h2>Welcome Back</h2>
                    <p>Enter your credentials to access your account.</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-with-icon">
                            <Mail className="input-icon" size={20} />
                            <input
                                type="email"
                                id="email"
                                placeholder="you@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="label-row">
                            <label htmlFor="password">Password</label>
                            <a href="#" className="forgot-password">Forgot password?</a>
                        </div>
                        <div className="input-with-icon">
                            <Lock className="input-icon" size={20} />
                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="remember-me">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember me for 30 days</label>
                    </div>

                    <button
                        type="submit"
                        className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="loader"></span>
                        ) : (
                            <>
                                Sign In <LogIn size={20} className="btn-icon" />
                            </>
                        )}
                    </button>
                </form>

                <div className="signup-prompt">
                    Don't have an account? <a href="#" className="signup-link">Create one now <ArrowRight size={16} /></a>
                </div>
            </div>
        </div>
    );
}

export default Login;
