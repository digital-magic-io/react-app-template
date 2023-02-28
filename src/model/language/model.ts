import * as z from 'zod'

export const UserLanguage = z.enum(['en', 'ru', 'et'])
export type UserLanguage = z.infer<typeof UserLanguage>
