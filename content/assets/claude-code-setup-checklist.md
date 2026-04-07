# Claude Code Setup Checklist

Use this checklist when you want the calmest possible path from "nothing installed" to "first successful run."

## Preflight

- Confirm you are on the machine you actually want to set up.
- Confirm which shell you are following: zsh, bash, WSL2, or PowerShell.
- Confirm Node.js 18+ is installed with `node --version`.
- Confirm npm is available with `npm --version`.
- Confirm you have an Anthropic API key or an approved Claude auth path.

## Install

- Run `npm install -g @anthropic-ai/claude-code`.
- Wait for the install to finish before opening another terminal.
- If the install fails, stop and fix Node/npm first instead of piling on more steps.

## Verify

- Run `claude --version`.
- Confirm the command returns a version number instead of "command not found."
- If the command still fails, fully restart the shell and try again.

## Authenticate

- Run `claude auth` if you are using the interactive auth flow.
- If you are using environment variables, confirm `ANTHROPIC_API_KEY` is present before you continue.
- Never paste a real key into notes, screenshots, or Git-tracked files.

## First Run

- Create or open a safe test folder.
- Run `claude`.
- Ask for one tiny task, such as creating a hello file.
- Confirm the file was created where you expected.

## If Something Fails

- Check whether the shell matches the instructions you are following.
- Re-check Node, npm, and the Claude version command before debugging anything more advanced.
- Treat auth errors and install errors as different problems.
- If you are on Windows, confirm whether you are in WSL2 or PowerShell before copying paths.

## What Good Looks Like

- `claude --version` works.
- `claude` opens successfully.
- A simple first task completes.
- You know where your auth method lives.
- You have not stored secrets in a tracked file.
