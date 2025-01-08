
# sendPulse Frontend

This is the frontend for the sendPulse project written in React.js, Next.js, TypeScript, Effect.js and Tailwind.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

![example workflow](https://github.com/donnaloia/email-campaign-service/actions/workflows/docker-build-push.yml/badge.svg)


## Features

- manages the entire user journey from signup to login to email campaign creation and sending
- manages Authentication and Authorization via server-side requests to external auth services
- leverages Effect.js for cleaner, more predictable, and more testable code
- see it deployed in an event-driven, distributed system here: [SendPulse](https://github.com/donnaloia/sendpulse)


## Tech Stack

**Language:** Typescript

**Framework:** React,js, Next.js, Effect.js,

**Deployment:** Docker




## Run Locally
docker-compose spins up the sendpulse-frontend.
To deploy this project locally run:

```bash
  docker-compose build
  docker-compose up
```

Or without docker:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
