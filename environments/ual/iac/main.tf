module "dynatrace_document" {
  # Path to your local module folder
  source = "./modules/dynatrace_document"
}

module "dynatrace_alerting" {
  # Path to your local module folder
  source = "./modules/dynatrace_alerting"
}