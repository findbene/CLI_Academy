# Windows Shell and Path Quick Reference

Use this reference when you are not sure whether the instructions in front of you are meant for WSL2 or PowerShell.

## Pick One Shell Per Setup Session

- WSL2 is usually the safest default for Claude Code on Windows.
- PowerShell is valid, but it uses different path shapes and different command conventions.
- The biggest beginner mistake is copying WSL2 paths into PowerShell, or Windows paths into WSL2, without translating them.

## Path Examples

| Situation | WSL2 | PowerShell |
|---|---|---|
| Home folder | `/home/yourname` | `C:\Users\yourname` |
| Project folder | `/home/yourname/projects/my-app` | `C:\Users\yourname\projects\my-app` |
| Windows drive from Linux | `/mnt/c/Users/yourname/projects/my-app` | `C:\Users\yourname\projects\my-app` |

## Common Commands

| Task | WSL2 | PowerShell |
|---|---|---|
| Show current folder | `pwd` | `Get-Location` |
| List files | `ls` | `Get-ChildItem` |
| Change folder | `cd ~/projects` | `Set-Location C:\Users\yourname\projects` |
| Print an env var | `echo $ANTHROPIC_API_KEY` | `echo $env:ANTHROPIC_API_KEY` |

## Best Practices

- Keep active Claude Code projects inside the WSL2 filesystem when possible.
- If you stay in PowerShell, keep the entire setup inside PowerShell instructions.
- Do not use mixed path separators in config files.
- When in doubt, stop and identify the current shell before copying the next command.

## What Good Looks Like

- You know which shell you are using.
- Your paths match that shell.
- Your commands match that shell.
- You are not jumping between `C:\...` and `/home/...` in the same setup sequence.
