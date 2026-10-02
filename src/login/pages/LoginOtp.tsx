import type { PageProps } from "keycloakify/login/pages/LoginOtp";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import "../assets/tokens.css";
import "../assets/theme.css";

export default function LoginOtp(
    props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>
) {
    const { kcContext, i18n } = props;
    const { url, otpLogin, messagesPerField } = kcContext;
    const { msg } = i18n;

    return (
        <div className="wf-layout">
            <div className="wf-card">
                <div className="wf-header">
                    <svg className="wf-logo" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                        <path d="M18.5 3L8 18h8l-2.5 11L28 13h-8.5L18.5 3Z" fill="currentColor" />
                    </svg>
                    <span className="wf-brand-name">Wattflow</span>
                    <p className="wf-page-title">Two-factor authentication</p>
                </div>

                <p className="wf-text-sm wf-text-muted" style={{ textAlign: "center" }}>
                    Enter the one-time code from your authenticator app.
                </p>

                {messagesPerField.existsError("totp") && (
                    <div className="wf-alert wf-alert-error" role="alert">
                        {messagesPerField.getFirstError("totp")}
                    </div>
                )}

                <form id="kc-otp-login-form" action={url.loginAction} method="post" className="wf-form">
                    {otpLogin.userOtpCredentials.length > 1 && (
                        <div className="wf-field">
                            <label className="wf-label">Select authenticator</label>
                            {otpLogin.userOtpCredentials.map((otpCredential, index) => (
                                <div key={otpCredential.id} className="wf-checkbox-field">
                                    <input
                                        id={`kc-otp-credential-${index}`}
                                        type="radio"
                                        name="selectedCredentialId"
                                        value={otpCredential.id}
                                        defaultChecked={otpCredential.id === otpLogin.selectedCredentialId}
                                        className="wf-checkbox"
                                    />
                                    <label htmlFor={`kc-otp-credential-${index}`} className="wf-checkbox-label">
                                        {otpCredential.userLabel}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="wf-field">
                        <label htmlFor="otp" className="wf-label">{msg("loginOtpOneTime")}</label>
                        <input
                            id="otp"
                            name="totp"
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            autoFocus
                            className="wf-input wf-otp-input"
                            placeholder="000000"
                            maxLength={8}
                        />
                    </div>

                    <button id="kc-login" type="submit" className="wf-btn wf-btn-primary">
                        Verify
                    </button>
                </form>
            </div>
        </div>
    );
}
