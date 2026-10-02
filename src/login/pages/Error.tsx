import type { PageProps } from "keycloakify/login/pages/Error";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import "../assets/tokens.css";
import "../assets/theme.css";

export default function Error(
    props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>
) {
    const { kcContext, i18n } = props;
    const { message, client } = kcContext;
    const { msg } = i18n;

    return (
        <div className="wf-layout">
            <div className="wf-card">
                <div className="wf-header">
                    <svg className="wf-logo" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                        <path d="M18.5 3L8 18h8l-2.5 11L28 13h-8.5L18.5 3Z" fill="currentColor" />
                    </svg>
                    <span className="wf-brand-name">Wattflow</span>
                    <p className="wf-page-title">Authentication error</p>
                </div>

                <div className="wf-alert wf-alert-error" role="alert">
                    {message.summary}
                </div>

                {client?.baseUrl && (
                    <p className="wf-footer">
                        <a href={client.baseUrl}>← Back to Wattflow</a>
                    </p>
                )}
            </div>
        </div>
    );
}
