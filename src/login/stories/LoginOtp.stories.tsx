import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-otp.ftl" });

const meta = {
    title: "Wattflow/OTP",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithMultipleAuthenticators: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                otpLogin: {
                    userOtpCredentials: [
                        { id: "cred-1", userLabel: "Authenticator App" },
                        { id: "cred-2", userLabel: "Backup Key" }
                    ],
                    selectedCredentialId: "cred-1"
                }
            }}
        />
    )
};

export const WithError: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                messagesPerField: {
                    existsError: (fieldName: string) => fieldName === "totp",
                    get: (fieldName: string) =>
                        fieldName === "totp" ? "Invalid one-time code." : "",
                    getFirstError: (...fieldNames: string[]) =>
                        fieldNames.includes("totp") ? "Invalid one-time code." : "",
                    exists: () => false,
                    printIfExists: () => undefined
                }
            }}
        />
    )
};
