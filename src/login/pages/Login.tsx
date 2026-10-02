import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import "../assets/tokens.css";
import "../assets/theme.css";

type LoginKcContext = Extract<KcContext, { pageId: "login.ftl" }>;

export default function Login(props: PageProps<LoginKcContext, I18n>) {
    const { kcContext, i18n } = props;
    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;
    const { msg } = i18n;

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <div className="wf-layout">
            <div className="wf-card">
                {/* Header */}
                <div className="wf-header">
                    <svg className="wf-logo" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                        <path d="M18.5 3L8 18h8l-2.5 11L28 13h-8.5L18.5 3Z" fill="currentColor" />
                    </svg>
                    <span className="wf-brand-name">Wattflow</span>
                    <p className="wf-page-title">Sign in to your account</p>
                </div>

                {/* Global error alert */}
                {messagesPerField.existsError("username", "password") && (
                    <div className="wf-alert wf-alert-error" role="alert">
                        {messagesPerField.getFirstError("username", "password")}
                    </div>
                )}

                {/* Social / IdP buttons */}
                {social?.providers && social.providers.length > 0 && (
                    <>
                        <div className="wf-idp-list">
                            {social.providers.map((provider: { providerId: string; loginUrl: string; displayName: string }) => (
                                <a
                                    key={provider.providerId}
                                    href={provider.loginUrl}
                                    className="wf-idp-btn"
                                    id={`social-${provider.providerId}`}
                                >
                                    {provider.displayName}
                                </a>
                            ))}
                        </div>
                        <div className="wf-divider">or</div>
                    </>
                )}

                {/* Login form */}
                <form id="kc-form-login" action={url.loginAction} method="post" className="wf-form">
                    {/* Username / Email */}
                    {!usernameHidden && (
                        <div className="wf-field">
                            <label htmlFor="username" className="wf-label">
                                {!realm.loginWithEmailAllowed
                                    ? msg("username")
                                    : !realm.registrationEmailAsUsername
                                      ? msg("usernameOrEmail")
                                      : msg("email")}
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                defaultValue={login.username ?? ""}
                                autoFocus
                                className="wf-input"
                                placeholder={realm.loginWithEmailAllowed ? "you@example.com" : "Username"}
                            />
                        </div>
                    )}

                    {/* Password */}
                    <div className="wf-field">
                        <div className="wf-flex-between">
                            <label htmlFor="password" className="wf-label">
                                {msg("password")}
                            </label>
                            {realm.resetPasswordAllowed && (
                                <a href={url.loginResetCredentialsUrl} className="wf-link wf-text-sm">
                                    {msg("doForgotPassword")}
                                </a>
                            )}
                        </div>
                        <div className="wf-password-wrapper">
                            <input
                                id="password"
                                name="password"
                                type={isPasswordVisible ? "text" : "password"}
                                autoComplete="current-password"
                                className="wf-input"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                className="wf-password-toggle"
                                onClick={() => setIsPasswordVisible(v => !v)}
                                aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                            >
                                {isPasswordVisible ? (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Remember me */}
                    {realm.rememberMe && !usernameHidden && (
                        <div className="wf-checkbox-field">
                            <input
                                id="rememberMe"
                                name="rememberMe"
                                type="checkbox"
                                className="wf-checkbox"
                                defaultChecked={!!login.rememberMe}
                            />
                            <label htmlFor="rememberMe" className="wf-checkbox-label">
                                {msg("rememberMe")}
                            </label>
                        </div>
                    )}

                    <input type="hidden" name="credentialId" value={auth.selectedCredential ?? ""} />

                    <button id="kc-login" name="login" type="submit" className="wf-btn wf-btn-primary">
                        {msg("doLogIn")}
                    </button>
                </form>

                {/* Register link */}
                {realm.password && realm.registrationAllowed && !registrationDisabled && (
                    <p className="wf-footer">
                        New to Wattflow?{" "}
                        <a href={url.registrationUrl}>Create an account</a>
                    </p>
                )}
            </div>
        </div>
    );
}
