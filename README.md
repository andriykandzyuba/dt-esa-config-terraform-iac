# Dynatrace Configuration as Code (IaC)

## Purpose

The primary purpose of this project is to provide a robust, scalable, and automated framework for managing Dynatrace configurations across multiple environments. By leveraging **Infrastructure as Code (IaC)** principles, this repository enables:
- **Consistency**: Ensure identical configuration setups across development, testing, and production environments.
- **Version Control**: Track changes to Dynatrace settings (dashboards, alerts, etc.) through Git.
- **Automation**: Reduce manual errors and overhead by using CI/CD pipelines for deployment and export tasks.
- **Portability**: Facilitate the migration and synchronization of configurations between different Dynatrace tenants.

## Project Structure

The project follows an environment-based structure with modular configurations and support for multiple tools:

- `environments/`: Contains environment-specific configurations.
    - `iac/`: Terraform-based Infrastructure as Code for Dynatrace resources (Dashboards, Alerting, Documents).
    - `security/`: Management of Dynatrace API tokens.
    - `export/`: Configuration for exporting existing Dynatrace settings via the Terraform provider CLI.
    - `monaco/`: Placeholder/target directories for Dynatrace Monaco (Configuration as Code) operations.
- `modules/`: Reusable Terraform modules (e.g., `dynatrace_api_token`).
- `.github/workflows/`: GitHub Actions for CI/CD automation.

## Key Functionalities

### 1. Dynatrace Configuration Management (IaC)
Automate the creation and maintenance of Dynatrace resources using the [Dynatrace Terraform Provider](https://registry.terraform.io/providers/dynatrace-oss/dynatrace/latest). 
Resources managed include:
- Dashboards and Documents
- Alerting profiles and configurations

### 2. Dynatrace Monaco (Configuration as Code)
In addition to Terraform, the project supports [Dynatrace Monaco](https://github.com/Dynatrace/dynatrace-configuration-as-code) for:
- **Bulk Export**: Downloading entire environment configurations into a portable archive.
- **Multi-Environment Deployment**: Deploying configurations across different accounts and environments using a unified manifest.
- **Cloud Storage Integration**: Exported configurations are automatically archived and uploaded to Azure Blob Storage for long-term retention.

### 3. API Token Management
The project handles the lifecycle of Dynatrace API tokens required for automation:
- **Generate API Token**: Create new tokens with specific scopes and durations.
- **Extract API Token**: Retrieve token values from the Terraform state for use in other workflows.
- **Delete API Token**: Revoke tokens when no longer needed.

### 4. Dynatrace CLI Export
Provides the ability to export existing configurations from a Dynatrace environment into Terraform files. This is useful for onboarding existing manual configurations into the IaC pipeline.

## GitHub Actions Workflows

The following workflows automate common tasks:

- **Dynatrace Deploy Configurations**: (`dynatrace_alerting.yaml`) Applies Terraform IaC configurations (dashboards, alerts, etc.) to the selected environment.
- **Dynatrace Terraform Provider CLI Export**: (`dynatrace_export.yaml`) Triggers configuration export from Dynatrace into Terraform files.
- **Dynatrace Monaco Tool Export**: (`dynatrace_monaco_export.yaml`) Exports environment settings using Monaco and uploads the archive to Azure Blob Storage.
- **Dynatrace Monaco Tool Deploy**: (`dynatrace_monaco_deploy.yaml`) Deploys configurations from a Monaco archive to a target environment.
- **Generate API Token**: (`generate_api_token.yaml`) Manually triggered to create or update API tokens.
- **Extract API Token**: (`extract_api_token.yaml`) A reusable workflow used to fetch the current API token from the Terraform state.
- **Delete API Token**: (`delete_api_token.yaml`) Removes managed API tokens from the environment.

## Getting Started

### Prerequisites
- [Terraform](https://www.terraform.io/downloads.html) (version ~1.9)
- [Dynatrace Monaco Tool](https://github.com/Dynatrace/dynatrace-configuration-as-code/releases) (for local Monaco operations)
- Access to Dynatrace Environment(s)
- GitHub repository secrets and variables configured for each environment (e.g., `DYNATRACE_ENV_URL`, `ARM_ACCESS_KEY` for backend state).

### Manual Usage (Terraform)
To work locally, navigate to the desired environment directory:
```bash
cd environments/<env>/iac
terraform init
terraform plan
terraform apply
```

*Note: In CI/CD, the backend configuration is injected dynamically via GitHub Actions.*

## Environment Management
Each environment is isolated with its own Terraform state and Monaco configuration, allowing for safe testing before promoting changes to production-like environments.