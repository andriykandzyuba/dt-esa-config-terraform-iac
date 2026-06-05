### Skill: Create Dynatrace Export Pipeline

**Description:** Generates a GitHub Actions workflow for exporting Dynatrace configurations using Monaco or Terraform.

**Prompt Template:**
```markdown
Act as a Platform Engineer. Create a GitHub Actions workflow for exporting Dynatrace configuration.
The workflow should support:
- Manual trigger (`workflow_dispatch`) with inputs for `source_environment`, `format` (monaco/terraform), and `storage` (azure-blob/github-repo).
- Authentication using Dynatrace API tokens or OAuth2.
- For Monaco: Use `monaco download` and generate `manifest-projects.yaml`.
- For Terraform: Use `terraform-provider-dynatrace` with `-export` flag.
- Post-processing: Include a step to run a fix script (e.g., `fix_terraform.js`).
- Storage: Upload the exported configuration to Azure Blob Storage or a GitHub repository branch.

Context from current project:
- Storage backend: Azure Blob / GitHub.
- Environments: yhu28601, hia75022.
- Fix script location: `scripts/terraform/fix_terraform.js`.
```

---

### Skill: Create Dynatrace Deploy Pipeline

**Description:** Generates a GitHub Actions workflow for deploying Dynatrace configurations.

**Prompt Template:**
```markdown
Act as a DevOps Engineer. Create a GitHub Actions workflow to deploy Dynatrace configurations exported by Monaco or Terraform.
The workflow should:
- Support `workflow_dispatch` with `source_environment`, `target_environment`, `format`, `storage`, and `action` (dry-run/deploy).
- Download the artifact from Azure Blob or Checkout from GitHub.
- For Monaco: Run `monaco deploy` with a manifest file. Include a step to skip default dashboards using `update_config.sh`.
- For Terraform: Run `terraform init`, `validate`, `plan`, and `apply`.
- Handle temporary API token generation and cleanup.

Context from current project:
- Target environments: nyw40909, peb12847.
- Script location: `scripts/monaco/update_config.sh`.
```
