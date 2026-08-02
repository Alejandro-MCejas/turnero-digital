

export const userRole = {
    Admin: 'admin',
    User: 'user',
} as const

export type UserRole = (typeof userRole)[keyof typeof userRole];