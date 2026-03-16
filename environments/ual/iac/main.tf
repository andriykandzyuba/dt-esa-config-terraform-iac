# environments/dev/main.tf
module "dynatrace_document" {
  # Path to your local module folder
  source = "./modules/dynatrace_document"
}