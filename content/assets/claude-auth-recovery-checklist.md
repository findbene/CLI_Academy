# Claude Authentication Recovery Checklist

Use this when Claude Code installs correctly but auth still feels broken or inconsistent.

## Symptom: "ANTHROPIC_API_KEY not set"

1. Check whether you expected to use `claude auth` or an environment variable.
2. If you expected an environment variable, print it in the active shell.
3. If it is empty, add it to the correct shell profile or project env file.
4. Restart the shell and try again.

## Symptom: "Invalid API key"

1. Generate a fresh key in the Anthropic console.
2. Replace the old key everywhere you use it.
3. Re-run the auth step carefully.
4. Test with a small real request after updating.

## Symptom: Works in one shell, fails in another

1. Identify which shell actually contains the key.
2. Do not assume zsh, bash, WSL2, and PowerShell share the same env setup.
3. Add the key to the shell you actually use for Claude Code.

## Symptom: Works for `claude --version` but fails on real requests

1. Confirm the auth method is still present in the active session.
2. Test a real command such as `claude --print "say hello" --no-interactive`.
3. Check credits, account access, and model availability if auth looks correct.

## Safety Checks

- Never paste a real key into a tracked `.env.example` file.
- Never post your real key in screenshots or support chats.
- Rotate the key immediately if you think it leaked.

## What Good Looks Like

- You know whether you are using `claude auth` or `ANTHROPIC_API_KEY`.
- The key reaches the shell that actually runs Claude Code.
- A real request works, not just the version command.
- Old or leaked keys are removed.
