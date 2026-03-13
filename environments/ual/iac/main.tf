# environments/dev/main.tf
module "dynatrace_json_dashboard" {
  # Path to your local module folder
  source = "./modules/dynatrace_json_dashboard"
}

module "dynatrace_document" {
  # Path to your local module folder
  source = "./modules/dynatrace_document"
}