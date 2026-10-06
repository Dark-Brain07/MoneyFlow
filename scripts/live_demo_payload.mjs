const RECIPIENT = (process.env.MoneyFlow_RECIPIENT || '').trim();
const PAYER = (process.env.MoneyFlow_PAYER || '').trim();

if (!/^0x[a-fA-F0-9]{40}$/.test(RECIPIENT)) {
  throw new Error('Set MoneyFlow_RECIPIENT to the distinct recipient wallet address');
}
if (PAYER) {
  if (!/^0x[a-fA-F0-9]{40}$/.test(PAYER)) throw new Error('MoneyFlow_PAYER is not a valid address');
  if (PAYER.toLowerCase() === RECIPIENT.toLowerCase()) throw new Error('Payer and recipient must be distinct');
}

const AMOUNT = 10_000_000_000_000_000n;
const TOTAL = AMOUNT * 3n;
const BOND = AMOUNT / 20n;
const CONTEST_WINDOW = 600n;
const TTL = 3600;
const acceptBy = BigInt(Math.floor(Date.now() / 1000) + 3600);
const evidenceCommit = 'eb7cfea7fa192517186334a900dba33ee6a70dd9';

const steps = [1, 2, 3].map((n) => ({
  title: `MoneyFlow demo stage ${n}`,
  criteria: `The evidence states that MoneyFlow demo stage ${n} is complete.`,
  amount_wei: AMOUNT.toString(),
  ttl_seconds: TTL,
  sources: [{
    label: `MoneyFlow demo stage ${n} completion record`,
    url: `https://raw.githubusercontent.com/Ifem1/MoneyFlow/${evidenceCommit}/demo-evidence/step-${n}.txt`,
    required: true,
  }],
}));

const payload = {
  recipient: RECIPIENT,
  title: 'MoneyFlow canonical contest verification',
  summary: 'Canonical three-step MoneyFlow lifecycle proving funded sequential progression, semantic verification, deterministic tranche release and same-snapshot contest resolution.',
  accept_by: acceptBy.toString(),
  contest_window_seconds: CONTEST_WINDOW.toString(),
  escrow_amount: TOTAL.toString(),
  steps_json: JSON.stringify(steps),
};

console.log(JSON.stringify({
  network: 'GenLayer Studionet',
  chainId: 61999,
  contract: '0x9251D88840bCa34A2b9f60AE3fAC407afcAe89C0',
  payer: PAYER || '(connected wallet)',
  recipient: RECIPIENT,
  totalGen: '0.03',
  trancheGen: '0.01',
  contestBondGen: '0.0005',
  contestWindowSeconds: Number(CONTEST_WINDOW),
  ttlSeconds: TTL,
  evidenceCommit,
  payload,
  createArgs: [
    payload.recipient,
    payload.title,
    payload.summary,
    payload.accept_by,
    payload.contest_window_seconds,
    payload.escrow_amount,
    payload.steps_json,
  ],
  createValueWei: TOTAL.toString(),
  step2ContestValueWei: BOND.toString(),
}, null, 2));
