import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const RPC = 'https://studio.genlayer.com/api';
const EXPECTED_CHAIN_ID = 61999n;
const CANONICAL_SOURCE_COMMIT = 'c628a86951d59de4c774d89cb4c8ae5cbb1e4e47';
const CANONICAL_SOURCE_SHA256 = '0aac468a81efe683798271e0c38c6e582eeef515386bb8e4a1d8eed8defd72b4';
const CANONICAL_GIT_BLOB = 'b8c351464cf876fedb1c1b0312670a1a4d693b5b';
const CANONICAL_CONTRACT = '0x9251D88840bCa34A2b9f60AE3fAC407afcAe89C0';
const DEPLOYMENT_TX = '0x3ad3f57eb8d419b6ebe6a60208b879241fcde303f9176cb14e8ecb8a310c8480';

const source = await readFile('contracts/MoneyFlow.py');
const text = source.toString('utf8');
const sha256 = createHash('sha256').update(source).digest('hex');
const currentHead = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const currentBlob = execFileSync('git', ['hash-object', 'contracts/MoneyFlow.py'], { encoding: 'utf8' }).trim();

const expectedVersion = '# v0.2.16';
const expectedDepends = '# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }';
const physicalLines = text.split(/\r?\n/);

if (physicalLines[0] !== expectedVersion || physicalLines[1] !== expectedDepends || physicalLines[2] !== '') {
  throw new Error('MoneyFlow header must remain exactly v0.2.16, stable Depends, then a blank line');
}
if (!text.includes('class MoneyFlow(gl.Contract)')) throw new Error('Production MoneyFlow contract class not found');
if (!/def __init__\(self\):/.test(text)) throw new Error('MoneyFlow must remain zero-argument at deployment');
if (sha256 !== CANONICAL_SOURCE_SHA256) throw new Error(`MoneyFlow.py SHA-256 changed: ${sha256}`);
if (currentBlob !== CANONICAL_GIT_BLOB) throw new Error(`MoneyFlow.py Git blob changed: ${currentBlob}`);

async function rpc(method, params = []) {
  const response = await fetch(RPC, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  });
  if (!response.ok) throw new Error(`${method}: HTTP ${response.status}`);
  const body = await response.json();
  if (body.error) throw new Error(`${method}: ${JSON.stringify(body.error)}`);
  return body.result;
}

const chainId = BigInt(await rpc('eth_chainId'));
if (chainId !== EXPECTED_CHAIN_ID) throw new Error(`Wrong RPC chain: expected 61999, got ${chainId}`);

console.log(JSON.stringify({
  status: 'PASS',
  network: 'GenLayer Studionet',
  chainId: Number(chainId),
  rpc: RPC,
  canonicalContract: CANONICAL_CONTRACT,
  deploymentTx: DEPLOYMENT_TX,
  canonicalSourceCommit: CANONICAL_SOURCE_COMMIT,
  canonicalSourceSha256: CANONICAL_SOURCE_SHA256,
  canonicalGitBlob: CANONICAL_GIT_BLOB,
  currentRepositoryHead: currentHead,
  contractSourceUnchangedAfterDeployment: true,
  runtime: 'v0.2.16',
  runner: 'py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6',
  constructorArgs: [],
  constructorValueWei: '0',
  nextAction: 'No redeployment. Canonical deployment is frozen; verify the existing live deployment and canonical Flow 2 evidence.',
}, null, 2));
