#!/usr/bin/env node
/**
 * procedure-ops CLI
 *
 * Installs the sop-build Claude Code skill into either the user-global
 * directory (~/.claude/skills/sop-build/) or the current project's
 * .claude/skills/sop-build/ directory.
 *
 * Optionally also drops command stub files in ~/.claude/commands/ so each
 * task is reachable as an explicit slash command.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

const SKILL_NAME = 'sop-build';
const PACKAGE_ROOT = path.resolve(__dirname, '..');
const SKILL_SRC = path.join(PACKAGE_ROOT, 'skill');
const PKG = require(path.join(PACKAGE_ROOT, 'package.json'));

const TASK_NAMES = [
  'interview',
  'scaffold-business',
  'from-recording',
  'audit',
  'delegate-pack'
];

function userClaudeDir() {
  return path.join(os.homedir(), '.claude');
}

function projectClaudeDir() {
  return path.join(process.cwd(), '.claude');
}

function resolveSkillTarget(opts) {
  const base = opts.project ? projectClaudeDir() : userClaudeDir();
  return path.join(base, 'skills', SKILL_NAME);
}

function resolveCommandsDir(opts) {
  const base = opts.project ? projectClaudeDir() : userClaudeDir();
  return path.join(base, 'commands');
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d);
    } else if (entry.isFile()) {
      fs.copyFileSync(s, d);
    }
  }
}

function rmrf(target) {
  if (!fs.existsSync(target)) return;
  fs.rmSync(target, { recursive: true, force: true });
}

function commandStub(name, summary) {
  return `---
name: ${name}
description: ${summary}
---

This command routes to the \`sop-build\` skill task \`${name.replace(/^sop-build-?/, '')}\`.

If the skill is installed, the Skill tool will load it automatically. Otherwise run:

    npx procedure-ops install
`;
}

function commandStubs() {
  return {
    'sop-build.md': commandStub(
      'sop-build',
      'Build, audit, or package a Standard Operating Procedure.'
    ),
    'sop-build-interview.md': commandStub(
      'sop-build-interview',
      'Guided Q&A interview to capture a new SOP from scratch.'
    ),
    'sop-build-scaffold-business.md': commandStub(
      'sop-build-scaffold-business',
      'One-time setup for a new business folder under SOPs/.'
    ),
    'sop-build-from-recording.md': commandStub(
      'sop-build-from-recording',
      'Generate an SOP from a screen-recording transcript or Loom.'
    ),
    'sop-build-audit.md': commandStub(
      'sop-build-audit',
      'Review an existing SOP for gaps and automation candidates.'
    ),
    'sop-build-delegate-pack.md': commandStub(
      'sop-build-delegate-pack',
      'Bundle a finished SOP into a handoff packet for a VA or new hire.'
    )
  };
}

function writeCommandStubs(opts) {
  const dir = resolveCommandsDir(opts);
  fs.mkdirSync(dir, { recursive: true });
  const stubs = commandStubs();
  for (const [name, body] of Object.entries(stubs)) {
    fs.writeFileSync(path.join(dir, name), body);
  }
  return { dir, count: Object.keys(stubs).length };
}

function removeCommandStubs(opts) {
  const dir = resolveCommandsDir(opts);
  const stubs = commandStubs();
  let removed = 0;
  for (const name of Object.keys(stubs)) {
    const p = path.join(dir, name);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
      removed += 1;
    }
  }
  return { dir, removed };
}

function install(opts) {
  const target = resolveSkillTarget(opts);
  const exists = fs.existsSync(target);

  if (exists && !opts.force) {
    console.error(
      `[procedure-ops] Skill already installed at:\n  ${target}\n\n` +
        `Run with --update to overwrite, or --uninstall to remove first.`
    );
    process.exitCode = 1;
    return;
  }

  if (exists && opts.force) {
    rmrf(target);
  }

  copyDir(SKILL_SRC, target);

  console.log(`[procedure-ops] Skill installed:`);
  console.log(`  ${target}`);

  if (opts.withCommands) {
    const result = writeCommandStubs(opts);
    console.log(
      `[procedure-ops] Command stubs written (${result.count}):`
    );
    console.log(`  ${result.dir}`);
  }

  console.log('');
  console.log(`Invoke from Claude Code with:  /${SKILL_NAME}`);
  console.log(`Or any natural-language SOP intake phrase ("write an SOP for X", "document this process", etc.)`);
}

function uninstall(opts) {
  const target = resolveSkillTarget(opts);
  let removedSkill = false;
  if (fs.existsSync(target)) {
    rmrf(target);
    removedSkill = true;
  }

  const cmdResult = opts.withCommands ? removeCommandStubs(opts) : { removed: 0 };

  if (!removedSkill && cmdResult.removed === 0) {
    console.log(`[procedure-ops] Nothing to uninstall at ${target}`);
    return;
  }

  if (removedSkill) console.log(`[procedure-ops] Removed skill: ${target}`);
  if (cmdResult.removed > 0) {
    console.log(
      `[procedure-ops] Removed ${cmdResult.removed} command stub(s) from ${cmdResult.dir}`
    );
  }
}

function where(opts) {
  console.log(resolveSkillTarget(opts));
}

function help() {
  console.log(`procedure-ops v${PKG.version}

Install the sop-build Claude Code skill.

Usage:
  npx procedure-ops <command> [flags]

Commands:
  install         Install skill to ~/.claude/skills/${SKILL_NAME}/
  update          Same as install, but overwrite if already present
  uninstall       Remove skill from the target directory
  where           Print the target install path and exit
  --help, -h      Show this message
  --version, -v   Show version

Flags:
  --project       Install into the current project's ./.claude/ instead of ~/.claude/
  --with-commands Also write explicit slash command stubs (sop-build, sop-build-interview, etc.)

Examples:
  npx procedure-ops install
  npx procedure-ops install --project
  npx procedure-ops install --with-commands
  npx procedure-ops update --with-commands
  npx procedure-ops uninstall --with-commands

Skill name once installed: /${SKILL_NAME}
Repo:                       https://github.com/charlesdove977/procedure-ops
`);
}

function parseArgs(argv) {
  const opts = {
    project: false,
    withCommands: false,
    force: false
  };
  let cmd = null;
  for (const arg of argv) {
    if (arg === '--project') opts.project = true;
    else if (arg === '--with-commands' || arg === '--commands') opts.withCommands = true;
    else if (arg === '--update' || arg === '--force' || arg === '-f') opts.force = true;
    else if (arg === '--help' || arg === '-h') cmd = '__help';
    else if (arg === '--version' || arg === '-v') cmd = '__version';
    else if (!arg.startsWith('-') && cmd === null) cmd = arg;
  }
  return { cmd, opts };
}

function main() {
  const { cmd, opts } = parseArgs(process.argv.slice(2));

  switch (cmd) {
    case 'install':
      install(opts);
      return;
    case 'update':
      opts.force = true;
      install(opts);
      return;
    case 'uninstall':
      uninstall(opts);
      return;
    case 'where':
      where(opts);
      return;
    case '__version':
      console.log(PKG.version);
      return;
    case '__help':
    case null:
    default:
      help();
      return;
  }
}

main();
