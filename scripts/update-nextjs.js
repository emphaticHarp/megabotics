#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const currentVersion = packageJson.dependencies.next;
console.log(`Current Next.js version: ${currentVersion}`);

try {
  // Get latest version from npm
  const latestVersion = execSync('npm view next version', { encoding: 'utf8' }).trim();
  console.log(`Latest Next.js version: ${latestVersion}`);

  // Compare versions
  if (currentVersion === latestVersion) {
    console.log('\n✓ Next.js is already up to date!');
    process.exit(0);
  }

  console.log(`\n→ Updating Next.js from ${currentVersion} to ${latestVersion}...`);

  // Update package.json
  packageJson.dependencies.next = latestVersion;
  packageJson.devDependencies['eslint-config-next'] = latestVersion;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null,