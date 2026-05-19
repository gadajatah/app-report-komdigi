import inertia from "@inertiajs/vite"
import { wayfinder } from "@laravel/vite-plugin-wayfinder"
import optimizeLocales from "@react-aria/optimize-locales-plugin"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import laravel from "laravel-vite-plugin"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.ts"],
            refresh: true,
        }),
        inertia(),
        react({
            babel: {
                plugins: ["babel-plugin-react-compiler"],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true
        }),
        {
            ...optimizeLocales.vite({
                locales: ["en-US", "fr-FR"],
            }),
            enforce: "pre",
        },
    ],
})
