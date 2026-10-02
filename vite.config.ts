import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        keycloakify({
            themeName: "wattflow",
            themeVersion: "1.0.0",
            // Keycloak 26.x resources baseline
            loginThemeResourcesFromKeycloakVersion: "26.0.0",
            // Enable both login + account console theming
            accountThemeImplementation: "Multi-Page",
        })
    ]
});
