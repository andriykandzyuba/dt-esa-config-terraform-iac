# environments/dev/main.tf
module "dynatrace_api_token" {
  # Path to your local module folder
  source = "../../modules/dynatrace_api_token"
  dt_esa_api_token_name = var.dt_esa_api_token_name
  dt_esa_api_token_scope = var.dt_esa_api_token_scope
}

/*module "dynatrace_alerting" {
  source = "../../modules/dynatrace_alerting"
  depends_on = [
    module.dynatrace_api_token
  ]
  providers = {
    dynatrace = dynatrace.api_token
  }
}*/