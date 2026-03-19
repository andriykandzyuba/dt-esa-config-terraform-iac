variable "dt_esa_api_token_name" {
  description = "Name of the Dynatrace API Token. The default value is set to 'Dynatrace API Token'."
  type = string
  default = "Dynatrace Terraform API Token"
}

variable "dt_esa_api_token_scope" {
  description = "Dynatrace API Token scopes."
  type = list(string)
  default = [
    "settings.read", "settings.write",
    "ReadConfig", "WriteConfig",
    "CaptureRequestData",
    "ExternalSyntheticIntegration",
    "activeGateTokenManagement.create", "activeGateTokenManagement.read", "activeGateTokenManagement.write",
    "apiTokens.read", "apiTokens.write",
    "attacks.read", "attacks.write",
    "credentialVault.read", "credentialVault.write",
    "entities.read",
    "extensions.write",
    "extensionEnvironment.read", "extensionEnvironment.write",
    "networkZones.read", "networkZones.write",
    "securityProblems.read", "securityProblems.write",
    "slo.read", "slo.write"
  ]
}

