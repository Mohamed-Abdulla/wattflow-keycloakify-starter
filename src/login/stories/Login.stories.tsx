import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login.ftl" });

const meta = {
    title: "Wattflow/Login",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithInvalidCredentials: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                login: { username: "admin@wattflow.io" },
                messagesPerField: {
                    existsError: (fieldName: string, ...others: string[]) =>
                        [fieldName, ...others].some(
                            f => f === "username" || f === "password"
                        ),
                    get: (fieldName: string) =>
                        fieldName === "username" || fieldName === "password"
                            ? "Invalid username or password."
                            : "",
                    getFirstError: (...fieldNames: string[]) =>
                        fieldNames.some(f => f === "username" || f === "password")
                            ? "Invalid username or password."
                            : "",
                    exists: () => false,
                    printIfExists: () => undefined
                }
            }}
        />
    )
};

export const WithSocialProviders: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                social: {
                    displayInfo: true,
                    providers: [
                        {
                            providerId: "google",
                            displayName: "Continue with Google",
                            loginUrl: "#",
                            alias: "google",
                            iconClasses: ""
                        },
                        {
                            providerId: "microsoft",
                            displayName: "Continue with Microsoft",
                            loginUrl: "#",
                            alias: "microsoft",
                            iconClasses: ""
                        }
                    ]
                }
            }}
        />
    )
};

export const WithoutRegistration: Story = {
    render: () => <KcPageStory kcContext={{ realm: { registrationAllowed: false } }} />
};
