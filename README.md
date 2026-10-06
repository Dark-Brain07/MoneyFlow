# Money Cycle

**Work moves. Money follows.**

Money Cycle is a funded sequential semantic workflow on GenLayer. One payer funds a 2–8 step workflow upfront. Each step freezes its exact tranche, acceptance criteria, public evidence sources, and timing. GenLayer classifies only whether the current active step satisfies those frozen criteria; deterministic contract logic moves the already-committed funds and activates the next step.

**GenLayer verifies progression. Deterministic code moves funds.**

## Live deployment

- Live app: https://MoneyFlow-three.vercel.app/
- Operational app: https://MoneyFlow-three.vercel.app/app
- Canonical contract: [`0x9251D88840bCa34A2b9f60AE3fAC407afcAe89C0`](https://explorer-studio.genlayer.com/address/0x9251D88840bCa34A2b9f60AE3fAC407afcAe89C0)
- Network: **GenLayer Studionet**
- Chain ID: `61999`
- RPC: `https://studio.genlayer.com/api`
- Canonical deployed source commit: `c628a86951d59de4c774d89cb4c8ae5cbb1e4e47`
- Canonical contract Git blob: `b8c351464cf876fedb1c1b0312670a1a4d693b5b`
- Canonical source SHA-256: `0aac468a81efe683798271e0c38c6e582eeef515386bb8e4a1d8eed8defd72b4`
- Deployment tx: [`0x3ad3f57eb8d419b6ebe6a60208b879241fcde303f9176cb14e8ecb8a310c8480`](https://explorer-studio.genlayer.com/tx/0x3ad3f57eb8d419b6ebe6a60208b879241fcde303f9176cb14e8ecb8a310c8480)
- Runtime: `v0.2.16`
- Runner: `py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6`

The deployed contract source is frozen. Later repository commits change only frontend, verification tooling, evidence documentation, and submission material.

## Architecture

Money Cycle enforces:

- 2–8 ordered steps
- full funding upfront
- exactly one active step at a time
- frozen semantic criteria
- frozen public HTTPS evidence sources
- equality-backed evidence snapshots with SHA-256 digests
- semantic classification only at the active-step boundary
- provisional completion before settlement
- an exact 5% contest bond (`step amount / 20`)
- contest resolution against the **same stored snapshot**
- deterministic tranche release and next-step activation
- no AI-selected payout amount, recipient, ordering, refund, or bond
- no backend required for protocol correctness

The browser reconstructs state from finalized public contract reads. Writes use only an injected EIP-1193 wallet, exact `BigInt` GEN arithmetic, Studionet `61999`, and FINALIZED-success checks.


## Verification

```bash
python -m pip install -r requirements.txt
python scripts/validate_contract.py
genvm-lint check contracts/MoneyFlow.py
python -m pytest tests/contract tests/frontend -q

npm ci
npm run lint
npm run typecheck
npm test
npm run build

node scripts/deploy_preflight.mjs
node scripts/verify_canonical_live.mjs

MoneyFlow_FLOW_ID=2 \
MoneyFlow_EXPECT_CANONICAL_DEMO=1 \
MoneyFlow_TX_HASHES="<nine canonical Flow-2 hashes>" \
node scripts/live_full.mjs

MoneyFlow_LIVE_FRONTEND=https://MoneyFlow-three.vercel.app \
node scripts/verify_live_frontend.mjs
```

The Direct Mode suite remains diagnostic only for the pinned stable v0.2.16 harness. That local harness fails during runtime-message decoding before Money Cycle executes, so it is not described as a Direct Mode pass. Finalized Studionet execution is the authoritative live-runtime evidence.

See also: [BUILD_STATUS.md](BUILD_STATUS.md), [SUBMISSION.md](SUBMISSION.md), [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md), and [DEMO.md](DEMO.md).
