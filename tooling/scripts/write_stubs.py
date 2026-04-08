"""Write all scaffold stub MDX files for new learning paths."""
import os

STUBS = [
    # (path, title, num, tier, version_label, tool_key, tags, teaser)
    # openclaw-deployment
    ("content/paths/openclaw-deployment/what-is-openclaw.mdx", "What Is OpenClaw?", 1, "pro", "openclaw@latest", "openclaw", ["openclaw","introduction"], "What OpenClaw is, how it differs from hosted Claude, and when self-hosting gives you an advantage."),
    ("content/paths/openclaw-deployment/openclaw-system-requirements.mdx", "System Requirements and Prerequisites", 2, "pro", "openclaw@latest", "openclaw", ["openclaw","setup"], "Hardware, OS, and networking prerequisites for a successful OpenClaw deployment."),
    ("content/paths/openclaw-deployment/openclaw-docker-install.mdx", "Installing OpenClaw with Docker", 3, "pro", "openclaw@latest", "openclaw", ["openclaw","docker"], "How to deploy OpenClaw using Docker Compose, configure services, and verify the install."),
    ("content/paths/openclaw-deployment/openclaw-bare-metal-install.mdx", "Bare-Metal Installation", 4, "pro", "openclaw@latest", "openclaw", ["openclaw","installation"], "How to install OpenClaw directly on a Linux server without containerization."),
    ("content/paths/openclaw-deployment/openclaw-configuration.mdx", "Configuration and Environment Variables", 5, "pro", "openclaw@latest", "openclaw", ["openclaw","configuration"], "All environment variables, config files, and model-selection options for OpenClaw."),
    ("content/paths/openclaw-deployment/openclaw-security-hardening.mdx", "Security Hardening", 6, "pro", "openclaw@latest", "openclaw", ["openclaw","security"], "User isolation, firewall rules, secrets management, and production hardening for OpenClaw."),
    ("content/paths/openclaw-deployment/openclaw-monitoring.mdx", "Monitoring and Health Checks", 7, "pro", "openclaw@latest", "openclaw", ["openclaw","operations"], "How to set up logging, health check endpoints, and uptime monitoring for OpenClaw."),
    ("content/paths/openclaw-deployment/openclaw-updates-rollback.mdx", "Safe Updates and Rollback", 8, "pro", "openclaw@latest", "openclaw", ["openclaw","operations"], "How to update OpenClaw safely and roll back to a previous version if something breaks."),
    # nemoclaw-runtime
    ("content/paths/nemoclaw-runtime/what-is-nemoclaw.mdx", "What Is NemoClaw?", 1, "pro", "nemoclaw@latest", "nemoclaw", ["nemoclaw","introduction"], "What NemoClaw is, how it extends OpenClaw with NVIDIA sandboxing, and when to use it."),
    ("content/paths/nemoclaw-runtime/nemoclaw-prerequisites.mdx", "GPU and OpenShell Prerequisites", 2, "pro", "nemoclaw@latest", "nemoclaw", ["nemoclaw","gpu"], "NVIDIA GPU driver requirements, OpenShell setup, and verification steps before installing NemoClaw."),
    ("content/paths/nemoclaw-runtime/nemoclaw-install.mdx", "Installing NemoClaw", 3, "pro", "nemoclaw@latest", "nemoclaw", ["nemoclaw","installation"], "Step-by-step NemoClaw installation inside NVIDIA OpenShell."),
    ("content/paths/nemoclaw-runtime/nemoclaw-policy-controls.mdx", "Sandboxing and Policy Controls", 4, "pro", "nemoclaw@latest", "nemoclaw", ["nemoclaw","security"], "How to configure sandboxing policy, execution limits, and access controls in NemoClaw."),
    ("content/paths/nemoclaw-runtime/nemoclaw-vs-openclaw.mdx", "NemoClaw vs OpenClaw: When to Use Each", 5, "pro", "nemoclaw@latest", "nemoclaw", ["nemoclaw","comparison"], "The architectural tradeoffs between NemoClaw and plain OpenClaw and the right choice for your use case."),
    ("content/paths/nemoclaw-runtime/nemoclaw-production-deploy.mdx", "Production Deployment Patterns", 6, "pro", "nemoclaw@latest", "nemoclaw", ["nemoclaw","production"], "Hardened production deployment patterns for NemoClaw in enterprise and research environments."),
    # zeroclaw-quickstart
    ("content/paths/zeroclaw-quickstart/what-is-zeroclaw.mdx", "What Is ZeroClaw?", 1, "pro", "zeroclaw@latest", "zeroclaw", ["zeroclaw","introduction"], "What ZeroClaw is, its fast-path design, and the documented compatibility gaps versus full OpenClaw."),
    ("content/paths/zeroclaw-quickstart/zeroclaw-install.mdx", "Installation in Minutes", 2, "pro", "zeroclaw@latest", "zeroclaw", ["zeroclaw","installation"], "How to install ZeroClaw and have it running in under 10 minutes."),
    ("content/paths/zeroclaw-quickstart/zeroclaw-configuration.mdx", "Minimal Configuration", 3, "pro", "zeroclaw@latest", "zeroclaw", ["zeroclaw","configuration"], "ZeroClaw minimal configuration options and what it auto-detects for you."),
    ("content/paths/zeroclaw-quickstart/zeroclaw-limitations.mdx", "Compatibility Gaps and Limitations", 4, "pro", "zeroclaw@latest", "zeroclaw", ["zeroclaw","reference"], "What ZeroClaw cannot do compared to OpenClaw and how to recognize when you need to upgrade."),
    ("content/paths/zeroclaw-quickstart/zeroclaw-to-openclaw-migration.mdx", "Migrating from ZeroClaw to OpenClaw", 5, "pro", "zeroclaw@latest", "zeroclaw", ["zeroclaw","migration"], "How to migrate your ZeroClaw setup to full OpenClaw without losing your configuration."),
    # autoclaw-automation
    ("content/paths/autoclaw-automation/what-is-autoclaw.mdx", "What Is AutoClaw?", 1, "pro", "autoclaw@latest", "autoclaw", ["autoclaw","introduction"], "What AutoClaw is, how it extends OpenClaw as a headless automation framework, and key use cases."),
    ("content/paths/autoclaw-automation/autoclaw-install.mdx", "Installation and Setup", 2, "pro", "autoclaw@latest", "autoclaw", ["autoclaw","installation"], "How to install AutoClaw and connect it to an existing OpenClaw deployment."),
    ("content/paths/autoclaw-automation/autoclaw-headless-mode.mdx", "Running Agents Without a UI", 3, "pro", "autoclaw@latest", "autoclaw", ["autoclaw","headless"], "How to run AutoClaw agents without any user interface in server and CI environments."),
    ("content/paths/autoclaw-automation/autoclaw-task-definition.mdx", "Defining Automation Tasks", 4, "pro", "autoclaw@latest", "autoclaw", ["autoclaw","tasks"], "The AutoClaw task definition format and how to express complex multi-step workflows."),
    ("content/paths/autoclaw-automation/autoclaw-scheduling.mdx", "Scheduling and Event Triggers", 5, "pro", "autoclaw@latest", "autoclaw", ["autoclaw","scheduling"], "How to schedule AutoClaw tasks with cron expressions and set up event-driven triggers."),
    ("content/paths/autoclaw-automation/autoclaw-error-handling.mdx", "Fault Tolerance and Retry Logic", 6, "pro", "autoclaw@latest", "autoclaw", ["autoclaw","reliability"], "How to configure retry logic, failure callbacks, and circuit breakers in AutoClaw."),
    ("content/paths/autoclaw-automation/autoclaw-desktop-context.mdx", "Desktop App Context Integration", 7, "pro", "autoclaw@latest", "autoclaw", ["autoclaw","integration"], "How AutoClaw accesses desktop app context and integrates with GUI applications."),
    # claude-code-for-marketers
    ("content/paths/claude-code-for-marketers/marketer-intro.mdx", "Claude Code for Marketers: What's Possible", 1, "pro", "claude-code@1.x", "claude-code", ["marketing","introduction"], "The realistic range of what non-technical marketers can accomplish with Claude Code."),
    ("content/paths/claude-code-for-marketers/content-automation.mdx", "Automating Content Creation", 2, "pro", "claude-code@1.x", "claude-code", ["marketing","content"], "How to build a repeatable content creation pipeline using Claude Code."),
    ("content/paths/claude-code-for-marketers/social-media-workflows.mdx", "Social Media Workflows", 3, "pro", "claude-code@1.x", "claude-code", ["marketing","social"], "How to generate and schedule social content across platforms with Claude Code."),
    ("content/paths/claude-code-for-marketers/email-campaign-builder.mdx", "Email Campaign Builder", 4, "pro", "claude-code@1.x", "claude-code", ["marketing","email"], "How to build personalized email campaign sequences with Claude Code."),
    ("content/paths/claude-code-for-marketers/seo-content-pipeline.mdx", "SEO Content Pipelines", 5, "pro", "claude-code@1.x", "claude-code", ["marketing","seo"], "How to build an SEO content pipeline that generates optimized articles at scale."),
    ("content/paths/claude-code-for-marketers/reporting-and-analytics.mdx", "Automated Reporting", 6, "pro", "claude-code@1.x", "claude-code", ["marketing","analytics"], "How to automate marketing performance reporting and data gathering."),
    ("content/paths/claude-code-for-marketers/marketer-capstone.mdx", "Capstone: Build a Marketing Workflow", 7, "pro", "claude-code@1.x", "claude-code", ["marketing","capstone"], "How to assemble a complete, production-ready marketing automation workflow."),
    # claude-code-for-founders
    ("content/paths/claude-code-for-founders/founder-intro.mdx", "Claude Code for Business Owners: What's Possible", 1, "pro", "claude-code@1.x", "claude-code", ["business","introduction"], "What founders and business owners can realistically build and automate with Claude Code today."),
    ("content/paths/claude-code-for-founders/idea-validation-with-ai.mdx", "Idea Validation With AI", 2, "pro", "claude-code@1.x", "claude-code", ["business","validation"], "How to use Claude Code to test business ideas quickly before investing in development."),
    ("content/paths/claude-code-for-founders/internal-tools-fast.mdx", "Building Internal Tools Without a Dev Team", 3, "pro", "claude-code@1.x", "claude-code", ["business","tools"], "How to build dashboards, trackers, and internal tools with Claude Code and no developers."),
    ("content/paths/claude-code-for-founders/operations-automation.mdx", "Automating Business Operations", 4, "pro", "claude-code@1.x", "claude-code", ["business","automation"], "How to identify and automate repetitive business operations with Claude Code."),
    ("content/paths/claude-code-for-founders/customer-research-workflows.mdx", "Customer Research Workflows", 5, "pro", "claude-code@1.x", "claude-code", ["business","research"], "How to build automated customer research and feedback synthesis workflows."),
    ("content/paths/claude-code-for-founders/build-vs-buy-with-ai.mdx", "Build vs. Buy in the AI Era", 6, "pro", "claude-code@1.x", "claude-code", ["business","strategy"], "How to make smarter build-vs-buy decisions now that Claude Code changes the cost equation."),
    ("content/paths/claude-code-for-founders/founder-capstone.mdx", "Capstone: Your First Business Workflow", 7, "pro", "claude-code@1.x", "claude-code", ["business","capstone"], "How to ship your first complete, working business workflow with Claude Code."),
    # claude-code-for-sales
    ("content/paths/claude-code-for-sales/sales-intro.mdx", "Claude Code for Sales: What's Possible", 1, "pro", "claude-code@1.x", "claude-code", ["sales","introduction"], "What sales professionals can automate and accelerate with Claude Code today."),
    ("content/paths/claude-code-for-sales/prospect-research-automation.mdx", "Automating Prospect Research", 2, "pro", "claude-code@1.x", "claude-code", ["sales","research"], "How to automate prospect research and qualification to fill your pipeline faster."),
    ("content/paths/claude-code-for-sales/personalized-outreach-at-scale.mdx", "Personalized Outreach at Scale", 3, "pro", "claude-code@1.x", "claude-code", ["sales","outreach"], "How to generate personalized outreach messages at scale without sounding like templates."),
    ("content/paths/claude-code-for-sales/crm-data-workflows.mdx", "CRM Data Workflows", 4, "pro", "claude-code@1.x", "claude-code", ["sales","crm"], "How to build workflows that keep your CRM data clean and up to date automatically."),
    ("content/paths/claude-code-for-sales/pipeline-analysis.mdx", "Pipeline Analysis and Forecasting", 5, "pro", "claude-code@1.x", "claude-code", ["sales","analytics"], "How to automate pipeline analysis and generate forecasting reports with Claude Code."),
    ("content/paths/claude-code-for-sales/follow-up-automation.mdx", "Follow-Up Automation", 6, "pro", "claude-code@1.x", "claude-code", ["sales","automation"], "How to build intelligent follow-up sequences that adapt to prospect behavior."),
    ("content/paths/claude-code-for-sales/sales-capstone.mdx", "Capstone: Build a Sales Workflow", 7, "pro", "claude-code@1.x", "claude-code", ["sales","capstone"], "How to ship a complete prospect-to-close workflow powered by Claude Code."),
    # claude-code-for-analysts
    ("content/paths/claude-code-for-analysts/analyst-intro.mdx", "Claude Code for Analysts: What's Possible", 1, "pro", "claude-code@1.x", "claude-code", ["analysis","introduction"], "What data analysts and BI professionals can build and automate with Claude Code."),
    ("content/paths/claude-code-for-analysts/data-wrangling-workflows.mdx", "Data Wrangling Workflows", 2, "pro", "claude-code@1.x", "claude-code", ["analysis","data"], "How to automate data cleaning, normalization, and transformation pipelines."),
    ("content/paths/claude-code-for-analysts/sql-query-automation.mdx", "SQL Query Automation", 3, "pro", "claude-code@1.x", "claude-code", ["analysis","sql"], "How to use Claude Code to generate, optimize, and document SQL queries faster."),
    ("content/paths/claude-code-for-analysts/report-generation.mdx", "Automated Report Generation", 4, "pro", "claude-code@1.x", "claude-code", ["analysis","reporting"], "How to build report generation pipelines that run on a schedule."),
    ("content/paths/claude-code-for-analysts/data-visualization-prompting.mdx", "Prompting for Data Visualization", 5, "pro", "claude-code@1.x", "claude-code", ["analysis","visualization"], "How to prompt Claude Code to generate effective charts and dashboards."),
    ("content/paths/claude-code-for-analysts/insight-pipeline.mdx", "Building an Insight Pipeline", 6, "pro", "claude-code@1.x", "claude-code", ["analysis","pipeline"], "How to build an end-to-end insight pipeline from raw data to distributed report."),
    ("content/paths/claude-code-for-analysts/analyst-capstone.mdx", "Capstone: Build an Analytics Workflow", 7, "pro", "claude-code@1.x", "claude-code", ["analysis","capstone"], "How to build a complete analytics workflow that runs automatically on a schedule."),
    # claude-code-for-students (free)
    ("content/paths/claude-code-for-students/student-intro.mdx", "Claude Code for Students: What's Possible", 1, "free", "claude-code@1.x", "claude-code", ["students","introduction"], "What students can realistically build, learn, and create with Claude Code."),
    ("content/paths/claude-code-for-students/studying-with-ai.mdx", "Studying and Learning With AI", 2, "free", "claude-code@1.x", "claude-code", ["students","learning"], "How to use Claude Code as a study partner that helps you understand, not just copy."),
    ("content/paths/claude-code-for-students/research-and-citations.mdx", "Research, Citations, and Academic Integrity", 3, "free", "claude-code@1.x", "claude-code", ["students","ethics"], "How to use AI for research without compromising academic integrity or fabricating citations."),
    ("content/paths/claude-code-for-students/project-building.mdx", "Building Real Projects as a Student", 4, "free", "claude-code@1.x", "claude-code", ["students","projects"], "How to build real, portfolio-worthy projects with Claude Code that demonstrate your skills."),
    ("content/paths/claude-code-for-students/ai-ethics-for-students.mdx", "AI Ethics and Responsible Use", 5, "free", "claude-code@1.x", "claude-code", ["students","ethics"], "The ethical principles behind AI use and how to be a responsible AI practitioner."),
    ("content/paths/claude-code-for-students/student-capstone.mdx", "Capstone: Your First Student Project", 6, "free", "claude-code@1.x", "claude-code", ["students","capstone"], "How to ship your first real project built collaboratively with Claude Code."),
]

TEMPLATE = """\
---
title: "{title}"
description: "What you will learn in this lesson."
slug: "{slug}"
lesson_number: {num}
estimated_minutes: 15
tier_required: "{tier}"
version_label: "{version}"
last_reviewed_at: "2026-04-05"
reviewed_by: "CLI Academy Team"
supported_tool_versions:
  {tool_key}: "latest"
has_safety_warning: false
tags: {tags}
---

## Coming Soon

This lesson is being prepared and will be available shortly.

In this lesson you will learn: {teaser}
"""

count = 0
for (path, title, num, tier, version, tool_key, tags_list, teaser) in STUBS:
    tags_str = str(tags_list).replace("'", '"')
    slug = path.split("/")[-1].replace(".mdx", "")
    content = TEMPLATE.format(
        title=title,
        slug=slug,
        num=num,
        tier=tier,
        version=version,
        tool_key=tool_key,
        tags=tags_str,
        teaser=teaser,
    )
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    count += 1

print(f"Written {count} stub files")
