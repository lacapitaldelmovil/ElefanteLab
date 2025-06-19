import { z } from 'zod'

// Contact form schema
export const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un email válido'),
  company: z.string().optional(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  service: z.enum(['web-design', 'branding', 'digital-marketing', 'consulting', 'other'])
})

export type ContactFormData = z.infer<typeof contactSchema>