# environments/dev/main.tf
module "dynatrace_api_token" {
  # Path to your local module folder
  source = "modules/dynatrace_document"
}