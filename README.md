# Dynatrace Configuration as Code (IaC)

This project manages Dynatrace configurations using Terraform (Infrastructure as Code). It provides a structured approach to automate the deployment, export, and management of Dynatrace resources (dashboards, alerting, API tokens, etc.) across multiple environments.

## Project Structure

The project follows an environment-based structure with modular Terraform configurations:

- `environments/`: Contains environment-specific configurations (`dev`, `ual`, `val72867`, `yyo96051`).
    - `iac/`: Infrastructure as Code for Dynatrace resources (Dashboards, Alerting, Documents).
    - `security/`: Management of Dynatrace API tokens.
    - `export/`: Configuration for exporting existing Dynatrace settings via the provider CLI.
- `modules/`: Reusable Terraform modules (e.g., `dynatrace_api_token`).
- `.github/workflows/`: GitHub Actions for CI/CD automation.

## Key Functionalities

### 1. Dynatrace Configuration Management (IaC)
Automate the creation and maintenance of Dynatrace resources using the [Dynatrace Terraform Provider](https://registry.terraform.io/providers/dynatrace-oss/dynatrace/latest). 
Resources managed include:
- Dashboards and Documents
- Alerting profiles and configurations

### 2. API Token Management
The project handles the lifecycle of Dynatrace API tokens required for automation:
- **Generate API Token**: Create new tokens with specific scopes and durations.
- **Extract API Token**: Retrieve token values from the Terraform state for use in other workflows.
- **Delete API Token**: Revoke tokens when no longer needed.

### 3. Dynatrace CLI Export
Provides the ability to export existing configurations from a Dynatrace environment into Terraform files. This is useful for onboarding existing manual configurations into the IaC pipeline.

## GitHub Actions Workflows

The following workflows automate common tasks:

- **Generate API Token**: (`generate_api_token.yaml`) Manually triggered to create or update API tokens in a target environment.
- **Extract API Token**: (`extract_api_token.yaml`) A reusable workflow used to fetch the current API token from the Terraform state.
- **Dynatrace Deploy Configurations**: (`dynatrace_alerting.yaml`) Applies the IaC configurations (dashboards, alerts, etc.) to the selected environment.
- **Dynatrace Terraform Provider CLI Export**: (`dynatrace_export.yaml`) Triggers the configuration export from Dynatrace.
- **Delete API Token**: (`delete_api_token.yaml`) Removes managed API tokens from the environment.

## Getting Started

### Prerequisites
- [Terraform](https://www.terraform.io/downloads.html) (version ~1.9)
- Access to Dynatrace Environment(s)
- GitHub repository secrets and variables configured for each environment (e.g., `DYNATRACE_ENV_URL`, `ARM_ACCESS_KEY` for backend state).

### Manual Usage
To work locally, navigate to the desired environment directory:
```bash
cd environments/dev/iac
terraform init
terraform plan
terraform apply
```

*Note: In CI/CD, the backend configuration is injected dynamically via GitHub Actions.*

## Environment Management
Each environment is isolated with its own Terraform state, allowing for safe testing in `dev` before promoting changes to production-like environments (`ual`).