# CLI Academy — Production-Ready Curriculum Blueprint

> Working assumption: the full Project Brief text was not included in the prompt body, so this blueprint uses the stated baseline of **19 published paths** and **138 validated lessons** and is written to be a polished evolution of that product direction. Replace the assumption note with brief-specific wording once the full brief is pasted into the content repo.

## North-Star Promise

CLI Academy is the safest, most practical place for normal people to go from zero to productive with Claude Code, Claude Cowork, OpenClaw-style runtimes, and secure agentic workflows on real machines.

Everything below is built around five non-negotiables:

1. **First real success fast** — every chapter earns a visible win in the first 5–10 minutes.
2. **Project-first delivery** — explanation appears right before or right after the learner does the thing.
3. **Three learning modes everywhere** — Guided, Hint-based, and Independent are product behaviors, not just labels.
4. **Safety before autonomy** — secrets, scopes, permissions, test data, approvals, rollback, and auditability are taught early and revisited often.
5. **Evidence over vibes** — every lesson ends with verification, troubleshooting, and a next real-world win.

## Program Shape at a Glance

- **Paths:** 19
- **Chapters:** 57
- **Validated lessons baseline:** 138
- **Primary audiences:** absolute beginners, non-technical knowledge workers, early technical builders, cautious operators, and aspiring agent workflow designers
- **Core delivery modes:** Guided / Hint-based / Independent
- **Primary lesson outputs:** folders, configs, notes, prompts, workflows, run logs, security checklists, case studies, and working assistants

## 1) High-Level Learning Paths

| # | Path | Who it serves | Core learner outcome | Prerequisite | Lessons |
|---|------|---------------|----------------------|--------------|---------|
| 1 | Start Here: Safety, Confidence, and First Success | Absolute beginners | Set up a safe learning workspace, understand the three learning modes, and get one real success in the first session. | None | 6 |
| 2 | Terminal and File-System Foundations for Normal People | Beginners uncomfortable with terminals | Use the terminal with confidence to navigate files, create folders, edit text, and avoid common mistakes. | Path 1 | 7 |
| 3 | Claude Code: Zero to Productive | New Claude Code users | Install Claude Code, open a repo, understand the session loop, and ship a first tiny improvement. | Paths 1-2 | 7 |
| 4 | Claude Code Repo Workflows and Project Navigation | Learners ready for multi-file work | Use Claude Code to map unfamiliar repos, choose safe change scopes, and make disciplined multi-file edits. | Path 3 | 8 |
| 5 | Claude Code Debugging, Testing, and Refactoring | Learners who can already make basic changes | Reproduce bugs, add or run tests, refactor safely, and explain why a fix is trustworthy. | Path 4 | 8 |
| 6 | Git and GitHub for AI-Assisted Builders | Learners who fear version control | Use Git safely with Claude Code: commit, branch, review, recover, and prepare PR-ready work. | Path 3 | 7 |
| 7 | Claude Code Across Terminal, IDE, Desktop, and Browser | Learners choosing the right interface | Know when to use each Claude surface, how to hand context across them, and how not to get lost. | Paths 3 and 6 | 6 |
| 8 | Claude Cowork: First Wins for Knowledge Work | Non-technical or mixed-technical learners | Use Claude Cowork to complete real desktop tasks with oversight and clean deliverables. | Path 1 | 7 |
| 9 | Claude Cowork for Documents, Research, and Data Extraction | Knowledge workers and researchers | Turn messy inputs into useful briefs, extraction tables, and research packs with oversight. | Path 8 | 7 |
| 10 | Claude Cowork for Admin, Operations, and Team Rituals | Operators, founders, assistants, small teams | Use Cowork to reduce repetitive operational work without losing oversight. | Path 8 | 7 |
| 11 | OpenClaw and Claw Runtime Foundations | Learners entering the broader Claw ecosystem | Understand the Claw runtime pattern, install a starter setup, and complete a first bounded task safely. | Paths 1-2 and ideally 8 | 7 |
| 12 | Skills, Memory, Heartbeats, and Scheduled Work | Learners ready to make their agent more useful | Add reusable skills, safe memory, and scheduled behavior without creating a mess. | Path 11 | 7 |
| 13 | Multi-Agent Patterns for Real Life | Learners curious about multiple cooperating agents | Use simple multi-agent patterns without unnecessary complexity. | Path 12 | 7 |
| 14 | Secure Local Machines and Safe Defaults | All learners before serious automation | Harden a local setup with secrets hygiene, least privilege, backups, logging, and kill switches. | Paths 1-3 | 7 |
| 15 | Secure Remote Setups: VPS, Mac mini, and Raspberry Pi | Learners moving beyond local-only setups | Deploy a bounded agent/runtime on a dedicated device or server with sane security and maintenance. | Path 14 | 8 |
| 16 | Computer Use, Sandboxes, and Browser Automation | Learners exploring desktop/web automation | Use computer-use style tooling and sandboxes safely, with approvals, screenshots, and bounded tasks. | Paths 8, 14, and ideally 15 | 8 |
| 17 | Secure Integrations: Email, Calendar, Files, and Messaging | Learners connecting agents to real tools | Connect tools with minimum scope, verify safely, and know how to revoke or recover. | Paths 14-16 | 8 |
| 18 | Real-World Agent Builds for Everyday Productivity | Learners ready to build useful assistants | Build practical agents that save time on real tasks while staying bounded and reviewable. | Paths 11-17 | 7 |
| 19 | Capstones, Portfolio Proof, and Job-Ready Evidence | Learners finishing the program | Finish three portfolio-grade capstones and package evidence that proves real skill, not just course completion. | Most prior paths; at minimum 3, 8, 11, 14, 17, 18 | 9 |

### Recommended phase packaging

- **Free Starter (high confidence, low risk):** Paths 1-3, the first half of Path 8, and selected read-only lessons from Paths 14 and 17.
- **Core Pro:** Paths 4-7, 9-14.
- **Advanced Pro / Labs:** Paths 15-19.
- **Enterprise / Team rollout pack:** selected content from Paths 10, 13, 17, 18, and 19 plus admin analytics, shared workspaces, and team rubrics.

## 2) Detailed Chapter Structure

### Path 1. Start Here: Safety, Confidence, and First Success

| Chapter | Primary learning objective | Target learner outcome | Mode balance | Est. time |
|---------|----------------------------|------------------------|--------------|-----------|
| 1.1 — Your first 30 minutes | Get the learner oriented and successful before any deep setup. | A learner workspace, baseline device snapshot, and first completed task. | Guided 80 / Hint 15 / Independent 5 | 35 min |
| 1.2 — Safety before speed | Teach guardrails as behavior, not lecture. | A personal safety checklist and recovery plan. | Guided 75 / Hint 20 / Independent 5 | 35 min |
| 1.3 — First real win | End the path with a concrete success and reflection. | A cleaned workspace plus a proof-of-success note the learner can revisit later. | Guided 65 / Hint 25 / Independent 10 | 30 min |

### Path 2. Terminal and File-System Foundations for Normal People

| Chapter | Primary learning objective | Target learner outcome | Mode balance | Est. time |
|---------|----------------------------|------------------------|--------------|-----------|
| 2.1 — Move without fear | Build safe movement and observation habits. | Learner can always tell where they are and what a command will affect. | Guided 75 / Hint 20 / Independent 5 | 45 min |
| 2.2 — Create, rename, copy, move | Teach the file operations learners will repeat everywhere. | A mini project folder built entirely from terminal commands. | Guided 65 / Hint 25 / Independent 10 | 50 min |
| 2.3 — Read and edit text files | Get learners comfortable reading config and notes. | Learner can inspect, edit, and save text files from terminal/editor. | Guided 60 / Hint 25 / Independent 15 | 55 min |

### Path 3. Claude Code: Zero to Productive

| Chapter | Primary learning objective | Target learner outcome | Mode balance | Est. time |
|---------|----------------------------|------------------------|--------------|-----------|
| 3.1 — Install and connect | Get Claude Code running in a verified environment. | A working Claude Code install and first successful repo session. | Guided 80 / Hint 15 / Independent 5 | 50 min |
| 3.2 — Learn the core session loop | Teach ask-plan-edit-run-verify as the default muscle memory. | Learner completes one safe code or text change with verification. | Guided 70 / Hint 20 / Independent 10 | 55 min |
| 3.3 — Run, check, and wrap up | Close the loop with concrete verification and reflection. | Learner can run commands, confirm results, and explain the change. | Guided 60 / Hint 25 / Independent 15 | 60 min |

### Path 4. Claude Code Repo Workflows and Project Navigation

| Chapter | Primary learning objective | Target learner outcome | Mode balance | Est. time |
|---------|----------------------------|------------------------|--------------|-----------|
| 4.1 — Read a codebase fast | Build codebase understanding habits. | Learner can identify entry points, dependencies, and change boundaries. | Guided 65 / Hint 25 / Independent 10 | 55 min |
| 4.2 — Make controlled multi-file changes | Teach small-scope refactors with discipline. | Learner completes a change spanning 2-4 files without drift. | Guided 55 / Hint 30 / Independent 15 | 65 min |
| 4.3 — Work like a careful teammate | Teach repo hygiene around changes and communication. | Learner leaves a repo better documented and easier to continue. | Guided 50 / Hint 30 / Independent 20 | 70 min |

### Path 5. Claude Code Debugging, Testing, and Refactoring

| Chapter | Primary learning objective | Target learner outcome | Mode balance | Est. time |
|---------|----------------------------|------------------------|--------------|-----------|
| 5.1 — Reproduce before you fix | Teach disciplined bug handling. | Learner can capture a bug in a reproducible way. | Guided 70 / Hint 20 / Independent 10 | 55 min |
| 5.2 — Fix with tests and checks | Connect debugging to verification. | Learner adds or runs tests and confirms the bug is gone. | Guided 60 / Hint 25 / Independent 15 | 70 min |
| 5.3 — Refactor without fear | Teach safe cleanup and simplification. | Learner improves clarity while preserving behavior. | Guided 50 / Hint 30 / Independent 20 | 75 min |

### Path 6. Git and GitHub for AI-Assisted Builders

| Chapter | Primary learning objective | Target learner outcome | Mode balance | Est. time |
|---------|----------------------------|------------------------|--------------|-----------|
| 6.1 — Version control without panic | Make Git feel like a seatbelt, not a threat. | Learner initializes or clones a repo and understands status, diff, and commit. | Guided 75 / Hint 20 / Independent 5 | 50 min |
| 6.2 — Branch, review, recover | Teach the day-to-day Git workflow. | Learner uses a feature branch, reviews changes, and undoes mistakes safely. | Guided 65 / Hint 25 / Independent 10 | 60 min |
| 6.3 — Prepare PR-worthy work | Connect Git hygiene to team communication. | Learner can package work for review even before using GitHub UI deeply. | Guided 55 / Hint 25 / Independent 20 | 65 min |

### Path 7. Claude Code Across Terminal, IDE, Desktop, and Browser

| Chapter | Primary learning objective | Target learner outcome | Mode balance | Est. time |
|---------|----------------------------|------------------------|--------------|-----------|
| 7.1 — Choose the right surface | Reduce context loss and interface confusion. | Learner can pick the best surface for a task and explain why. | Guided 70 / Hint 20 / Independent 10 | 40 min |
| 7.2 — Move context cleanly | Teach handoff patterns instead of re-explaining everything. | Learner can move from one surface to another without losing the thread. | Guided 60 / Hint 25 / Independent 15 | 45 min |
| 7.3 — Stay organized while switching | Make cross-surface work feel calm. | Learner leaves behind clean notes, screenshots, and decisions. | Guided 55 / Hint 25 / Independent 20 | 45 min |

### Path 8. Claude Cowork: First Wins for Knowledge Work

| Chapter | Primary learning objective | Target learner outcome | Mode balance | Est. time |
|---------|----------------------------|------------------------|--------------|-----------|
| 8.1 — What Cowork is good at | Anchor Cowork in outcomes, not prompting tricks. | Learner delegates one bounded knowledge-work task successfully. | Guided 75 / Hint 20 / Independent 5 | 45 min |
| 8.2 — Practical desktop tasks | Give immediate everyday wins. | Learner uses Cowork for file organization and document assembly. | Guided 65 / Hint 25 / Independent 10 | 55 min |
| 8.3 — Make Cowork repeatable | Introduce light process and quality control. | Learner turns a one-off success into a reusable workflow. | Guided 55 / Hint 25 / Independent 20 | 55 min |

### Path 9. Claude Cowork for Documents, Research, and Data Extraction

| Chapter | Primary learning objective | Target learner outcome | Mode balance | Est. time |
|---------|----------------------------|------------------------|--------------|-----------|
| 9.1 — Research packs that save time | Show how to gather and synthesize source material responsibly. | Learner builds a structured research pack from multiple files. | Guided 65 / Hint 25 / Independent 10 | 55 min |
| 9.2 — Extract structure from messy files | Teach dependable extraction rather than magical thinking. | Learner turns PDFs, notes, or records into a usable table. | Guided 60 / Hint 25 / Independent 15 | 60 min |
| 9.3 — Turn outputs into decisions | Make extracted or researched material actionable. | Learner creates a final recommendation or dashboard-ready artifact. | Guided 50 / Hint 30 / Independent 20 | 60 min |

### Path 10. Claude Cowork for Admin, Operations, and Team Rituals

| Chapter | Primary learning objective | Target learner outcome | Mode balance | Est. time |
|---------|----------------------------|------------------------|--------------|-----------|
| 10.1 — Meetings and follow-through | Turn messy meeting inputs into usable outputs. | Learner creates prep notes, action items, and follow-up materials. | Guided 65 / Hint 25 / Independent 10 | 50 min |
| 10.2 — Inbox, SOPs, and routine admin | Give everyday operations wins. | Learner uses Cowork to reduce tedious but reviewable admin work. | Guided 60 / Hint 25 / Independent 15 | 60 min |
| 10.3 — Repeatable ops system | Move from one-off tasks to a repeatable team habit. | Learner creates a weekly or daily routine powered by Cowork. | Guided 50 / Hint 25 / Independent 25 | 60 min |

### Path 11. OpenClaw and Claw Runtime Foundations

| Chapter | Primary learning objective | Target learner outcome | Mode balance | Est. time |
|---------|----------------------------|------------------------|--------------|-----------|
| 11.1 — Understand the runtime | Teach what the Claw layer is actually responsible for. | Learner can distinguish model, runtime, skills, memory, and channels. | Guided 70 / Hint 20 / Independent 10 | 50 min |
| 11.2 — Install and boot a starter runtime | Get a bounded starter system running. | A minimal Claw runtime installed with health checks passing. | Guided 75 / Hint 20 / Independent 5 | 65 min |
| 11.3 — First bounded actions | Teach bounded real actions with oversight. | Learner uses the runtime for one small useful task and logs the result. | Guided 60 / Hint 25 / Independent 15 | 55 min |

### Path 12. Skills, Memory, Heartbeats, and Scheduled Work

| Chapter | Primary learning objective | Target learner outcome | Mode balance | Est. time |
|---------|----------------------------|------------------------|--------------|-----------|
| 12.1 — Reusable skills | Turn one-off success into reusable capability. | Learner creates and tests at least one useful skill. | Guided 65 / Hint 25 / Independent 10 | 55 min |
| 12.2 — Memory that helps, not haunts | Introduce memory as explicit, auditable state. | Learner stores useful context with retention and review rules. | Guided 60 / Hint 25 / Independent 15 | 60 min |
| 12.3 — Heartbeats and scheduled work | Teach safe background behavior. | Learner adds a scheduled job with alerts and stop rules. | Guided 55 / Hint 25 / Independent 20 | 65 min |

### Path 13. Multi-Agent Patterns for Real Life

| Chapter | Primary learning objective | Target learner outcome | Mode balance | Est. time |
|---------|----------------------------|------------------------|--------------|-----------|
| 13.1 — Patterns before products | Teach the reusable patterns that survive tool churn. | Learner can describe manager-worker, researcher-writer, and monitor-escalate patterns. | Guided 65 / Hint 25 / Independent 10 | 50 min |
| 13.2 — Build one useful two-agent workflow | Move from abstract pattern to useful system. | Learner assembles a bounded two-agent workflow. | Guided 60 / Hint 25 / Independent 15 | 65 min |
| 13.3 — Avoid complexity addiction | Prevent learners from overbuilding. | Learner can recognize when one agent is enough. | Guided 55 / Hint 25 / Independent 20 | 55 min |

### Path 14. Secure Local Machines and Safe Defaults

| Chapter | Primary learning objective | Target learner outcome | Mode balance | Est. time |
|---------|----------------------------|------------------------|--------------|-----------|
| 14.1 — Secrets, accounts, and permissions | Teach practical security basics. | Learner stores secrets safely and limits runtime access. | Guided 70 / Hint 20 / Independent 10 | 55 min |
| 14.2 — Visibility and recovery | Make systems observable and recoverable. | Learner has logs, backups, and stop procedures. | Guided 65 / Hint 20 / Independent 15 | 60 min |
| 14.3 — Boundaries and kill switches | Teach safe stopping behavior. | Learner can stop automation fast and knows the red lines. | Guided 60 / Hint 20 / Independent 20 | 55 min |

### Path 15. Secure Remote Setups: VPS, Mac mini, and Raspberry Pi

| Chapter | Primary learning objective | Target learner outcome | Mode balance | Est. time |
|---------|----------------------------|------------------------|--------------|-----------|
| 15.1 — Choose and prepare the host | Match hosting shape to skill and risk. | Learner picks a host and prepares it for safe use. | Guided 70 / Hint 20 / Independent 10 | 60 min |
| 15.2 — Lock it down before attaching power | Teach remote hardening before convenience. | Learner configures safe remote access and basic hardening. | Guided 65 / Hint 20 / Independent 15 | 70 min |
| 15.3 — Deploy, observe, maintain | Finish with an actually maintainable remote setup. | Learner brings up a bounded runtime and keeps it observable. | Guided 55 / Hint 20 / Independent 25 | 75 min |

### Path 16. Computer Use, Sandboxes, and Browser Automation

| Chapter | Primary learning objective | Target learner outcome | Mode balance | Est. time |
|---------|----------------------------|------------------------|--------------|-----------|
| 16.1 — Understand the environment | Teach what computer-use automation needs to work well. | Learner understands sandbox, screenshots, inputs, and approval boundaries. | Guided 70 / Hint 20 / Independent 10 | 55 min |
| 16.2 — Do one bounded browser workflow | Turn theory into one useful, low-risk workflow. | Learner completes a bounded browser or desktop workflow end to end. | Guided 60 / Hint 20 / Independent 20 | 70 min |
| 16.3 — Make automation trustworthy | Add observability, limits, and review. | Learner packages the workflow as a monitored, reviewable automation. | Guided 55 / Hint 20 / Independent 25 | 70 min |

### Path 17. Secure Integrations: Email, Calendar, Files, and Messaging

| Chapter | Primary learning objective | Target learner outcome | Mode balance | Est. time |
|---------|----------------------------|------------------------|--------------|-----------|
| 17.1 — Scopes before features | Teach scope discipline before integration excitement. | Learner chooses minimal scopes and tests with non-critical data. | Guided 70 / Hint 20 / Independent 10 | 55 min |
| 17.2 — Connect and validate | Bring the integration up carefully. | Learner completes a safe connection and validation cycle. | Guided 60 / Hint 20 / Independent 20 | 70 min |
| 17.3 — Run integrated workflows safely | Connect integrations to bounded workflows. | Learner packages one safe integrated workflow and can revoke access if needed. | Guided 55 / Hint 20 / Independent 25 | 70 min |

### Path 18. Real-World Agent Builds for Everyday Productivity

| Chapter | Primary learning objective | Target learner outcome | Mode balance | Est. time |
|---------|----------------------------|------------------------|--------------|-----------|
| 18.1 — Personal assistant build | Ship a bounded assistant with obvious everyday value. | Learner builds a personal admin or knowledge assistant. | Guided 55 / Hint 25 / Independent 20 | 80 min |
| 18.2 — Builder assistant build | Show a practical developer/creator workflow. | Learner builds a bounded helper for project work. | Guided 50 / Hint 25 / Independent 25 | 80 min |
| 18.3 — Team helper build | Translate the same principles to a small team workflow. | Learner designs a small shared workflow with clear ownership. | Guided 45 / Hint 25 / Independent 30 | 85 min |

### Path 19. Capstones, Portfolio Proof, and Job-Ready Evidence

| Chapter | Primary learning objective | Target learner outcome | Mode balance | Est. time |
|---------|----------------------------|------------------------|--------------|-----------|
| 19.1 — Capstone 1: Safe local builder workflow | Package a credible local-first workflow. | A portfolio-ready local builder assistant case study. | Guided 40 / Hint 30 / Independent 30 | 120 min |
| 19.2 — Capstone 2: Knowledge-work assistant | Show strong document/research automation with oversight. | A second case study focused on Cowork or similar outcome-driven work. | Guided 35 / Hint 30 / Independent 35 | 120 min |
| 19.3 — Capstone 3: Integrated assistant with safety | Prove the learner can connect real tools responsibly. | A final case study showing integration, approvals, and risk controls. | Guided 30 / Hint 30 / Independent 40 | 140 min |

## 3) Subchapter / Lesson Breakdown

Formatting note for the content team:

- **Deliverable** = what the learner walks away with.
- **Touches** = commands, files, interfaces, or objects used.
- **Media** = where screenshots, diagrams, short videos, or interactive graphics are mandatory.
- **Verify** = the baked-in success check.
- **Pitfalls** = common beginner failure modes.
- **Tutor preload** = the seed prompt or helper behavior the floating Tutor Agent should already know for this lesson.

### Path 1. Start Here: Safety, Confidence, and First Success

#### Chapter 1.1 — Your first 30 minutes

**Lesson 1.1.1 — Create the CLI Academy workspace**
- **Deliverable:** A clean `cli-academy/` folder with `notes/`, `projects/`, and `screenshots/` subfolders.
- **Touches:** `mkdir`, `cd`, File Explorer/Finder, `README.md`
- **Media required:** Screenshot of final folder tree; 30-second intro video showing expected tree.
- **Verify:** Folder tree matches the lesson checker exactly.
- **Common pitfalls / troubleshooting:** Creating folders in the wrong location; using a synced folder that later causes permission issues.
- **Tutor preload:** Show me where to create my workspace safely on {{os}} and explain each folder in plain English.

**Lesson 1.1.2 — Capture a machine baseline**
- **Deliverable:** A starter `machine-profile.md` with OS, shell, package manager, editor, and login method.
- **Touches:** `uname`/`systeminfo`, shell profile, `machine-profile.md`
- **Media required:** Annotated diagram of device + shell + editor relationship.
- **Verify:** Learner can run the profile command block and paste results into the template.
- **Common pitfalls / troubleshooting:** Copying sensitive values into the file; confusing shell type with OS.
- **Tutor preload:** Read my baseline output and tell me what matters for future lessons and what I should not paste publicly.

#### Chapter 1.2 — Safety before speed

**Lesson 1.2.1 — Make a personal safety checklist**
- **Deliverable:** A filled `safety-checklist.md` covering secrets, permissions, backups, and stop rules.
- **Touches:** `safety-checklist.md`, `.env.example`, password manager notes
- **Media required:** Checklist graphic with green/yellow/red examples.
- **Verify:** The learner checks all required items and can explain the stop rules.
- **Common pitfalls / troubleshooting:** Treating `.env.example` like a real secrets file; saving keys in screenshots.
- **Tutor preload:** Turn my setup into a simple green/yellow/red risk checklist for a beginner.

**Lesson 1.2.2 — Learn the stop, undo, recover loop**
- **Deliverable:** A one-page `undo-recover.md` playbook.
- **Touches:** `git restore`, recycle bin/trash, editor local history, screenshots
- **Media required:** Short video: accidental delete -> restore.
- **Verify:** Learner restores a test file successfully.
- **Common pitfalls / troubleshooting:** Trying to memorize commands instead of using the recovery sheet.
- **Tutor preload:** What is the safest undo path for this mistake on {{os}}? Give me the least risky option first.

#### Chapter 1.3 — First real win

**Lesson 1.3.1 — Complete the first tiny project**
- **Deliverable:** A neatly organized downloads or notes folder using manual CLI steps plus AI explanation.
- **Touches:** `pwd`, `ls`, `mkdir`, `mv`, `notes/first-win.md`
- **Media required:** Before/after screenshot pair; animated command preview.
- **Verify:** The folder contents match the target layout and the learner writes what each command did.
- **Common pitfalls / troubleshooting:** Moving the wrong file; forgetting current directory.
- **Tutor preload:** Explain exactly what this command will do in my current folder before I press Enter.

**Lesson 1.3.2 — Lock in the learning loop**
- **Deliverable:** A personal `how-i-learn-best.md` and next-path recommendation.
- **Touches:** `how-i-learn-best.md`, progress check UI
- **Media required:** Interactive confidence slider; recap card.
- **Verify:** Learner selects Guided/Hint/Independent starting mode and sees the next recommended path.
- **Common pitfalls / troubleshooting:** Choosing Independent too early because it 'sounds advanced.'
- **Tutor preload:** Based on my struggles in this lesson, recommend the next mode and why.

### Path 2. Terminal and File-System Foundations for Normal People

#### Chapter 2.1 — Move without fear

**Lesson 2.1.1 — Where am I and what is here?**
- **Deliverable:** A directory map of the workspace.
- **Touches:** `pwd`, `ls`, `dir`, `tree`, `directory-map.md`
- **Media required:** Interactive terminal preview with command-by-command output.
- **Verify:** Checker confirms correct folder path and directory map file.
- **Common pitfalls / troubleshooting:** Running commands from home/root by accident.
- **Tutor preload:** I pasted my terminal output. Tell me where I am and whether it is safe to continue.

**Lesson 2.1.2 — Move between folders the safe way**
- **Deliverable:** A completed folder navigation challenge.
- **Touches:** `cd`, relative vs absolute paths, tab completion
- **Media required:** Annotated path diagram; short video on path mistakes.
- **Verify:** Learner completes a timed navigation drill with no wrong-folder actions.
- **Common pitfalls / troubleshooting:** Using backslashes/slashes incorrectly; quoting paths with spaces.
- **Tutor preload:** Convert this path instruction into the exact command for {{os}} and shell {{shell}}.

#### Chapter 2.2 — Create, rename, copy, move

**Lesson 2.2.1 — Create a project skeleton from scratch**
- **Deliverable:** A `tiny-agent-project/` with subfolders and starter files.
- **Touches:** `mkdir`, `touch`/`type nul`, `echo`, `README.md`, `.gitignore`
- **Media required:** Screenshot of target tree; animated command builder.
- **Verify:** Folder tree matches checker and files contain expected starter text.
- **Common pitfalls / troubleshooting:** Using hidden file syntax incorrectly on Windows; accidental nested folders.
- **Tutor preload:** Generate the exact sequence of safe commands to create this folder tree on my machine.

**Lesson 2.2.2 — Rename and move without breaking things**
- **Deliverable:** A cleaned-up folder structure after a naming refactor.
- **Touches:** `mv`/`ren`, `cp`/`copy`, `rm`/`del` on test files only
- **Media required:** Before/after diagram of rename effects.
- **Verify:** Automated diff shows the final structure is correct.
- **Common pitfalls / troubleshooting:** Deleting instead of moving; renaming while inside the target folder.
- **Tutor preload:** Check whether my rename plan will break references or lose files.

#### Chapter 2.3 — Read and edit text files

**Lesson 2.3.1 — Read files like a developer**
- **Deliverable:** A filled troubleshooting worksheet based on a config file.
- **Touches:** `cat`, `type`, `less`, `more`, `head`, `tail`
- **Media required:** Callout screenshot showing where to look in a config file.
- **Verify:** Learner answers file-reading questions correctly.
- **Common pitfalls / troubleshooting:** Scrolling too fast; editing when only reading was intended.
- **Tutor preload:** Summarize this config file in plain English and tell me which lines matter for a beginner.

**Lesson 2.3.2 — Make a safe text edit**
- **Deliverable:** A corrected markdown or config file with backup copy.
- **Touches:** `cp`, editor save, `diff`/compare, `settings.json`
- **Media required:** Video: make a change, compare, revert.
- **Verify:** Checker confirms the exact lines changed and backup file exists.
- **Common pitfalls / troubleshooting:** Smart quotes; hidden file extensions; encoding issues.
- **Tutor preload:** I need to change one line safely. Show me the smallest safe edit and how to verify it.

**Lesson 2.3.3 — Mini project: create your command cheat sheet**
- **Deliverable:** A personal `terminal-cheatsheet.md` populated from work already done.
- **Touches:** Markdown file, screenshots, copy/paste hygiene
- **Media required:** Template graphic with example entries.
- **Verify:** Cheat sheet contains at least 10 validated commands from prior lessons.
- **Common pitfalls / troubleshooting:** Copying random internet commands instead of validated ones.
- **Tutor preload:** Turn everything I used today into a cheat sheet I can actually trust.

### Path 3. Claude Code: Zero to Productive

#### Chapter 3.1 — Install and connect

**Lesson 3.1.1 — Install Claude Code the right way**
- **Deliverable:** A verified Claude Code install with version captured in notes.
- **Touches:** Install command, package manager, `claude --version`, `install-notes.md`
- **Media required:** Short install video per OS plus screenshot checklist.
- **Verify:** Version command succeeds and learner uploads install notes.
- **Common pitfalls / troubleshooting:** Wrong package manager; PATH not updated; stale shell session.
- **Tutor preload:** Help me install Claude Code on {{os}} and tell me how to verify the install before I do anything else.

**Lesson 3.1.2 — Open your first practice repo**
- **Deliverable:** A cloned or starter repo ready for Claude Code work.
- **Touches:** `git clone` or starter ZIP, `claude`, `README.md`
- **Media required:** Diagram: repo -> Claude Code -> commands -> diff.
- **Verify:** Claude Code can read the repo and answer a codebase question.
- **Common pitfalls / troubleshooting:** Launching in the wrong directory; using a repo with too much complexity too early.
- **Tutor preload:** I’m in this folder. Confirm whether it is the correct repo root for Claude Code.

#### Chapter 3.2 — Learn the core session loop

**Lesson 3.2.1 — Ask for understanding before editing**
- **Deliverable:** A `session-notes.md` with codebase summary, affected files, and plan.
- **Touches:** `claude`, `session-notes.md`, repo search
- **Media required:** Interactive mock conversation showing good vs bad prompts.
- **Verify:** Learner gets a summary that names the right files and change area.
- **Common pitfalls / troubleshooting:** Jumping straight to 'fix it' without repo context.
- **Tutor preload:** Before changing anything, summarize this repo and tell me the safest first improvement.

**Lesson 3.2.2 — Make your first tiny edit**
- **Deliverable:** A small README, config, or UI text improvement committed locally.
- **Touches:** Edited file, `git diff`, `notes/why-this-change.md`
- **Media required:** Before/after screenshot and diff callouts.
- **Verify:** Diff contains only the intended change.
- **Common pitfalls / troubleshooting:** Claude touching extra files; learner accepting broad edits too early.
- **Tutor preload:** Review this diff like a patient mentor and tell me if anything unnecessary changed.

#### Chapter 3.3 — Run, check, and wrap up

**Lesson 3.3.1 — Run the project and inspect output**
- **Deliverable:** A successful local run or preview after Claude’s change.
- **Touches:** `npm run dev` / `python app.py` / repo-specific run command
- **Media required:** Short video showing where to spot success vs failure.
- **Verify:** App, script, or preview runs with expected outcome.
- **Common pitfalls / troubleshooting:** Missing dependencies; already-used ports; forgetting virtual env.
- **Tutor preload:** Here is the error. Tell me the most likely beginner-safe fix path, ranked from least risky to most risky.

**Lesson 3.3.2 — Write a human-readable change note**
- **Deliverable:** A `change-summary.md` the learner could show a teammate.
- **Touches:** Markdown, screenshots, `git diff`
- **Media required:** Template card with What changed / Why / How verified.
- **Verify:** Note names the file, reason, and verification result.
- **Common pitfalls / troubleshooting:** Vague summaries like 'fixed stuff.'
- **Tutor preload:** Turn my diff and terminal output into a teammate-ready summary in plain English.

**Lesson 3.3.3 — Mini project: first real improvement**
- **Deliverable:** One shipped improvement in the practice repo using the full loop.
- **Touches:** `claude`, repo files, `git diff`, progress tracker
- **Media required:** Interactive checklist, timer, celebration animation.
- **Verify:** Learner passes the end-of-path rubric with one real improvement.
- **Common pitfalls / troubleshooting:** Skipping the verify step because the change 'looks fine.'
- **Tutor preload:** Coach me through the ask-plan-edit-run-verify loop one step at a time without doing the thinking for me.

### Path 4. Claude Code Repo Workflows and Project Navigation

#### Chapter 4.1 — Read a codebase fast

**Lesson 4.1.1 — Find the real entry points**
- **Deliverable:** An `entrypoints.md` map for a practice repo.
- **Touches:** Repo tree, framework config, `package.json`/`pyproject.toml`
- **Media required:** Annotated repo map graphic.
- **Verify:** Map lists app entry, config, scripts, and test locations.
- **Common pitfalls / troubleshooting:** Mistaking utility files for entry points.
- **Tutor preload:** Help me identify the entry point and the smallest safe surface area for this change.

**Lesson 4.1.2 — Trace one feature across files**
- **Deliverable:** A feature trace sheet from UI/request to output.
- **Touches:** Search, imports, routing files, `feature-trace.md`
- **Media required:** Animated line flow from input to output.
- **Verify:** Trace sheet names the exact files in order.
- **Common pitfalls / troubleshooting:** Following similar file names instead of the real execution path.
- **Tutor preload:** Walk me through how this feature flows across the repo in plain English.

#### Chapter 4.2 — Make controlled multi-file changes

**Lesson 4.2.1 — Change copy or config in multiple places**
- **Deliverable:** A synchronized multi-file change with no leftovers.
- **Touches:** Search/replace, config files, tests or snapshots
- **Media required:** Before/after diff review graphic.
- **Verify:** Checker finds all required files updated and no extra files touched.
- **Common pitfalls / troubleshooting:** Changing generated files or lockfiles unnecessarily.
- **Tutor preload:** List every file that should change for this task before editing anything.

**Lesson 4.2.2 — Add a tiny feature with guardrails**
- **Deliverable:** A tiny new command, page, or script added safely.
- **Touches:** Source file, route/command file, docs, maybe test
- **Media required:** Diagram: requirement -> files -> verification.
- **Verify:** Feature works and docs reflect the change.
- **Common pitfalls / troubleshooting:** Adding too much logic for a first feature.
- **Tutor preload:** Help me slice this feature into the smallest version that still feels real.

**Lesson 4.2.3 — Create a session handoff note**
- **Deliverable:** A `SESSION_HANDOFF.md` capturing context, progress, and next actions.
- **Touches:** `SESSION_HANDOFF.md`, repo status, open issues
- **Media required:** Template card and example.
- **Verify:** Another learner can pick up the work using only the handoff note.
- **Common pitfalls / troubleshooting:** Writing novel-length notes instead of actionable context.
- **Tutor preload:** Turn this work session into a clean handoff note for future me.

#### Chapter 4.3 — Work like a careful teammate

**Lesson 4.3.1 — Update docs as part of the change**
- **Deliverable:** README or docs updated alongside code.
- **Touches:** Docs folder, comments, examples
- **Media required:** Short video on 'docs are part of the feature.'
- **Verify:** Docs mention setup, usage, or changed behavior correctly.
- **Common pitfalls / troubleshooting:** Code changes without instructions on how to use them.
- **Tutor preload:** What documentation change belongs with this diff? Keep it minimal but sufficient.

**Lesson 4.3.2 — Use Claude Code for code review on your own work**
- **Deliverable:** A self-review checklist and cleaned diff.
- **Touches:** `git diff`, review checklist, comments
- **Media required:** Interactive review rubric.
- **Verify:** Learner removes at least one unnecessary line or file.
- **Common pitfalls / troubleshooting:** Treating AI output as final instead of draft.
- **Tutor preload:** Review my diff like a strict senior engineer focused on clarity, risk, and overreach.

**Lesson 4.3.3 — Mini project: ship a scoped improvement pack**
- **Deliverable:** A small repo improvement pack with handoff note and docs.
- **Touches:** 2-4 files, docs, handoff note, verify commands
- **Media required:** End-of-path rubric and portfolio card.
- **Verify:** All three required artifacts pass checker.
- **Common pitfalls / troubleshooting:** Forgetting one of the three required artifacts.
- **Tutor preload:** Give me the final acceptance checklist for a clean small-scope repo improvement.

### Path 5. Claude Code Debugging, Testing, and Refactoring

#### Chapter 5.1 — Reproduce before you fix

**Lesson 5.1.1 — Turn a vague bug into steps**
- **Deliverable:** A `bug-report.md` with reproduction steps, expected result, and actual result.
- **Touches:** Issue template, logs, screenshots, terminal history
- **Media required:** Bug-report example with callouts.
- **Verify:** Reproduction steps work on a fresh run.
- **Common pitfalls / troubleshooting:** Writing 'it does not work' instead of steps.
- **Tutor preload:** Rewrite my vague issue into a reproducible bug report a beginner can follow.

**Lesson 5.1.2 — Collect the right clues**
- **Deliverable:** A debugging evidence pack with logs, screenshots, and suspected files.
- **Touches:** Logs, stack traces, screenshots, `debug-notes.md`
- **Media required:** Diagram of symptom vs cause vs evidence.
- **Verify:** Evidence pack includes enough detail to test a fix.
- **Common pitfalls / troubleshooting:** Changing code before capturing evidence.
- **Tutor preload:** Read this error output and tell me what is signal vs noise.

#### Chapter 5.2 — Fix with tests and checks

**Lesson 5.2.1 — Run existing tests and interpret failures**
- **Deliverable:** A `test-readout.md` explaining what failed and why it matters.
- **Touches:** `pytest` / `npm test` / repo test command
- **Media required:** Short video on reading test output.
- **Verify:** Learner identifies one failing test and related file correctly.
- **Common pitfalls / troubleshooting:** Stopping at the first red line without reading the failure context.
- **Tutor preload:** Explain this test output in plain English and show me the likely file to inspect first.

**Lesson 5.2.2 — Add one tiny protective test**
- **Deliverable:** A new test covering the bug or edge case.
- **Touches:** Test file, fixture/sample data, assert statements
- **Media required:** Annotated test anatomy graphic.
- **Verify:** Test fails before fix or clearly proves expected behavior after fix.
- **Common pitfalls / troubleshooting:** Writing a huge test that checks five things at once.
- **Tutor preload:** Help me write the smallest useful test for this bug without overengineering it.

**Lesson 5.2.3 — Implement the fix and rerun checks**
- **Deliverable:** A verified bug fix with test evidence.
- **Touches:** Source file, test command, screenshots of green run
- **Media required:** Before/after test results.
- **Verify:** Tests pass and bug reproduction no longer fails.
- **Common pitfalls / troubleshooting:** Fixing symptom but not root cause.
- **Tutor preload:** Rank the possible fixes by safety and tell me which one to try first.

#### Chapter 5.3 — Refactor without fear

**Lesson 5.3.1 — Spot code smells beginners can actually fix**
- **Deliverable:** A code-smell checklist tied to a real file.
- **Touches:** Long functions, duplicate logic, naming, comments
- **Media required:** Graphic: harmless cleanup vs risky refactor.
- **Verify:** Learner marks what is safe today and what is too advanced.
- **Common pitfalls / troubleshooting:** Trying architectural rewrites on day one.
- **Tutor preload:** Point out the top three beginner-safe refactors in this file.

**Lesson 5.3.2 — Make one clarity refactor**
- **Deliverable:** A renamed variable/function or extracted helper that improves readability.
- **Touches:** Source file, tests, diff
- **Media required:** Side-by-side before/after readability view.
- **Verify:** Tests still pass and diff remains small.
- **Common pitfalls / troubleshooting:** Renaming across too many files at once.
- **Tutor preload:** Check whether this refactor changed behavior or only improved clarity.

**Lesson 5.3.3 — Mini project: fix, test, refactor**
- **Deliverable:** A completed issue workflow from bug report to clean diff.
- **Touches:** Bug report, test, fix, refactor note
- **Media required:** Capstone-style rubric.
- **Verify:** All workflow artifacts exist and pass rubric.
- **Common pitfalls / troubleshooting:** Skipping the final explanation of why the fix is trustworthy.
- **Tutor preload:** Turn this whole debugging session into a clean engineering story I can reuse.

### Path 6. Git and GitHub for AI-Assisted Builders

#### Chapter 6.1 — Version control without panic

**Lesson 6.1.1 — Read `git status` like a grown-up**
- **Deliverable:** A status worksheet tied to a real repo state.
- **Touches:** `git status`, `git diff`, `git log`
- **Media required:** Interactive color-coded status guide.
- **Verify:** Learner can explain staged, unstaged, and untracked in plain English.
- **Common pitfalls / troubleshooting:** Mixing working tree and commit history concepts.
- **Tutor preload:** Explain my git status output and tell me the safest next command.

**Lesson 6.1.2 — Make a clean first commit**
- **Deliverable:** One intentional commit with a meaningful message.
- **Touches:** `git add`, `git commit`, commit message template
- **Media required:** Commit message examples: weak vs strong.
- **Verify:** Commit contains only intended files and good message.
- **Common pitfalls / troubleshooting:** Accidentally committing `.env`, large files, or noise.
- **Tutor preload:** Review my staged files and commit message before I commit.

#### Chapter 6.2 — Branch, review, recover

**Lesson 6.2.1 — Create and use a feature branch**
- **Deliverable:** A working branch for a single task.
- **Touches:** `git switch -c` / `git checkout -b`, branch naming
- **Media required:** Diagram of main vs feature branch.
- **Verify:** Learner makes changes on the correct branch.
- **Common pitfalls / troubleshooting:** Doing work on main by accident.
- **Tutor preload:** Name this branch like a real team would for this task.

**Lesson 6.2.2 — Undo the safe way**
- **Deliverable:** A recovery practice with restore or revert on a test mistake.
- **Touches:** `git restore`, `git revert`, local history
- **Media required:** Short video: bad edit -> recovery -> confirm.
- **Verify:** Mistake is undone without losing good work.
- **Common pitfalls / troubleshooting:** Using reset destructively when a safer option exists.
- **Tutor preload:** I made this mistake. Which undo command is safest here and why?

#### Chapter 6.3 — Prepare PR-worthy work

**Lesson 6.3.1 — Write a PR-style summary**
- **Deliverable:** A `pr-summary.md` with problem, change, verification, risks.
- **Touches:** Markdown, diff, screenshots
- **Media required:** Template with acceptance criteria block.
- **Verify:** Summary is clear enough for reviewer handoff.
- **Common pitfalls / troubleshooting:** Leaving out risks or verification steps.
- **Tutor preload:** Turn my work into a reviewer-friendly PR summary.

**Lesson 6.3.2 — Handle a simple merge conflict**
- **Deliverable:** A resolved practice conflict in a toy repo.
- **Touches:** Branch merge, conflict markers, manual edit
- **Media required:** Conflict marker explainer graphic.
- **Verify:** Conflict markers are removed and final file matches expected text.
- **Common pitfalls / troubleshooting:** Accepting both sides blindly.
- **Tutor preload:** Explain this merge conflict and show the minimal correct resolution.

**Lesson 6.3.3 — Mini project: Git seatbelt workflow**
- **Deliverable:** A complete branch -> commit -> review summary -> merge simulation.
- **Touches:** Branch, commits, diff, summary, recovery note
- **Media required:** End-of-path checklist.
- **Verify:** All four required Git artifacts exist and match rubric.
- **Common pitfalls / troubleshooting:** Treating Git like ceremony instead of safety.
- **Tutor preload:** Coach me through a full safe Git workflow for this small change.

### Path 7. Claude Code Across Terminal, IDE, Desktop, and Browser

#### Chapter 7.1 — Choose the right surface

**Lesson 7.1.1 — Terminal vs IDE vs desktop vs browser**
- **Deliverable:** A decision matrix for common tasks.
- **Touches:** Decision matrix sheet, examples
- **Media required:** Comparison chart and micro-demo video.
- **Verify:** Learner picks the correct surface for 8/10 scenarios.
- **Common pitfalls / troubleshooting:** Using browser chat for repo-heavy edits that belong in Claude Code.
- **Tutor preload:** Given this task, tell me which Claude surface fits best and why.

**Lesson 7.1.2 — Build your personal default workflow**
- **Deliverable:** A `my-default-workflow.md` describing start, switch, and stop points.
- **Touches:** Markdown, screenshots of setup
- **Media required:** Workflow lane diagram.
- **Verify:** Workflow document names primary and secondary surfaces clearly.
- **Common pitfalls / troubleshooting:** Trying to use every surface every day.
- **Tutor preload:** Design me a simple default workflow for my current skill level and device setup.

#### Chapter 7.2 — Move context cleanly

**Lesson 7.2.1 — Create a session context packet**
- **Deliverable:** A reusable context packet for task continuation.
- **Touches:** `SESSION_HANDOFF.md`, screenshots, file list, goal statement
- **Media required:** Example packet with annotations.
- **Verify:** Packet includes repo path, goal, blockers, and verify command.
- **Common pitfalls / troubleshooting:** Handoffs missing file paths or current state.
- **Tutor preload:** Create a context packet from this session that another Claude surface can pick up.

**Lesson 7.2.2 — Resume work in a new surface**
- **Deliverable:** A completed task started in one surface and finished in another.
- **Touches:** Claude desktop/browser + Claude Code + handoff file
- **Media required:** Two-screen demo video.
- **Verify:** Learner completes the task with no repeated setup questions.
- **Common pitfalls / troubleshooting:** Switching without saving notes or confirming repo state.
- **Tutor preload:** I’m switching surfaces. Tell me exactly what context I must carry over.

#### Chapter 7.3 — Stay organized while switching

**Lesson 7.3.1 — Capture screenshots that are actually useful**
- **Deliverable:** A `screenshots/` folder with named, annotated evidence.
- **Touches:** Screenshot tool, naming convention, simple annotation
- **Media required:** Graphic: bad screenshot vs useful screenshot.
- **Verify:** Files follow naming convention and support the current task.
- **Common pitfalls / troubleshooting:** Capturing private data or unlabeled screenshots.
- **Tutor preload:** Tell me which screenshots are worth keeping for debugging and which to delete.

**Lesson 7.3.2 — Make decisions explicit**
- **Deliverable:** A `decisions.md` that records chosen tools, prompts, and tradeoffs.
- **Touches:** Markdown, timestamps, one-line rationales
- **Media required:** Decision-log template.
- **Verify:** Three decisions are logged with reasons.
- **Common pitfalls / troubleshooting:** Thinking 'I will remember that later.'
- **Tutor preload:** Turn this messy conversation into a clean decision log.

### Path 8. Claude Cowork: First Wins for Knowledge Work

#### Chapter 8.1 — What Cowork is good at

**Lesson 8.1.1 — Set up your first bounded Cowork task**
- **Deliverable:** A clear task brief with inputs, output format, and review criteria.
- **Touches:** Task brief template, source folder, output folder
- **Media required:** Video: bad brief vs good brief.
- **Verify:** Cowork returns a deliverable that matches the requested format.
- **Common pitfalls / troubleshooting:** Giving an open-ended task with no source files or criteria.
- **Tutor preload:** Rewrite my task so Cowork can actually finish it well.

**Lesson 8.1.2 — Review output with human oversight**
- **Deliverable:** A corrected deliverable plus review checklist.
- **Touches:** Review checklist, markup/comments, final output
- **Media required:** Markup demo on a document output.
- **Verify:** Learner catches and corrects at least one issue before accepting output.
- **Common pitfalls / troubleshooting:** Treating first draft as final.
- **Tutor preload:** Review this Cowork output with me and tell me what still needs human judgment.

#### Chapter 8.2 — Practical desktop tasks

**Lesson 8.2.1 — Clean up a messy folder**
- **Deliverable:** A sorted folder plus summary of duplicates, deletions, and keepers.
- **Touches:** Downloads folder copy, naming rules, archive folder
- **Media required:** Before/after folder tree screenshot.
- **Verify:** Folder is sorted to rubric with no unintended deletions.
- **Common pitfalls / troubleshooting:** Running on real files before practicing on copies.
- **Tutor preload:** Design a safe cleanup plan for this messy folder with zero-risk steps first.

**Lesson 8.2.2 — Assemble a document from source files**
- **Deliverable:** A short report or brief created from multiple files.
- **Touches:** Source files, output doc, citation or evidence notes
- **Media required:** Document assembly diagram.
- **Verify:** Output references the provided sources correctly.
- **Common pitfalls / troubleshooting:** Missing source boundaries; invented details.
- **Tutor preload:** Turn these files into a structured brief and show me where every point came from.

#### Chapter 8.3 — Make Cowork repeatable

**Lesson 8.3.1 — Create a reusable task template**
- **Deliverable:** A reusable `cowork-task-template.md`.
- **Touches:** Template file, examples, acceptance checklist
- **Media required:** Template graphic.
- **Verify:** Template works on a second example task.
- **Common pitfalls / troubleshooting:** Writing a template too vague to reuse.
- **Tutor preload:** Turn this successful task into a template I can reuse next week.

**Lesson 8.3.2 — Mini project: weekly brief generator**
- **Deliverable:** A repeatable workflow for creating a weekly summary from source files.
- **Touches:** Source folder, template, output brief, review log
- **Media required:** End-of-path demo video.
- **Verify:** Second run produces a passable result with minimal editing.
- **Common pitfalls / troubleshooting:** No acceptance checklist, so output quality drifts.
- **Tutor preload:** Give me a weekly-brief workflow that uses Cowork but keeps me in control.

**Lesson 8.3.3 — Know when not to use Cowork**
- **Deliverable:** A personal 'use / don’t use' decision card.
- **Touches:** Decision card, example tasks
- **Media required:** Green/yellow/red suitability matrix.
- **Verify:** Learner classifies 10 sample tasks correctly.
- **Common pitfalls / troubleshooting:** Using Cowork for tasks better handled in chat or code workflows.
- **Tutor preload:** Should this be Cowork, Claude Code, or manual work? Explain plainly.

### Path 9. Claude Cowork for Documents, Research, and Data Extraction

#### Chapter 9.1 — Research packs that save time

**Lesson 9.1.1 — Build a source bundle**
- **Deliverable:** A clean source bundle with naming and scope notes.
- **Touches:** Source folder, scope note, file naming
- **Media required:** Annotated source-bundle screenshot.
- **Verify:** Bundle is complete, deduplicated, and scoped.
- **Common pitfalls / troubleshooting:** Mixing unrelated documents and expecting good synthesis.
- **Tutor preload:** Help me prepare these source files so Cowork can reason over them cleanly.

**Lesson 9.1.2 — Generate a research brief**
- **Deliverable:** A brief with sections, open questions, and evidence notes.
- **Touches:** Task brief, output doc, source references
- **Media required:** Brief anatomy diagram.
- **Verify:** Brief includes evidence-backed claims and open questions.
- **Common pitfalls / troubleshooting:** Asking for certainty when sources are incomplete.
- **Tutor preload:** Turn these sources into a brief with explicit uncertainty and next questions.

#### Chapter 9.2 — Extract structure from messy files

**Lesson 9.2.1 — Define the extraction schema first**
- **Deliverable:** A schema sheet with columns and examples.
- **Touches:** CSV headers, JSON schema, extraction notes
- **Media required:** Schema-before-extraction graphic.
- **Verify:** Schema is approved before extraction runs.
- **Common pitfalls / troubleshooting:** Starting extraction without deciding columns.
- **Tutor preload:** Design a sensible extraction schema for these files before doing any work.

**Lesson 9.2.2 — Run extraction and audit samples**
- **Deliverable:** A populated CSV/JSON plus quality audit notes.
- **Touches:** CSV/JSON output, sample spot checks
- **Media required:** Spot-check video.
- **Verify:** Spot checks confirm at least 90% of audited rows/fields.
- **Common pitfalls / troubleshooting:** Trusting extraction without sample audits.
- **Tutor preload:** Pick 10 rows to audit and tell me what errors to look for first.

#### Chapter 9.3 — Turn outputs into decisions

**Lesson 9.3.1 — Summarize findings for humans**
- **Deliverable:** An executive-ready summary from a table or brief.
- **Touches:** Summary doc, top findings, caveats
- **Media required:** Pyramid summary graphic.
- **Verify:** Summary communicates main findings and caveats accurately.
- **Common pitfalls / troubleshooting:** Listing everything instead of prioritizing.
- **Tutor preload:** Turn this table into a short human-friendly summary with caveats.

**Lesson 9.3.2 — Package files for reuse**
- **Deliverable:** A deliverable folder with raw, cleaned, summary, and notes.
- **Touches:** Folder structure, README, output files
- **Media required:** Deliverable package screenshot.
- **Verify:** Another person can understand the package without asking questions.
- **Common pitfalls / troubleshooting:** Leaving out README or schema notes.
- **Tutor preload:** Create a clean deliverable package for this research/extraction job.

**Lesson 9.3.3 — Mini project: dossier builder**
- **Deliverable:** A full research dossier with extracted facts and final brief.
- **Touches:** Source bundle, schema, output docs, README
- **Media required:** End-of-path acceptance rubric.
- **Verify:** All package parts exist and references are traceable.
- **Common pitfalls / troubleshooting:** Skipping traceability between source and final claim.
- **Tutor preload:** Give me the final quality checklist for a trustworthy research dossier.

### Path 10. Claude Cowork for Admin, Operations, and Team Rituals

#### Chapter 10.1 — Meetings and follow-through

**Lesson 10.1.1 — Build meeting prep from source material**
- **Deliverable:** A one-page meeting brief.
- **Touches:** Calendar export or notes, agenda template, source docs
- **Media required:** Brief example and source-to-brief diagram.
- **Verify:** Brief includes participants, context, goals, and questions.
- **Common pitfalls / troubleshooting:** Briefs that are too long to be useful.
- **Tutor preload:** Turn these source files into a tight meeting brief that respects my time.

**Lesson 10.1.2 — Generate follow-up notes and actions**
- **Deliverable:** A clean action tracker from messy notes or transcript.
- **Touches:** Action tracker, owner/date fields, follow-up email draft
- **Media required:** Action-item formatting video.
- **Verify:** Tracker has clear owners and deadlines.
- **Common pitfalls / troubleshooting:** Action items with no owner or due date.
- **Tutor preload:** Extract only concrete action items from this meeting material.

#### Chapter 10.2 — Inbox, SOPs, and routine admin

**Lesson 10.2.1 — Draft a lightweight SOP**
- **Deliverable:** A step-by-step SOP from repeated work.
- **Touches:** SOP template, screenshots, checklist
- **Media required:** SOP anatomy graphic.
- **Verify:** Another beginner can follow the SOP successfully.
- **Common pitfalls / troubleshooting:** Writing policy language instead of action steps.
- **Tutor preload:** Turn this repeated task into a dead-simple SOP with checkpoints.

**Lesson 10.2.2 — Prepare an inbox triage plan**
- **Deliverable:** A triage rubric and folder/label proposal.
- **Touches:** Email categories, response templates, review checklist
- **Media required:** Inbox triage flowchart.
- **Verify:** Learner can classify sample messages correctly.
- **Common pitfalls / troubleshooting:** Trying to auto-send before a review layer exists.
- **Tutor preload:** Design a safe inbox triage workflow with humans still approving sensitive actions.

#### Chapter 10.3 — Repeatable ops system

**Lesson 10.3.1 — Create a weekly operations cadence**
- **Deliverable:** A weekly checklist tied to Cowork task templates.
- **Touches:** Cadence sheet, templates, folder conventions
- **Media required:** Weekly cadence board screenshot.
- **Verify:** Checklist covers inputs, outputs, review point, and archive step.
- **Common pitfalls / troubleshooting:** No archive step, so files accumulate into chaos.
- **Tutor preload:** Build me a weekly cadence that uses Cowork but never hides critical decisions.

**Lesson 10.3.2 — Audit a routine for failure points**
- **Deliverable:** A risk register for an operational workflow.
- **Touches:** Risk table, failure modes, mitigations
- **Media required:** Red/yellow/green risk matrix.
- **Verify:** Three top failure points are logged with mitigations.
- **Common pitfalls / troubleshooting:** Assuming 'automation' means 'reliable.'
- **Tutor preload:** Review this workflow and tell me where it is most likely to fail.

**Lesson 10.3.3 — Mini project: weekly ops assistant**
- **Deliverable:** A small but real operational workflow package.
- **Touches:** Task templates, outputs, risk register, SOP
- **Media required:** End-of-path showcase card.
- **Verify:** Workflow can run twice with stable output quality.
- **Common pitfalls / troubleshooting:** Quality drift across runs due to vague templates.
- **Tutor preload:** Give me the go-live checklist for a small Cowork-powered ops workflow.

### Path 11. OpenClaw and Claw Runtime Foundations

#### Chapter 11.1 — Understand the runtime

**Lesson 11.1.1 — Map the Claw stack**
- **Deliverable:** A `claw-stack-map.md` showing model, runtime, channel, skills, memory, and machine.
- **Touches:** Stack map file, architecture diagram
- **Media required:** Annotated architecture diagram.
- **Verify:** Learner labels each layer correctly.
- **Common pitfalls / troubleshooting:** Thinking Claw is the model itself.
- **Tutor preload:** Explain the difference between model, runtime, channel, and skill using my setup.

**Lesson 11.1.2 — Choose a safe first deployment shape**
- **Deliverable:** A written choice between local machine, VPS, or dedicated device with rationale.
- **Touches:** Decision matrix, `deployment-choice.md`
- **Media required:** Green/yellow/red deployment chart.
- **Verify:** Choice fits the learner’s skill and risk tolerance.
- **Common pitfalls / troubleshooting:** Starting on a public VPS before learning local basics.
- **Tutor preload:** Recommend the safest first Claw deployment shape for my device and experience.

#### Chapter 11.2 — Install and boot a starter runtime

**Lesson 11.2.1 — Install the starter runtime**
- **Deliverable:** A local or lab runtime with startup notes captured.
- **Touches:** Installer or repo steps, config file, `.env`, service start command
- **Media required:** Per-OS or per-host screenshots; short boot video.
- **Verify:** Health check or startup log passes.
- **Common pitfalls / troubleshooting:** Copying example config without reading required fields.
- **Tutor preload:** Walk me through a safe starter install and tell me what secrets belong where.

**Lesson 11.2.2 — Connect one safe interaction channel**
- **Deliverable:** A single approved chat/control channel connected for testing.
- **Touches:** Channel config, auth tokens, test message
- **Media required:** Channel setup screenshot with secret redaction guide.
- **Verify:** Test message reaches the runtime and receives expected response.
- **Common pitfalls / troubleshooting:** Connecting multiple channels before one is stable.
- **Tutor preload:** Review my channel setup for obvious security mistakes before I connect it.

#### Chapter 11.3 — First bounded actions

**Lesson 11.3.1 — Create the agent persona and rules**
- **Deliverable:** A starter persona/rules file with boundaries.
- **Touches:** Persona file, allowed actions list, blocked actions list
- **Media required:** Persona template and callout graphic.
- **Verify:** Rules file blocks risky actions and names approval points.
- **Common pitfalls / troubleshooting:** Writing a heroic omnipotent persona instead of a bounded assistant.
- **Tutor preload:** Turn my vague agent idea into a safe bounded persona and rules file.

**Lesson 11.3.2 — Run a first real task**
- **Deliverable:** A completed bounded task such as reminder, folder check, or note capture.
- **Touches:** Task command or message, logs, output note
- **Media required:** Before/after screenshots and log view.
- **Verify:** Logs show task ran successfully and output matches the request.
- **Common pitfalls / troubleshooting:** Jumping straight to email/calendar actions before bounded local tasks.
- **Tutor preload:** Coach me through my first low-risk Claw task from request to verification.

**Lesson 11.3.3 — Review logs and close the loop**
- **Deliverable:** A `run-review.md` with what happened, what failed, and what changes next.
- **Touches:** Logs, screenshots, notes
- **Media required:** Log anatomy diagram.
- **Verify:** Review note accurately describes the run.
- **Common pitfalls / troubleshooting:** Ignoring warnings because the task 'worked.'
- **Tutor preload:** Help me read these logs and tell me what I should fix before the next run.

### Path 12. Skills, Memory, Heartbeats, and Scheduled Work

#### Chapter 12.1 — Reusable skills

**Lesson 12.1.1 — Design a narrow skill**
- **Deliverable:** A one-page skill spec with input, output, tools, and limits.
- **Touches:** Skill spec, examples, allow/deny list
- **Media required:** Skill spec template graphic.
- **Verify:** Skill scope is narrow enough to test safely.
- **Common pitfalls / troubleshooting:** Trying to build 'do everything' skills.
- **Tutor preload:** Shrink this skill idea until it becomes testable and safe.

**Lesson 12.1.2 — Implement the first skill**
- **Deliverable:** One working skill integrated into the runtime.
- **Touches:** Skill file/folder, config, sample inputs
- **Media required:** Short implementation demo.
- **Verify:** Skill returns the expected output on sample input.
- **Common pitfalls / troubleshooting:** No sample inputs; unclear failure behavior.
- **Tutor preload:** Review this skill implementation and tell me what is too broad or too risky.

#### Chapter 12.2 — Memory that helps, not haunts

**Lesson 12.2.1 — Define memory classes**
- **Deliverable:** A memory policy covering short-term, long-term, and do-not-store.
- **Touches:** Memory policy doc, examples
- **Media required:** Memory policy matrix.
- **Verify:** Policy names what gets stored, for how long, and why.
- **Common pitfalls / troubleshooting:** Saving sensitive data by default.
- **Tutor preload:** Help me define memory classes for this assistant with privacy in mind.

**Lesson 12.2.2 — Test recall and correction**
- **Deliverable:** A memory test pack showing save, recall, update, and forget flows.
- **Touches:** Test script, sample facts, correction step
- **Media required:** Animated memory lifecycle graphic.
- **Verify:** Runtime recalls allowed facts and forgets blocked facts correctly.
- **Common pitfalls / troubleshooting:** No correction path for wrong memory.
- **Tutor preload:** Run me through a beginner-safe memory test so I can trust what is stored.

#### Chapter 12.3 — Heartbeats and scheduled work

**Lesson 12.3.1 — Create a heartbeat with status reporting**
- **Deliverable:** A heartbeat job that reports health without taking risky action.
- **Touches:** Scheduler/cron, status message, logs
- **Media required:** Heartbeat flow diagram.
- **Verify:** Heartbeat runs on schedule and writes/returns status correctly.
- **Common pitfalls / troubleshooting:** Scheduling action-heavy jobs before status-only jobs.
- **Tutor preload:** Help me create a heartbeat that only observes and reports.

**Lesson 12.3.2 — Create one scheduled useful task**
- **Deliverable:** A scheduled reminder, cleanup, or digest task with approval rules.
- **Touches:** Scheduler, task config, approval flag
- **Media required:** Approval checkpoint graphic.
- **Verify:** Scheduled task runs and respects approval boundaries.
- **Common pitfalls / troubleshooting:** Background task sends or deletes before review.
- **Tutor preload:** Review my scheduled task and tell me where a human approval step belongs.

**Lesson 12.3.3 — Mini project: personal daily review agent**
- **Deliverable:** A small daily review system using skills + memory + heartbeat.
- **Touches:** Skills, memory policy, scheduler, output digest
- **Media required:** End-of-path system diagram.
- **Verify:** System runs for two cycles with clean logs and bounded output.
- **Common pitfalls / troubleshooting:** No clear owner for reviewing output.
- **Tutor preload:** Give me the production checklist for a small daily review agent.

### Path 13. Multi-Agent Patterns for Real Life

#### Chapter 13.1 — Patterns before products

**Lesson 13.1.1 — Manager-worker pattern**
- **Deliverable:** A pattern card and toy implementation plan.
- **Touches:** Pattern card, task routing notes
- **Media required:** Sequence diagram.
- **Verify:** Learner names manager input, worker output, and stop condition.
- **Common pitfalls / troubleshooting:** Letting the manager also do all the work.
- **Tutor preload:** Explain the manager-worker pattern using my own planned workflow.

**Lesson 13.1.2 — Researcher-writer pattern**
- **Deliverable:** A split workflow for source gathering and final writing.
- **Touches:** Research notes, writing template, handoff file
- **Media required:** Two-lane workflow graphic.
- **Verify:** Handoff between agents is explicit and reviewable.
- **Common pitfalls / troubleshooting:** No source boundaries; writer invents unsupported content.
- **Tutor preload:** Design a researcher-writer split for this task and define the handoff contract.

#### Chapter 13.2 — Build one useful two-agent workflow

**Lesson 13.2.1 — Define roles, contracts, and stop conditions**
- **Deliverable:** A two-agent contract file.
- **Touches:** Role files, handoff schema, stop rules
- **Media required:** Contract template and example.
- **Verify:** Roles do not overlap and each has clear stop conditions.
- **Common pitfalls / troubleshooting:** Agents with vague responsibilities.
- **Tutor preload:** Make these two agents less overlapping and more accountable.

**Lesson 13.2.2 — Run the workflow on a small real task**
- **Deliverable:** A completed two-agent run with logs and outputs.
- **Touches:** Workflow config, logs, outputs, review note
- **Media required:** Run timeline animation.
- **Verify:** Logs show clean handoff and final output quality is acceptable.
- **Common pitfalls / troubleshooting:** No fallback when one agent fails.
- **Tutor preload:** Read this run and tell me where the handoff broke down.

#### Chapter 13.3 — Avoid complexity addiction

**Lesson 13.3.1 — Compare one-agent vs two-agent results**
- **Deliverable:** A side-by-side comparison sheet.
- **Touches:** Comparison worksheet, cost/time notes
- **Media required:** Comparison dashboard mockup.
- **Verify:** Learner chooses the simpler architecture when appropriate.
- **Common pitfalls / troubleshooting:** Using more agents because it 'sounds advanced.'
- **Tutor preload:** Tell me whether this workflow truly needs multiple agents.

**Lesson 13.3.2 — Escalation and human review**
- **Deliverable:** A review policy for multi-agent work.
- **Touches:** Review policy, risk triggers, escalation list
- **Media required:** Escalation flowchart.
- **Verify:** Policy names when to stop automation and ask a human.
- **Common pitfalls / troubleshooting:** No escalation path for ambiguous or sensitive cases.
- **Tutor preload:** Define review triggers for this multi-agent workflow.

**Lesson 13.3.3 — Mini project: two-agent weekly brief**
- **Deliverable:** A weekly brief workflow with separate gatherer and editor roles.
- **Touches:** Two roles, handoff file, final brief, audit note
- **Media required:** End-of-path rubric.
- **Verify:** Workflow completes with traceable handoff and acceptable output.
- **Common pitfalls / troubleshooting:** No audit note, so errors are hard to learn from.
- **Tutor preload:** Give me the quality checklist for a small two-agent weekly brief workflow.

### Path 14. Secure Local Machines and Safe Defaults

#### Chapter 14.1 — Secrets, accounts, and permissions

**Lesson 14.1.1 — Create a clean secrets strategy**
- **Deliverable:** A `secrets-playbook.md` and `.env.example`.
- **Touches:** Password manager, `.env.example`, ignore rules
- **Media required:** Secret redaction guide and screenshot examples.
- **Verify:** No real secrets appear in repo or screenshots.
- **Common pitfalls / troubleshooting:** Saving tokens in notes or terminals with shared history.
- **Tutor preload:** Review my secrets setup and tell me the highest-risk mistake first.

**Lesson 14.1.2 — Apply least privilege**
- **Deliverable:** A permissions matrix for files, folders, and integrations.
- **Touches:** Permissions sheet, app scopes, local folders
- **Media required:** Least-privilege matrix.
- **Verify:** Matrix limits access to only needed paths/scopes.
- **Common pitfalls / troubleshooting:** Granting 'full access' because it is easier.
- **Tutor preload:** Help me reduce these permissions to the minimum needed.

#### Chapter 14.2 — Visibility and recovery

**Lesson 14.2.1 — Create a local audit log habit**
- **Deliverable:** A simple `audit-log.md` or log folder convention.
- **Touches:** Log path, timestamps, event categories
- **Media required:** Audit log example and callouts.
- **Verify:** Three key actions are logged clearly.
- **Common pitfalls / troubleshooting:** No timestamps or no indication of which machine ran the task.
- **Tutor preload:** Turn this messy history into a clean audit log format.

**Lesson 14.2.2 — Set up backup and restore for learning projects**
- **Deliverable:** A backup routine and restore test.
- **Touches:** Backup folder, zip/archive, restore test
- **Media required:** Backup-restore demo video.
- **Verify:** Learner restores a practice project successfully.
- **Common pitfalls / troubleshooting:** Assuming cloud sync equals backup.
- **Tutor preload:** Design a backup routine for my beginner projects and a quick restore test.

#### Chapter 14.3 — Boundaries and kill switches

**Lesson 14.3.1 — Define red-line actions**
- **Deliverable:** A `never-do-without-approval.md` file.
- **Touches:** Policy file, action classes, examples
- **Media required:** Red-line action poster.
- **Verify:** High-risk actions are clearly named and blocked.
- **Common pitfalls / troubleshooting:** Vague policies like 'be careful.'
- **Tutor preload:** Help me write concrete red-line actions for this setup.

**Lesson 14.3.2 — Create a manual kill-switch routine**
- **Deliverable:** A documented stop routine for local agents and services.
- **Touches:** Stop commands, service manager, logout/disconnect steps
- **Media required:** Emergency stop card.
- **Verify:** Learner performs a stop test successfully.
- **Common pitfalls / troubleshooting:** Not knowing which process or service is actually running.
- **Tutor preload:** Give me the fastest safe stop procedure for my local setup.

**Lesson 14.3.3 — Mini project: secure local baseline**
- **Deliverable:** A complete local security baseline package.
- **Touches:** Playbook, permissions matrix, audit log, stop card
- **Media required:** End-of-path checklist.
- **Verify:** All four artifacts exist and pass rubric.
- **Common pitfalls / troubleshooting:** Skipping restore test because it feels boring.
- **Tutor preload:** Give me the acceptance checklist for a secure beginner local baseline.

### Path 15. Secure Remote Setups: VPS, Mac mini, and Raspberry Pi

#### Chapter 15.1 — Choose and prepare the host

**Lesson 15.1.1 — Pick the right host for the job**
- **Deliverable:** A host decision sheet for VPS vs Mac mini vs Raspberry Pi.
- **Touches:** Decision matrix, cost/risk notes
- **Media required:** Host comparison chart.
- **Verify:** Chosen host fits workload and skill level.
- **Common pitfalls / troubleshooting:** Picking public VPS for convenience when local device is enough.
- **Tutor preload:** Recommend the safest host for this workload and my current level.

**Lesson 15.1.2 — Baseline the host**
- **Deliverable:** A host baseline checklist completed.
- **Touches:** OS updates, hostname, user account, SSH or console access
- **Media required:** Host baseline video.
- **Verify:** Checklist shows updates, time sync, and non-default admin setup.
- **Common pitfalls / troubleshooting:** Leaving default credentials or weak host naming.
- **Tutor preload:** Audit my host baseline and list what still needs hardening.

#### Chapter 15.2 — Lock it down before attaching power

**Lesson 15.2.1 — SSH and admin access the sane way**
- **Deliverable:** A secure access setup with notes.
- **Touches:** SSH keys or secure remote method, admin account, sudo policy
- **Media required:** SSH key setup diagram.
- **Verify:** Login succeeds securely and password policy is clear.
- **Common pitfalls / troubleshooting:** Password-only remote access left exposed.
- **Tutor preload:** Review my remote access setup and tell me the biggest risk.

**Lesson 15.2.2 — Firewall, updates, and service hygiene**
- **Deliverable:** A hardened host with only needed services exposed.
- **Touches:** Firewall tool, service manager, update policy
- **Media required:** Service exposure diagram.
- **Verify:** Only required ports/services are enabled.
- **Common pitfalls / troubleshooting:** Opening wide ranges 'just to make it work.'
- **Tutor preload:** Shrink this open service list to the smallest sane exposure.

**Lesson 15.2.3 — Secrets on remote hosts**
- **Deliverable:** A remote secrets storage and rotation note.
- **Touches:** Environment files, secret store notes, rotation calendar
- **Media required:** Secret placement graphic.
- **Verify:** No secrets are committed and rotation path is documented.
- **Common pitfalls / troubleshooting:** Copying local secrets strategy directly without host-specific review.
- **Tutor preload:** Help me decide where secrets should live on this host and how to rotate them.

#### Chapter 15.3 — Deploy, observe, maintain

**Lesson 15.3.1 — Deploy the bounded runtime**
- **Deliverable:** A running remote service with health check.
- **Touches:** Service file, container/service start, logs
- **Media required:** Bring-up walkthrough video.
- **Verify:** Health check passes from the chosen control channel.
- **Common pitfalls / troubleshooting:** Deploying multiple services at once and losing track.
- **Tutor preload:** Guide me through a minimum viable remote deployment with one health check.

**Lesson 15.3.2 — Add observability and alerts**
- **Deliverable:** A simple alerting and log review routine.
- **Touches:** Logs, alerts, heartbeat, uptime check
- **Media required:** Observability mini-dashboard mockup.
- **Verify:** Learner can detect service up/down and last successful run.
- **Common pitfalls / troubleshooting:** No way to know if the system silently failed.
- **Tutor preload:** Tell me the minimum observability stack I need for this small remote runtime.

**Lesson 15.3.3 — Run maintenance week 1**
- **Deliverable:** A first-week maintenance checklist.
- **Touches:** Checklist, log review, update notes
- **Media required:** Maintenance calendar graphic.
- **Verify:** Checklist includes updates, logs, backups, and permission review.
- **Common pitfalls / troubleshooting:** Treating deployment as the finish line.
- **Tutor preload:** Build me a week-1 maintenance checklist for this host.

### Path 16. Computer Use, Sandboxes, and Browser Automation

#### Chapter 16.1 — Understand the environment

**Lesson 16.1.1 — Map the computer-use loop**
- **Deliverable:** A diagram of observe -> act -> observe -> verify.
- **Touches:** Loop diagram, task card
- **Media required:** Annotated computer-use loop graphic.
- **Verify:** Learner explains screenshots, mouse/keyboard control, and verification.
- **Common pitfalls / troubleshooting:** Expecting magic without visual grounding.
- **Tutor preload:** Explain the computer-use loop using the simplest language possible.

**Lesson 16.1.2 — Prepare a safe sandbox**
- **Deliverable:** A practice sandbox or lab environment ready for automation.
- **Touches:** Sandbox/VM/container notes, browser profile, test account
- **Media required:** Sandbox setup checklist video.
- **Verify:** Sandbox is isolated from real accounts and sensitive data.
- **Common pitfalls / troubleshooting:** Testing on real personal accounts too early.
- **Tutor preload:** Audit my sandbox setup and tell me what makes it unsafe.

#### Chapter 16.2 — Do one bounded browser workflow

**Lesson 16.2.1 — Create a deterministic task card**
- **Deliverable:** A task card with URL, steps, success criteria, and failure rules.
- **Touches:** Task card, screenshots, target output
- **Media required:** Task-card example with callouts.
- **Verify:** Task card is specific enough to test repeatably.
- **Common pitfalls / troubleshooting:** Tasks too vague, like 'handle my browser for me.'
- **Tutor preload:** Rewrite this browser task so it is deterministic and testable.

**Lesson 16.2.2 — Run the workflow with screenshots**
- **Deliverable:** A successful run log with screenshots at key moments.
- **Touches:** Screenshots, logs, output artifact
- **Media required:** Before/during/after screenshot set.
- **Verify:** Run reaches success criteria without unexpected navigation.
- **Common pitfalls / troubleshooting:** Ignoring UI changes or pop-ups.
- **Tutor preload:** Tell me where this run went off track based on the screenshots.

**Lesson 16.2.3 — Recover gracefully from UI drift**
- **Deliverable:** A fallback note for changed layouts or missing buttons.
- **Touches:** Fallback doc, screenshot annotations
- **Media required:** UI drift example gallery.
- **Verify:** Learner identifies at least two fallback patterns.
- **Common pitfalls / troubleshooting:** Hard-coding one brittle click path.
- **Tutor preload:** Build me a fallback plan for when the page layout changes.

#### Chapter 16.3 — Make automation trustworthy

**Lesson 16.3.1 — Log decisions and screenshots**
- **Deliverable:** A retained evidence pack for one run.
- **Touches:** Evidence folder, timestamps, logs
- **Media required:** Evidence-pack structure graphic.
- **Verify:** Evidence pack is complete enough for audit or debugging.
- **Common pitfalls / troubleshooting:** Saving screenshots but not the action timeline.
- **Tutor preload:** Turn this run into a clean evidence pack.

**Lesson 16.3.2 — Add a 'safe fail' behavior**
- **Deliverable:** A fallback that stops and asks instead of improvising.
- **Touches:** Stop rule, alert message, retry limit
- **Media required:** Safe-fail flowchart.
- **Verify:** Workflow stops safely on ambiguous UI or unexpected prompts.
- **Common pitfalls / troubleshooting:** Retry loops that keep clicking.
- **Tutor preload:** Help me design a safe-fail rule for this workflow.

**Lesson 16.3.3 — Mini project: sandboxed browser assistant**
- **Deliverable:** A bounded browser workflow with approvals and evidence.
- **Touches:** Task card, sandbox, policy, evidence pack
- **Media required:** End-of-path rubric.
- **Verify:** All required artifacts exist and workflow respects approvals.
- **Common pitfalls / troubleshooting:** No evidence pack or no stop rule.
- **Tutor preload:** Give me the ship checklist for a trustworthy small browser automation.

### Path 17. Secure Integrations: Email, Calendar, Files, and Messaging

#### Chapter 17.1 — Scopes before features

**Lesson 17.1.1 — Map the integration surface**
- **Deliverable:** An integration map for Gmail, calendar, files, or chat.
- **Touches:** Integration map, scope notes, data sensitivity labels
- **Media required:** Integration-surface diagram.
- **Verify:** Map names read, write, delete, and notification surfaces.
- **Common pitfalls / troubleshooting:** Not distinguishing read-only from write/delete actions.
- **Tutor preload:** Map this integration and highlight the dangerous surfaces.

**Lesson 17.1.2 — Choose minimum viable scopes**
- **Deliverable:** A scope decision sheet.
- **Touches:** OAuth scopes or app permissions, justification notes
- **Media required:** Scope ladder graphic.
- **Verify:** Chosen scopes allow the lesson task and nothing extra.
- **Common pitfalls / troubleshooting:** Over-requesting permissions to save time.
- **Tutor preload:** Shrink these scopes to the minimum needed for my workflow.

#### Chapter 17.2 — Connect and validate

**Lesson 17.2.1 — Connect one integration**
- **Deliverable:** One working connection with captured auth notes.
- **Touches:** OAuth or token flow, config, connection test
- **Media required:** Secret-redaction screenshot guide.
- **Verify:** Connection succeeds and notes capture where secrets/scopes live.
- **Common pitfalls / troubleshooting:** Leaving old tokens lying around in notes.
- **Tutor preload:** Review my connection notes and tell me what should be redacted or rotated.

**Lesson 17.2.2 — Validate read-only first**
- **Deliverable:** A read-only validation result such as list, summary, or pull.
- **Touches:** List/read command, sample output, validation note
- **Media required:** Read-only validation diagram.
- **Verify:** Read-only validation succeeds before any write action is enabled.
- **Common pitfalls / troubleshooting:** Jumping straight to send/delete/edit.
- **Tutor preload:** Give me a safe read-only validation plan for this integration.

**Lesson 17.2.3 — Enable one bounded write action**
- **Deliverable:** A single bounded write/edit with rollback note.
- **Touches:** Write action, test object, rollback plan
- **Media required:** Write action + rollback graphic.
- **Verify:** Write action succeeds on test data and rollback is documented.
- **Common pitfalls / troubleshooting:** No rollback path for edits.
- **Tutor preload:** Review this write action and tell me how to make it reversible.

#### Chapter 17.3 — Run integrated workflows safely

**Lesson 17.3.1 — Create a revoke-and-rotate playbook**
- **Deliverable:** A playbook for disabling the integration quickly.
- **Touches:** Playbook, token rotation, logout/revoke steps
- **Media required:** Revoke flowchart.
- **Verify:** Learner can revoke access without guessing.
- **Common pitfalls / troubleshooting:** No emergency revoke path.
- **Tutor preload:** Build me a fast revoke-and-rotate playbook for this integration.

**Lesson 17.3.2 — Audit integrated workflow risk**
- **Deliverable:** A workflow risk table for the new integration.
- **Touches:** Risk table, failure modes, mitigations
- **Media required:** Risk matrix.
- **Verify:** Top risks and mitigations are explicit.
- **Common pitfalls / troubleshooting:** Treating integration success as proof of safety.
- **Tutor preload:** Review this integrated workflow for the most important risks.

**Lesson 17.3.3 — Mini project: safe integrated assistant**
- **Deliverable:** A bounded workflow using one real integration plus approval and rollback.
- **Touches:** Connection notes, validation note, risk table, playbook
- **Media required:** End-of-path checklist.
- **Verify:** Workflow passes validation and has revoke/rollback coverage.
- **Common pitfalls / troubleshooting:** Missing revoke playbook or test data separation.
- **Tutor preload:** Give me the go-live checklist for this integrated assistant.

### Path 18. Real-World Agent Builds for Everyday Productivity

#### Chapter 18.1 — Personal assistant build

**Lesson 18.1.1 — Build: daily brief assistant**
- **Deliverable:** A daily brief assistant that gathers from approved sources and outputs one summary.
- **Touches:** Task template, sources, schedule, output digest
- **Media required:** System diagram and sample output screenshots.
- **Verify:** Assistant produces one correct daily brief on test data.
- **Common pitfalls / troubleshooting:** Too many sources too early.
- **Tutor preload:** Help me scope a daily brief assistant to the smallest version worth using.

**Lesson 18.1.2 — Review: approval, memory, and failure modes**
- **Deliverable:** A review pack for the daily brief assistant.
- **Touches:** Review checklist, memory policy, risk note
- **Media required:** Review rubric graphic.
- **Verify:** Assistant has explicit approval and memory rules.
- **Common pitfalls / troubleshooting:** Assistant quietly expands its scope over time.
- **Tutor preload:** Audit this daily brief assistant like a careful operator.

#### Chapter 18.2 — Builder assistant build

**Lesson 18.2.1 — Build: repo helper or content workflow helper**
- **Deliverable:** A bounded helper that drafts handoff notes, summaries, or routine project artifacts.
- **Touches:** Claude Code/Cowork/Claw runtime, templates, output folder
- **Media required:** Workflow demo video.
- **Verify:** Helper completes one artifact end to end.
- **Common pitfalls / troubleshooting:** Trying to make it code, deploy, and monitor everything at once.
- **Tutor preload:** Break this helper idea into a safe first version and a later version.

**Lesson 18.2.2 — Add evidence, logs, and stop rules**
- **Deliverable:** An evidence and stop-rule pack for the helper.
- **Touches:** Logs, screenshots, stop card, audit log
- **Media required:** Evidence pack example.
- **Verify:** Helper can be stopped and audited easily.
- **Common pitfalls / troubleshooting:** No stop rule because the helper feels low stakes.
- **Tutor preload:** Review this builder assistant and tell me what evidence is missing.

#### Chapter 18.3 — Team helper build

**Lesson 18.3.1 — Build: shared weekly brief or intake assistant**
- **Deliverable:** A team-facing workflow that prepares a weekly brief or cleans intake material.
- **Touches:** Source folder/channel, template, owner assignment
- **Media required:** Shared-workflow lane diagram.
- **Verify:** Workflow produces a useful team artifact with explicit owner.
- **Common pitfalls / troubleshooting:** No owner for reviewing or correcting outputs.
- **Tutor preload:** Help me turn this into a team-safe workflow with clear ownership.

**Lesson 18.3.2 — Run a pilot and collect feedback**
- **Deliverable:** A pilot review note with feedback categories and next changes.
- **Touches:** Pilot notes, user feedback form, change backlog
- **Media required:** Pilot review board mockup.
- **Verify:** Pilot feedback results in a prioritized backlog.
- **Common pitfalls / troubleshooting:** Treating pilot feedback as optional.
- **Tutor preload:** Turn this pilot into a backlog of improvements by severity and effort.

**Lesson 18.3.3 — Mini project: useful bounded assistant**
- **Deliverable:** One fully packaged personal or team assistant ready for controlled pilot.
- **Touches:** Workflow files, policy, evidence, feedback plan
- **Media required:** End-of-path launch rubric.
- **Verify:** Package passes launch rubric and is ready for pilot.
- **Common pitfalls / troubleshooting:** No feedback loop, so version 2 has no direction.
- **Tutor preload:** Give me the controlled-pilot checklist for this assistant.

### Path 19. Capstones, Portfolio Proof, and Job-Ready Evidence

#### Chapter 19.1 — Capstone 1: Safe local builder workflow

**Lesson 19.1.1 — Plan the workflow and scope**
- **Deliverable:** A capstone plan with user, problem, boundaries, and acceptance criteria.
- **Touches:** Capstone brief, scope matrix, acceptance checklist
- **Media required:** Capstone brief template.
- **Verify:** Plan is realistic for one learner on one machine.
- **Common pitfalls / troubleshooting:** Capstones that are too broad to finish well.
- **Tutor preload:** Pressure-test my capstone scope and cut anything nonessential.

**Lesson 19.1.2 — Build and verify the workflow**
- **Deliverable:** A working local workflow with logs and outputs.
- **Touches:** Repo/runtime, logs, outputs, screenshots
- **Media required:** Build-and-verify video.
- **Verify:** Workflow completes one end-to-end run reliably.
- **Common pitfalls / troubleshooting:** No acceptance test or evidence pack.
- **Tutor preload:** Help me define the exact acceptance test for this capstone.

**Lesson 19.1.3 — Package the case study**
- **Deliverable:** A `case-study-1.md` with problem, design, run, evidence, and lessons.
- **Touches:** Case study file, screenshots, diagrams, metrics
- **Media required:** Case-study example.
- **Verify:** Case study could be shared with a hiring manager or client.
- **Common pitfalls / troubleshooting:** Writing a feature list instead of a problem-solution story.
- **Tutor preload:** Turn this capstone into a clear case study that proves skill.

#### Chapter 19.2 — Capstone 2: Knowledge-work assistant

**Lesson 19.2.1 — Design the knowledge workflow**
- **Deliverable:** A workflow brief with inputs, outputs, quality rubric, and review layer.
- **Touches:** Workflow brief, source bundle, rubric
- **Media required:** Workflow design graphic.
- **Verify:** Workflow has explicit review layer and traceability.
- **Common pitfalls / troubleshooting:** No evidence path from source to conclusion.
- **Tutor preload:** Review this workflow design for traceability and oversight.

**Lesson 19.2.2 — Run the workflow on a realistic dataset**
- **Deliverable:** A finished output package with raw, cleaned, and final artifacts.
- **Touches:** Source files, extraction/brief output, README
- **Media required:** Output package screenshot.
- **Verify:** Package is complete and reproducible.
- **Common pitfalls / troubleshooting:** No README or schema note.
- **Tutor preload:** Help me package this output so another person can reproduce it.

**Lesson 19.2.3 — Write the case study and demo script**
- **Deliverable:** A case study plus 3-minute demo script.
- **Touches:** Case study file, demo script, screenshots
- **Media required:** Demo script template.
- **Verify:** Demo script is short, concrete, and evidence-led.
- **Common pitfalls / troubleshooting:** Trying to explain everything instead of the outcome.
- **Tutor preload:** Turn this capstone into a short demo story that sounds credible.

#### Chapter 19.3 — Capstone 3: Integrated assistant with safety

**Lesson 19.3.1 — Plan the integrated workflow**
- **Deliverable:** An integration-first capstone plan with scopes, test data, and revoke path.
- **Touches:** Plan, scope sheet, revoke playbook
- **Media required:** Integration capstone plan template.
- **Verify:** Plan is safe enough for pilot on test or low-risk real data.
- **Common pitfalls / troubleshooting:** No revoke path or test data separation.
- **Tutor preload:** Pressure-test this integrated capstone plan for safety gaps.

**Lesson 19.3.2 — Build, pilot, and collect evidence**
- **Deliverable:** A pilot run with evidence pack, risk log, and feedback.
- **Touches:** Connection notes, logs, screenshots, feedback form
- **Media required:** Pilot evidence pack graphic.
- **Verify:** Pilot runs end to end with bounded behavior.
- **Common pitfalls / troubleshooting:** Going live without pilot evidence.
- **Tutor preload:** Help me review this pilot evidence and decide whether it is ready for broader use.

**Lesson 19.3.3 — Portfolio pack and next-step roadmap**
- **Deliverable:** A final portfolio pack with all three case studies and a learning roadmap.
- **Touches:** Portfolio README, case studies, screenshots, roadmap
- **Media required:** Portfolio landing-page mockup.
- **Verify:** Portfolio pack clearly shows progression from beginner to capable operator.
- **Common pitfalls / troubleshooting:** Random files with no narrative or structure.
- **Tutor preload:** Arrange my capstones into a portfolio pack that proves judgment, not just output.

## 4) Supporting Components and Instructional Layer

### 4.1 Floating Tutor Agent

**Role:** a context-aware, lesson-scoped coach that reduces panic without removing productive struggle.

**Context scope the Tutor receives by default**

- Current path, chapter, lesson, and mode
- Learner OS, shell, editor, device type, and confidence band
- Current lesson assets: expected folder tree, expected files, verification rubric, and known pitfalls
- Current terminal output or error text when available
- The learner’s last 3-5 actions and last verification state
- Safety policy layer for the current lesson

**What the Tutor should remember**

- Stable learning preferences: pace, preferred explanation style, preferred interface, accessibility needs
- Current environment facts that matter across lessons: OS, shell, package manager, editor, device, host type
- Current-course progress markers and recurring blockers

**What the Tutor must not remember by default**

- Secrets, tokens, personally sensitive content, raw mailbox/calendar contents, or hidden files
- Any high-risk or regulated data unless the product has explicit user consent and storage policy for it

**Tutor response policy**

- Start with the least risky next step.
- Prefer diagnosis over dumping ten commands.
- When the learner is in Guided mode, reveal only the next step plus why.
- In Hint mode, reveal the smallest useful hint first, then wait.
- In Independent mode, ask the learner to propose a fix first, then critique gently.
- Always offer a verification step after a fix suggestion.
- Always surface red-line warnings when secrets, permissions, delete actions, money, or external communications appear.

**Tutor system states**

1. **Coach** — explain the next step plainly.
2. **Diagnostician** — inspect pasted output and rank likely causes.
3. **Reviewer** — inspect diffs, configs, workflows, or task briefs against the lesson rubric.
4. **Safety rail** — interrupt with warnings, alternatives, revoke steps, or rollback steps.
5. **Socratic mode** — used more often as scaffolding fades.

### 4.2 Video Strategy

- **Length:** 45-120 seconds for most micro-videos; 3-5 minutes only for multi-step flows like install, auth, or deployment bring-up.
- **Style:** over-the-shoulder, zoomed, calm pacing, no hype, visible cursor, on-screen callouts, one clear objective per clip.
- **When to use video:** only where motion, sequencing, or interface transitions matter. Do not create video for static concepts a screenshot or diagram can explain better.
- **Mandatory video zones:** first install on each OS, first auth flow, first repo change loop, first Claw runtime boot, first sandbox/browser automation run, first remote-host bring-up, revoke/kill-switch demos.

### 4.3 Screenshot / Diagram / Graphic Standards

**Screenshots**

- One screenshot = one teaching point.
- Crop tightly.
- Redact secrets by default.
- Name screenshots predictably: `path-chapter-lesson-state.png`.
- Add 1-3 callouts max.

**Diagrams**

- Prefer simple lane diagrams, before/after folder trees, approval-flow charts, and stack maps.
- Use one diagram per mental model: repo flow, handoff flow, memory flow, approval flow, revoke flow.
- Avoid dense architecture posters for beginner lessons.

**Interactive graphics**

- Terminal line replay
- Hover-to-explain folder tree
- Mode toggle preview: Guided vs Hint vs Independent
- Red/yellow/green scope maps for permissions and integrations

### 4.4 Interactive Terminal Previews and Browser-Based Sandboxes

**Terminal previews**

- Simulate the exact command, the expected output, and one common failure output.
- Let the learner reveal line-by-line explanations.
- Add a 'Why this command now?' toggle.

**Sandboxes / labs**

- Every risky lesson gets a sandbox-first version.
- Browser automation, integrations, and delete/write actions should always have a toy dataset or test account version first.
- Sandboxes should expose obvious reset buttons and snapshot restore points.

### 4.5 Progress Tracking and Check-Your-Work Engine

Each lesson should end with a small machine-checkable state plus a human-readable reflection.

**Machine-checkable checks**

- File exists
- File contains required headings or keys
- Command output contains expected tokens
- Folder tree matches allowed pattern
- Test command passes
- Logs contain a successful event or explicit stop event
- Risk/revoke/approval artifacts exist for safety-sensitive lessons

**Human-readable checks**

- 'Explain what changed'
- 'Explain why it is safe'
- 'Name one thing you would do differently next time'

**Scoring model**

- 40% completion of required artifacts
- 30% verification quality
- 20% troubleshooting independence
- 10% documentation / handoff clarity

### 4.6 Guided-Learning Engine: How the Three Modes Are Enforced

The mode system must be a product behavior, not a cosmetic badge.

| Layer | Guided | Hint-based | Independent |
|------|--------|------------|-------------|
| Instructions shown | Full ordered steps | Goal + sparse hints | Goal + acceptance criteria only |
| Tutor behavior | Proactive, stepwise | Reactive, minimal | Mostly critique and verification |
| Starter assets | Pre-filled templates, scaffolds, starter commands | Partial templates, some blanks | Blank or nearly blank workspace |
| Verification support | Frequent checkpoints | Fewer checkpoints | Final rubric + selective spot checks |
| Recovery support | Detailed undo / recover steps | Short recovery hints | Learner proposes recovery first |

**Scaffolding fade rules**

- New learners start in Guided by default.
- Two consecutive strong lesson completions trigger a prompt to try Hint mode.
- Repeated failures, panic behaviors, or unsafe actions auto-recommend a temporary return to Guided.
- Independent mode unlocks only after the learner demonstrates verification discipline, not just speed.

### 4.7 How this mirrors and improves the best platforms

- **Coursera Guided Projects:** CLI Academy keeps the 'do it while learning' feel, but adds stronger safety scaffolds, troubleshooting, and three modes.
- **Educative / Dataquest:** CLI Academy keeps the interactive practice and text-first clarity, but adds real machine workflows, screenshots, run logs, and deployment realism.
- **Pluralsight Labs / AWS hands-on training:** CLI Academy keeps the lab realism, but makes the labs more beginner-safe and less enterprise-jargon-heavy.
- **Turing College:** CLI Academy borrows accountability and project orientation, then makes the tutoring layer more contextual and immediate.
- **Net improvement:** the product becomes less like a content library and more like a calm, instrumented apprenticeship system.

## 5) Overall Curriculum Flow

### Recommended order for a complete beginner

1. Path 1 — Start Here
2. Path 2 — Terminal and File-System Foundations
3. Path 3 — Claude Code: Zero to Productive
4. Path 6 — Git and GitHub for AI-Assisted Builders
5. Path 4 — Repo Workflows and Project Navigation
6. Path 5 — Debugging, Testing, and Refactoring
7. Path 7 — Claude surfaces and context handoff
8. Path 8 — Claude Cowork first wins
9. Path 9 or 10 based on learner goal
10. Path 14 — Secure local baseline
11. Path 11 — OpenClaw / Claw runtime foundations
12. Path 12 — Skills, memory, heartbeats
13. Path 13 — Multi-agent patterns
14. Path 16 — Sandboxes and browser automation
15. Path 17 — Secure integrations
16. Path 15 — Secure remote setups
17. Path 18 — Real-world agent builds
18. Path 19 — Capstones and portfolio proof

### Branching recommendations

- **Builder track:** 1 -> 2 -> 3 -> 6 -> 4 -> 5 -> 7 -> 14 -> 11 -> 12 -> 17 -> 18 -> 19
- **Knowledge worker track:** 1 -> 8 -> 9 -> 10 -> 14 -> 17 -> 18 -> 19
- **Operator / automation track:** 1 -> 2 -> 14 -> 11 -> 12 -> 13 -> 15 -> 16 -> 17 -> 18 -> 19

### Prerequisite logic

- No lesson should assume comfort with terminal navigation unless Path 2 or an equivalent waiver is complete.
- No integration write actions should unlock before Path 14 safety artifacts are complete.
- No remote deployment should unlock before the learner can pass a local stop/rollback test.
- No multi-agent path should unlock before the learner has completed at least one successful single-agent workflow.

### Natural Pro gating that does not frustrate free users

**Free users should still get real wins.** The free tier should not feel like a fake trailer.

- Free gets Paths 1-3 in full, selected read-only safety content, 10 Tutor messages/day, and one starter project per major product line.
- Free gets real verification, real templates, and one usable assistant outcome.
- Pro unlocks deeper labs, write actions, secure integrations, remote deployments, richer sandboxes, more capstones, more Tutor messages, and advanced diagnostics.
- Pro upsell moments should appear when the learner has already achieved value and now wants depth, not when they are still confused.

## 6) Product Polish, Tone, and UX Rules

- Voice is patient, plainspoken, calm, and respectful.
- Never glorify risky autonomy.
- Never hide complexity behind fake simplicity; instead, sequence it gently.
- Every lesson opens with: what we are building, why it matters, and what success looks like.
- Every lesson closes with: verify, common breakages, what to do if it failed, and the next real-world win.
- Replace abstract labels like 'project roadmap' with action-first structures: **Build**, **Check**, **Fix if needed**, **Wrap up**.

## 7) Build Notes for Engineering and Content Teams

### Content production checklist per lesson

1. One visible learner win in the first 5-10 minutes
2. Mode-specific content blocks
3. One machine-checkable verifier
4. One troubleshooting block tied to real observed errors
5. One Tutor preload prompt
6. One screenshot or diagram minimum
7. Reflection and next-step card

### Engineering delivery checklist

1. Lesson state model: path, chapter, lesson, mode, verifier state, Tutor context, artifact inventory
2. Artifact registry: files/screenshots/notes/logs created by the learner
3. Mode gate logic and fade rules
4. Verifier adapters: file checks, command checks, text rubric checks, workflow artifact checks
5. Tutor context service with secret redaction and lesson guardrails
6. Analytics: where learners stall, which verifier fails most, which Tutor prompts resolve confusion fastest

## 8) Immediate Launch Recommendation

If CLI Academy is shipping in phases, the strongest Phase 1 release is:

- Path 1
- Path 2
- Path 3
- Path 6
- Path 8
- Path 14
- Selected sandboxed lessons from Paths 16 and 17

Why this mix works:

- It gets absolute beginners to a first real win fast.
- It proves the product is not just content; it is a guided doing system.
- It establishes the safety brand early.
- It creates a natural reason to upgrade for deeper automation, integrations, and deployments.

## 9) Final Design Principle

CLI Academy should feel less like 'watch a course' and more like 'a careful expert sits beside me while I build something real, verifies it, and makes sure I do not hurt myself or my machine.'