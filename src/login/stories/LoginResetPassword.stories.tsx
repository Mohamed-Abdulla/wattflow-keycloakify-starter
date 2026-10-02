import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-reset-password.ftl" });

const meta = {
    title: "Wattflow/Reset Password",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithError: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                messagesPerField: {
                    existsError: (fieldName: string) => fieldName === "username",
                    get: (fieldName: string) =>
                        fieldName === "username" ? "Username not found." : "",
                    getFirstError: (...fieldNames: string[]) =>
                        fieldNames.includes("username") ? "Username not found." : "",
                    exists: () => false,
                    printIfExists: () => undefined
                }
            }}
        />
    )
};
