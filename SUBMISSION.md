# Money Cycle submission

## What Money Cycle is

**Money Cycle — Work moves. Money follows.**

Money Cycle is a single GenLayer Intelligent Contract for funded, sequential work. A payer funds the complete workflow upfront. Each step freezes its tranche, criteria, evidence sources, and timing. Only the current step can be semantically reviewed.

**GenLayer verifies progression. Deterministic code moves funds.**

## Why GenLayer is necessary

Ordinary deterministic code can enforce funding, ordering, timing, accounting, and payment, but it cannot by itself determine whether public real-world evidence satisfies a natural-language completion criterion. Money Cycle uses GenLayer only for that semantic boundary.

The model is allowed to classify the frozen evidence snapshot as `SATISFIED`, `NOT_SATISFIED`, or `INCONCLUSIVE`. It does not choose payout amount, recipient, step ordering, active index, refund behavior, or contest bond.

## What the contract controls deterministically

- 2–8 ordered steps
- full upfront escrow
- exact per-step tranches
- one active step at a time
- activation-relative timing
- provisional completion
- exact 5% contest bond
- same-snapshot contest
- deterministic release/refund paths
- next-step activation
- escrow and bond invariants

## Live deployment

- Live app: https://MoneyFlow-three.vercel.app/
- Operational app: https://MoneyFlow-three.vercel.app/app
- Canonical contract: [`0xB99Bb11Cf0d0DC684A6b7E3653C168b7E397723F`](https://explorer-studio.genlayer.com/address/0xB99Bb11Cf0d0DC684A6b7E3653C168b7E397723F)
- Network: GenLayer Studionet `61999`
- Canonical deployed source: `c628a86951d59de4c774d89cb4c8ae5cbb1e4e47`
- Deployment tx: [`0xdcbcc202405a347997641c560e09d9167131cc581a37474fc28fd2e9e1d78425`](https://explorer-studio.genlayer.com/tx/0xdcbcc202405a347997641c560e09d9167131cc581a37474fc28fd2e9e1d78425)


