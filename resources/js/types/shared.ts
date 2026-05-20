import type { Auth } from "./auth"

export type FlashProps = {
  type: string
  message: string
}

export interface SharedData {
  name: string
  quote: { message: string; author: string }
  auth:  Auth & {
    roles: string[]
    permissions: string[]
  }
  roles_data: string[]
  permissions: string[]
  sidebarOpen: boolean
  flash: FlashProps

  [key: string]: unknown
}
