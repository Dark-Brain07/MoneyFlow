import { cp, mkdir, writeFile } from 'node:fs/promises';

const CANONICAL_CONTRACT = '0x9251D88840bCa34A2b9f60AE3fAC407afcAe89C0';

await mkdir('dist/app', { recursive: true });
for (const file of ['index.html', 'landing.css', 'landing.js', 'styles.css', 'app.js', 'wallet-ux.js', 'lossless-json.js']) {
  await cp(file, `dist/${file}`);
}
await cp('app/index.html', 'dist/app/index.html');

const address = (process.env.FLOWED_CONTRACT_ADDRESS || CANONICAL_CONTRACT).trim();
if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
  throw new Error('FLOWED_CONTRACT_ADDRESS must be a 20-byte hex address');
}
if (address.toLowerCase() !== CANONICAL_CONTRACT.toLowerCase()) {
  throw new Error(`Production build must target canonical Flowed contract ${CANONICAL_CONTRACT}`);
}

await writeFile(
  'dist/config.js',
  `window.FLOWED_CONFIG = Object.freeze(${JSON.stringify({
    network: 'GenLayer Studionet',
    chainId: 61999,
    rpc: 'https://studio.genlayer.com/api',
    contractAddress: address,
  })});\n`,
);

console.log(`static production build: PASS (landing / + operational /app + canonical contract ${address})`);
