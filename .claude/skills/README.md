# Claude Skills for Dynatrace IAC Pipelines

This directory contains Claude "skills" (optimized prompt templates) that allow Claude to recreate the export and import pipelines used in this project.

## How to use these skills

1.  Open the desired skill file in `.claude/skills/`.
2.  Copy the **Prompt Template**.
3.  Paste it into a chat with Claude, providing any additional context or specific requirements for your environment.

## Available Skills

### Pipeline Workflows ([pipelines.md](pipelines.md))
- **Create Dynatrace Export Pipeline**: Generates a GitHub Actions workflow for exporting configurations via Monaco or Terraform, with integrated post-processing and storage (Azure/GitHub).
- **Create Dynatrace Deploy Pipeline**: Generates a deployment workflow that handles artifact retrieval, environment-specific configurations, and tool execution (Monaco/Terraform).

### Automation Scripts ([scripts.md](scripts.md))
- **Generate Terraform Post-Processing Script**: Creates a Node.js script to fix schema mismatches and missing blocks in exported Terraform HCL (e.g., for `network_monitor`).
- **Generate Monaco Configuration Updater**: Creates a shell script to automatically mark system-default resources as `skip: true` in Monaco configurations.

## Maintenance

When updating the actual pipelines or scripts in `scripts/` or `.github/workflows/`, ensure that these skill templates are also updated to reflect the latest logic and project structure.
