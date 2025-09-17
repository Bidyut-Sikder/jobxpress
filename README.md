# JobXpress

**JobXpress** is a modern **job portal application** built with **Next.js 15**, **TypeScript**, and **Prisma**.  
It provides a seamless platform for **organizations** to post jobs and for **job seekers** to find and apply for opportunities.  

---

## 📝 Project Description

JobXpress connects employers with job seekers through a simple and efficient portal:

- **User Roles**:
  - **Organization**:  
    - Can create an account as an employer.  
    - Post job listings with detailed descriptions.  
    - Each job post requires **payment** based on the duration:  
      - Example: 6 days, 30 days, 60 days, 90 days.  
      - Each duration has a **different price**, handled via **Stripe** payments.  
  - **Job Seeker**:  
    - Can create an account as a job seeker.  
    - Browse and apply to job postings.  
    - Manage profile, including CV/resume and application history.  

- **Business Logic**:
  - Organizations must **pay before a job post goes live**.  
  - Job listings automatically **expire after the selected duration**.  
  - Job seekers can submit applications and track their status.  

This makes JobXpress a complete solution for recruitment, simplifying the process of hiring and applying.

---

## 🚀 Features

- ⚡ **Next.js 15** with Turbopack for blazing-fast development  
- 🎨 **TailwindCSS 4** + Radix UI for modern, accessible components  
- 🔒 **Authentication** with NextAuth v5 (Prisma adapter)  
- 💳 **Stripe integration** for job post payments  
- 📨 **Email notifications** with Resend + React Email  
- 📝 **Rich Text Editor** powered by TipTap for job descriptions & profiles  
- ☁️ **File Uploads** via UploadThing (e.g., resumes, logos)  
- ⚙️ **Inngest** for background workflows and events  
- 🌙 Dark mode support with Next Themes  
- ✅ Form validation with React Hook Form + Zod  

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)  
- **Frontend**: React 19, Radix UI, Lucide Icons, TailwindCSS 4  
- **Forms & Validation**: React Hook Form, Zod  
- **Authentication**: NextAuth.js v5 + Prisma Adapter  
- **Database ORM**: Prisma (PostgreSQL recommended)  
- **Payments**: Stripe  
- **Emails**: Resend + React Email  
- **Uploads**: UploadThing  
- **Rich Text**: TipTap Editor  
- **Workflows**: Inngest  
- **Linting**: ESLint (Next.js config), Prettier (optional)  

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/Bidyut-Sikder/jobxpress.git
cd jobxpress


pnpm install
# or
npm install
# or
yarn install

add scripts in package.json for developement

"inngest": "pnpm dlx inngest-cli@latest dev",
"stripe": "stripe listen --forward-to http://localhost:3000/api/webhooks/stripe"


jobxpress/
├── prisma/              # Prisma schema & migrations
├── src/
│   ├── app/             # Next.js app router
│   ├── components/      # Reusable UI components
│   ├── lib/             # Utilities and helpers             
│   └── auth.ts/         # for authentication 
├── public/              # Static assets
├── .env                 # Environment variables
├── package.json
├── tailwind.config.js
└── tsconfig.json

```
# .env

```bash
# auth.js 
AUTH_SECRET=""

# github developer
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

# google cloud console
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# Database
DATABASE_URL=
# DATABASE_URL="postgresql://postgres:bidyut@localhost:5432/postgres"

# Uploadthing
UPLOADTHING_TOKEN=

# Arcjet Key
ARCJET_KEY=ajkey_01k3wv20wvfy8ryg77ae72vb5w

# Stripe Key
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Resend Key
RESEND_API_KEY=

# Localhost
NEXT_PUBLIC_URL='http://localhost:3000'

```

