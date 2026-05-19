import { createInertiaApp } from "@inertiajs/react"
import { initializeTheme } from "@/hooks/use-theme"
import { route as routeFn } from 'ziggy-js'
import { Ziggy } from './ziggy'

declare global {
  const route: typeof routeFn
}

(window as any).route = (name: any, params?: any, absolute?: boolean) => routeFn(name, params, absolute, Ziggy as any)

const appName = import.meta.env.VITE_APP_NAME || "Laravel"
createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  strictMode: true,
  progress: {
    color: "#4B5563",
  },
})

initializeTheme()
