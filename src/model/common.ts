import * as z from 'zod'

const maxDecimal = 99_999_999.99

export const PositiveDecimal = z.string().min(1)
export type PositiveDecimal = z.infer<typeof PositiveDecimal>

// TODO: Why do we need 2 types for decimal entity? Can we join them?
export const PositiveDecimalNumber = z.number().min(0).max(maxDecimal)
export type PositiveDecimalNumber = z.infer<typeof PositiveDecimalNumber>

export const Price = z.string().min(1)
export type Price = z.infer<typeof Price>

// TODO: Why do we need 2 types for decimal entity? Can we join them?
// TODO: I would prefer using js-big-decimal for money
export const PriceNumber = z.number().min(0).max(maxDecimal)
export type PriceNumber = z.infer<typeof PriceNumber>

export const EmailAddress = z
  .string()
  .min(4)
  .max(256)
  .regex(/.*@.*\.[a-z]*/)
export type EmailAddress = z.infer<typeof EmailAddress>

// TODO: Add pattern list when it'll be added on server-side
export const PhoneNumber = z.string().min(4).max(20)
export type PhoneNumber = z.infer<typeof PhoneNumber>

export const DisplayName = z.string().min(4).max(50)
export type DisplayName = z.infer<typeof DisplayName>

export const FreeFormText = z.string().min(1).max(3000)
export type FreeFormText = z.infer<typeof FreeFormText>

export const Password = z.string().min(6).max(16)
export type Password = z.infer<typeof Password>

export const UserLanguage = z.enum(['en', 'ru', 'et'])
export type UserLanguage = z.infer<typeof UserLanguage>
