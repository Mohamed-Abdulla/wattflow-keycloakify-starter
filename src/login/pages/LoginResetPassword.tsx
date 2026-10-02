import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import "../assets/tokens.css";
import "../assets/theme.css";

type ResetKcContext = Extract<KcContext, { pageId: "login-reset-password.ftl" }>;

export default function LoginResetPassword(props: PageProps<ResetKcContext, I18n>) {
    const { kcContext, i18n } = props;
    const { url, realm, auth, messagesPerField } = kcContext;
    const { msg } = i18n;

    return (
        <div className="wf-layout">
            <div className="wf-card">
                <div className="wf-header">
                    <svg className="wf-logo" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                        <path d="M18.5 3L8 18h8l-2.5 11L28 13h-8.5L18.5 3Z" fill="currentColor" />
                    </svg>
                    <span className="wf-brand-name">Wattflow</span>
                    <p className="wf-page-title">Reset your password</p>
                </div>

                <div className="wf-alert wf-alert-info" role="note">
                    {realm.duplicateEmailsAllowed
                        ? "Enter your username and we'll send you a password reset link."
                        : "Enter your email address and we'll send you a password reset link."}
                </div>

                {messagesPerField.existsError("username") && (
                    <div className="wf-alert wf-alert-error" role="alert">
                        {messagesPerField.getFirstError("username")}
                    </div>
                )}

                <form id="kc-reset-password-form" action={url.loginAction} method="post" className="wf-form">
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
                            autoFocus
                            autoComplete="username"
                            defaultValue={auth.attemptedUsername ?? ""}
                            className="wf-input"
                            placeholder={realm.loginWithEmailAllowed ? "you@example.com" : "Username"}
                        />
                    </div>

                    <button type="submit" className="wf-btn wf-btn-primary">
                        Send reset link
                    </button>
                </form>

                <p className="wf-footer">
                    <a href={url.loginUrl}>← Back to sign in</a>
                </p>
            </div>
        </div>
    );
}
