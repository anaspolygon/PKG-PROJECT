export interface PermissionList {
  data: Permissions[]
}

export interface Permissions {
  module: string
  permission: Permission[]
}

export interface Permission {
  id: number
  name: string
  module: string
  label: string
}
