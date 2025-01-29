import { useAuth } from './auth-context'
import { ROLE_PERMISSIONS, Permission } from '@/lib/constants/roles'

export function usePermissions() {
  const { user } = useAuth()
  
  const hasPermission = (permission: Permission) => {
    if (!user) return false
    
    const rolePermissions = ROLE_PERMISSIONS[user.role]
    if (!rolePermissions) return false
    
    return rolePermissions.permissions.includes(permission)
  }

  return {
    hasPermission,
    permissions: user ? ROLE_PERMISSIONS[user.role]?.permissions : []
  }
}