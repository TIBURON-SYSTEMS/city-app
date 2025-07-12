# 🦈 Tiburón - Recycling Rewards App

Tiburón is a smart recycling platform that turns everyday sorting into measurable impact.
We reward proper recycling behavior, educate users through gamification, and help build a more sustainable future starting in your neighborhood.

---

## 🚀 Features

- ♻️ **Gamified Mobile App** — Users complete recycling challenges by properly sorting waste, earning rewards such as groceries, discounts, and so on.
- 📦 **Smart Bin Workflow with AI Verification** — Users scan a QR code on the bin, upload two photos of their recycling action, and receive instant AI-powered feedback to verify challenge progress and completion.
- 📊 **Multi-role Analytics and Management Dashboard** — Admins and partner brands can log in to monitor performance. Brands can create and manage recycling challenges, while admins access large-scale behavioral and environmental data insights.

---

## 🧩 Monorepo Structure (Turborepo)

This project is structured as a monorepo using Turborepo, containing multiple apps and shared infrastructure to support scalability and maintainability.

```
tiburon/
├── apps/
│   ├── App/          # User participant mobile app (expo)
│   ├── admin/        # Admin and Brand dashboard
│   └── ai-server/    # AI service API for images disposal detection
├── package.json      # Root dependencies and scripts
├── turbo.json        # Turborepo configuration
└── yarn.lock         # Dependency lockfile
```

---

## 🧠 Database Schema (Prisma)

Includes models like:

- `User`, `Participant`, `Brand`, `Challenge`, `Reward`, `Bin`, `Product`, `Disposal`, `Participation`, `DisposedProduct`, `ParticipantReward`, `ChallengeProduct`

- Role & status enums:  
  `UserRole` (`PARTICIPANT`, `BRAND`, `ADMIN`),  
  `BrandStatus` (`PENDING`, `ACTIVE`, `REJECTED`)

- Rich relational design:  
  - One-to-one (e.g. `User` → `Participant` or `Brand`)  
  - Many-to-many (e.g. `ParticipantReward`, `ChallengeProduct`)  
  - Time-based tracking with `createdAt`, `updatedAt` on all models  
  - Composite keys and unique constraints to prevent duplicate participation

> Full schema in `apps/admin/prisma/schema.prisma`


---

## 📱 Figma Prototypes

- **User Story Mapping**  
  [View Board](https://embed.figma.com/board/YrhwU0psMhSvlaSai8QiP6/%F0%9F%A6%88-Tibur%C3%B3n-story-mapping?node-id=0-1)

- **UI Wireframes**  
    This project was developed without a design prototype.  
    Initial wireframes were considered but later abandoned in favor of direct       implementation and iterative development.

---

## 🛠 Tech Stack

- **🧑‍🤝‍🧑 Monorepo Tooling**: Turborepo + Yarn Workspaces  
- **📱 Participant App** (`apps/App`): Expo (React Native), TypeScript, Nativewind  
- **🖥️ Admin Brand Dashboard** (`apps/admin`): Next.js, React, TypeScript, Shadcn UI, TailwindCSS
- **🧠 Mock AI Server** (`apps/ai-server`): Express.js, TypeScript
- **🗄️ Database**: PostgreSQL + Prisma ORM  
- **🔐 Authentication**: Auth0  
- **📧 Notifications**: Courier  
- **🚀 Deployment**: To be determined

---

## 📝 Development Scripts

Run these commands from the root unless otherwise specified.

- `yarn` — Install all dependencies (monorepo)
- `yarn dev` — Run all dev servers in parallel via Turborepo

**Prisma (run from `apps/admin`)**

- `yarn prisma generate` — Generate Prisma client
- `yarn prisma migrate dev` — Run dev migrations

**Mobile App (run from `apps/App`)**

- `npx expo prebuild` — Prepare native projects for development
- `npx expo run:ios` — Run on iOS device or simulator
- `npx expo run:android` — Run on Android device or emulator
- `npx expo start` — Start the Expo dev server

**AI Server (run from `apps/ai-server`)**

- `yarn dev` — Run the AI server in development mode (with `nodemon`)
- `yarn build` — Build the server to `dist/`
- `yarn start` — Run the built server from `dist/`


---

## 📌 Notes

- Not all features from the original 1-pager or backlog were implemented.
- The final feature set is reflected in the codebase and Prisma schema.

---

## 📧 Contact

For demo or support, please contact the team.
