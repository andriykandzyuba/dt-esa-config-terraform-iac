output "access_token" {
  description = "Access token for Dynatrace API with Synthetics scopes. The default value is set to 30 days."
  value = dynatrace_api_token.dt_esa_api_token.token
  sensitive = true
}

output "token_id" {
  description = "ID of the created API token"
  value = dynatrace_api_token.dt_esa_api_token.id
}

output "token_name" {
  description = "Name of the created API token"
  value = dynatrace_api_token.dt_esa_api_token.name
}

output "expiration_date" {
  description = "Expiration date of the API token"
  value = dynatrace_api_token.dt_esa_api_token.expiration_date
}
