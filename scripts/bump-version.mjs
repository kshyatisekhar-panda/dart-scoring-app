import { readFileSync, writeFileSync } from 'fs';

const pkgPath = './package.json';
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

const parts = pkg.version.split('.').map(Number);
parts[2] += 1; // bump patch version
pkg.version = parts.join('.');

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`Version bumped to ${pkg.version}`);
