# Wizz: AI SaaS Platform

## Overview

Welcome to the repository of Wizz, your State-of-the-Art AI SaaS Platform! This project aims to provide users with a comprehensive suite of AI tools, including an AI assistant, code helper, image generator, video generator, and music generator. Powered by Next.js 14 App Router, our platform prioritizes efficiency and user-centric design.

## Technologies Used

- **Frontend**: React, Next.js 14 App Router, Tailwind CSS
- **Backend**: Prisma, PostgreSQL
- **Authentication**: Clerk
- **Customer Support**: Crisp Chat
- **AI Services**: OpenAI, Replicate AI

## Getting Started

To get started with the project, follow these instructions:

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Environment File

Create a `.env` file in the root directory of the project.

### 3. Provide Environment Variables

#### Clerk
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- CLERK_SECRET_KEY

#### OpenAI
- OPENAI_API_KEY

#### Replicate AI
- REPLICATE_API_TOKEN

#### PostgresSQL
- DATABASE_URL
- DIRECT_URL

#### Crisp
- CRISP_WEBSITE_ID

### 4. Run in dev mode

```bash
npm run dev
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
