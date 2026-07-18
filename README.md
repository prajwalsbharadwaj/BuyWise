# BuyWise

> India's most trusted real estate transaction platform.

**BuyWise** is not a listing website. It's a **transaction lifecycle platform** that helps users make confident property purchase decisions through intelligence, verification, and professional services.

## Architecture

- **Transaction-centric domain model** — everything revolves around the transaction lifecycle
- **Location-aware** — multi-city, multi-state with location-specific regulations
- **AI capability layer** — embedded intelligence throughout, not just a chatbot
- **Modular monolith** — clean service boundaries, one deployable unit

## Tech Stack

| Layer     | Technology                  |
| --------- | --------------------------- |
| Framework | Next.js 15 (App Router)     |
| Language  | TypeScript                  |
| Database  | PostgreSQL + PostGIS (Neon) |
| ORM       | Prisma                      |
| Auth      | NextAuth.js v5              |
| AI        | Google Gemini API           |
| Maps      | Google Maps Platform        |
| Images    | Cloudinary                  |
| Payments  | Razorpay                    |
| Email     | Resend                      |
| Hosting   | Vercel                      |

## Getting Started

### Prerequisites

- Node.js 20+ (LTS)
- npm 10+

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd "Prajwal Tech Solutions Limited"

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your API keys in .env.local

# Set up database
npx prisma generate
npx prisma db push

# Seed initial data
npx prisma db seed

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
src/
├── app/           # Next.js pages and API routes
├── modules/       # Domain modules (transaction, property, location, etc.)
├── components/    # Shared UI components
├── lib/           # Shared utilities and clients
├── config/        # Configuration (env, regulations, services)
└── styles/        # Design system and CSS

prisma/
├── schema.prisma  # Database schema
└── seed/          # Seed data (localities, services, regulations)

docs/
├── adr/           # Architecture Decision Records
└── ...            # API docs, architecture docs
```

## Documentation

- [Architecture Decision Records](./docs/adr/)

## License

Proprietary — Prajwal Tech Solutions Private Limited
