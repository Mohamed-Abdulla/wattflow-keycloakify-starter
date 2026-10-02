import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";

// Wattflow custom pages
const Login = lazy(() => import("./pages/Login"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));
const LoginOtp = lazy(() => import("./pages/LoginOtp"));
const Error = lazy(() => import("./pages/Error"));

// Keycloakify default for all other pages (register, update-profile, etc.)
const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;
    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    // ── Wattflow custom pages ──────────────────────────────
                    case "login.ftl":
                        return <Login kcContext={kcContext} i18n={i18n} classes={classes} Template={Template} doUseDefaultCss={false} />;
                    case "login-reset-password.ftl":
                        return <LoginResetPassword kcContext={kcContext} i18n={i18n} classes={classes} Template={Template} doUseDefaultCss={false} />;
                    case "login-otp.ftl":
                        return <LoginOtp kcContext={kcContext} i18n={i18n} classes={classes} Template={Template} doUseDefaultCss={false} />;
                    case "error.ftl":
                        return <Error kcContext={kcContext} i18n={i18n} classes={classes} Template={Template} doUseDefaultCss={false} />;

                    // ── Keycloakify defaults for everything else ───────────
                    // (Register, update-profile, terms, etc. — themed via CSS override)
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
