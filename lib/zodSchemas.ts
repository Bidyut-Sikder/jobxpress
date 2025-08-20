import {z} from 'zod'

export const companySchema=z.object({

    name:z.string().min(2, ' Name must be at least 2 characters'),
    location: z.string().min(1, ' Location must be defiend.'),
    about: z.string().min(10, 'Please provide some information about your company.'),
    logo: z.string().min(1, 'Please provide a logo for your company.'),
    website: z.string().url('Please provide a valid url').min(1, 'Please provide a website for your company.'),
    xAccount: z.string().optional()


})











































