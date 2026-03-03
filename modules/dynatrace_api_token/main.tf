locals {
  exporiration_date = formatdate("YYYY-MM-DD'T'hh:mm:ssZ",
    timeadd(timestamp(), var.dt_esa_api_token_duration))
}

resource "dynatrace_api_token" "dt_esa_api_token" {
  name                  = var.dt_esa_api_token_name
  enabled               = true
  personal_access_token = false
  expiration_date = local.exporiration_date
  scopes = var.dt_esa_api_token_scope
}
