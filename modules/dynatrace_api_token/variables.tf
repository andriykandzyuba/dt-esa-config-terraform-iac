variable "dt_esa_api_token_name" {
    description = "Name of the Dynatrace API Token. The default value is set to 'Dynatrace API Token'."
    type = string
}

variable "dt_esa_api_token_duration" {
    description = "Dynatrace API Token lifespan in days. The default value is set to 1 hour."
    type = string
    default = "72h"
}

variable "dt_esa_api_token_scope" {
    description = "Dynatrace API Token scopes."
    type = list(string)
}