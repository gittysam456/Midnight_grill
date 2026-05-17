# DataDividend 💰🔒

> **Your data earns money. You stay anonymous.**

A privacy-first data marketplace built on [Midnight Network](https://midnight.network) mainnet. Users monetize their data through zero-knowledge proofs — companies get verified aggregate insights, users get paid, and no raw data ever leaves the user's device.

---

## The Problem

Every year, data brokers earn **$300B+** selling your personal data — your purchase habits, health signals, location patterns — without your knowledge or consent. You generate the value. They capture it all.

## The Solution

DataDividend flips the model:

- Users **encrypt and vault** their data locally, committing only a shielded record to Midnight
- Companies **pay to query** the aggregate (e.g. *"What % of 25–34s prefer Brand A?"*)
- Midnight's **ZK circuit** evaluates the query across all consenting records and returns a verified statistical proof
- **Payment splits automatically** to every user whose record contributed
- Zero raw data is ever transmitted, decrypted, or exposed

---

## Demo



> User vaults data → Company submits query → ZK proof generated → User earns tokens

**Live demo:** https://data-dividend.vercel.app/

---

## Features

- **Encrypted data vault** — raw records stay on-device; only shielded commitments hit the chain
- **Granular consent toggles** — users control which data categories are queryable (purchases, health, location, app usage)
- **ZK aggregate proofs** — queries answered without touching individual records
- **Automatic revenue split** — token payments distributed proportionally to contributors
- **Query marketplace** — live feed of active and completed queries with per-query earnings

---

## Tech Stack

| Layer | Technology |
|---|---|
| Blockchain | Midnight Network (mainnet) |
| ZK Proofs | Midnight Compact language |
| Smart Contracts | Midnight contract runtime |
| Frontend | Next.js + TypeScript |
| Wallet | Midnight DApp connector |
| Styling | Tailwind CSS |

---

## Architecture

```
User Device                  Midnight Chain              Company
──────────────               ──────────────              ──────────────
Raw data                     Shielded vault              Paid query
     │                            │                           │
     │  encrypt + commit ──────►  │                           │
     │                            │  ◄──── query + payment ───┤
     │                       ZK circuit                       │
     │                       evaluates                        │
     │                       aggregate                        │
     │                            │                           │
     │  ◄──── token split ────────┤  aggregate proof ────────►│
```

**Key privacy guarantee:** The ZK circuit proves statistical results over shielded records without decrypting any individual record. The company receives only the aggregate output and a validity proof.

---

## Getting Started

### Prerequisites

- Node.js v18+
- Midnight wallet (install from [midnight.network/wallet](https://midnight.network/wallet))
- Midnight testnet or mainnet tokens for gas

### Installation

```bash
# Clone the repo
git clone https://github.com/your-team/datadividend
cd datadividend

# Install dependencies
npm install

# Copy environment config
cp .env.example .env.local
```

### Environment Variables

```env
NEXT_PUBLIC_MIDNIGHT_RPC=https://rpc.midnight.network
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...          # deployed contract address
NEXT_PUBLIC_NETWORK=mainnet                 # or testnet
```

### Run locally

```bash
npm run dev
# → http://localhost:3000
```

### Deploy contracts

```bash
cd contracts
npm install
npx midnight-deploy --network mainnet
```

---

## How to Use

### As a User (earn from your data)

1. Connect your Midnight wallet
2. Upload your data export (CSV / JSON) — processed locally, never uploaded
3. Toggle which categories you consent to share
4. Watch earnings accumulate as queries run against your shielded record
5. Withdraw DUST tokens to your wallet anytime

### As a Company (query the aggregate)

1. Connect wallet with sufficient DUST balance
2. Browse available query templates or write a custom predicate
3. Submit query with attached payment
4. Receive ZK-verified aggregate result within ~30 seconds

---

## ZK Circuit Overview

The core circuit (`contracts/src/query_circuit.compact`) takes:

- **Private inputs:** array of shielded user records + consent bitmasks
- **Public inputs:** query predicate + expected respondent count
- **Output:** aggregate result + validity proof

```compact
circuit countQuery(
  records: PrivateArray<ShieldedRecord>,
  predicate: QueryPredicate
) -> (count: Field, proof: ZKProof) {
  // filter by consent, evaluate predicate, return aggregate
}
```

> The circuit never outputs individual record values — only the aggregate and a proof that the computation was performed correctly over valid, consented records.

---

## Project Structure

```
datadividend/
├── contracts/
│   ├── src/
│   │   ├── query_circuit.compact     # ZK aggregate circuit
│   │   ├── vault.compact             # Shielded data vault
│   │   └── marketplace.compact       # Query + payment contract
│   └── tests/
├── frontend/
│   ├── components/
│   │   ├── ConsentDashboard.tsx      # Toggle UI
│   │   ├── EarningsPanel.tsx         # Revenue tracker
│   │   └── QueryFeed.tsx             # Live query list
│   ├── lib/
│   │   ├── midnight.ts               # Chain interaction
│   │   └── zkProver.ts               # Client-side proving
│   └── pages/
├── assets/
│   └── demo.gif
└── README.md
```

---

## Roadmap

- [x] Single query type (count with predicate filter)
- [x] Manual data upload (CSV / JSON)
- [x] Basic consent toggles (4 categories)
- [x] Token payment split to contributors
- [ ] Multiple query types (average, distribution, correlation)
- [ ] Automated data connectors (Google Takeout, Apple Health)
- [ ] Company query builder UI
- [ ] DAO governance for query pricing
- [ ] Mobile app

---

## Business Model

| Customer | What they pay for | Value delivered |
|---|---|---|
| Market research firms | Per-query fees | Verified aggregate data, no GDPR risk |
| Advertisers | Audience segment queries | Privacy-safe targeting signals |
| Healthcare cos. | Health trend queries | Aggregate patient insights |
| Users | Free | Passive income from data they already generate |

**Market size:** The global data broker market is ~$300B/year. DataDividend targets the research & analytics slice (~$40B) where ZK-verified accuracy is worth a premium.

---

## Team

| Name | Role |
|---|---|
| [Tanya Prajapati] |smart contracts |
| [Ananya Rajput] | Frontend + wallet integration |
| [Sadaf] |ZK circuits|

Built at **Midnight Hackathon 2025** — 48 hours.

---

## License

MIT — see [LICENSE](./LICENSE)

---

*Built on [Midnight Network](https://midnight.network) — privacy infrastructure for the internet.*
