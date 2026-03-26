resource "dynatrace_alerting" "dt_esa_alerting" {
    name = "dt_esa_alerting"
    management_zone = ""
    rules {
        rule {
            include_mode     = "INCLUDE_ALL"
            tags             = ["EnvironmentA:production", "Team:test", "Application:Demo"]
            delay_in_minutes = 0
            severity_level   = "AVAILABILITY"
        }
        rule {
            include_mode     = "INCLUDE_ALL"
            tags             = ["EnvironmentB:production", "Team:test"]
            delay_in_minutes = 0
            severity_level   = "CUSTOM_ALERT"
        }
        rule {
            include_mode     = "INCLUDE_ALL"
            tags             = ["EnvironmentC:production", "Team:test"]
            delay_in_minutes = 0
            severity_level   = "ERRORS"
        }
        rule {
            include_mode     = "INCLUDE_ALL"
            tags             = ["EnvironmentD:production", "Team:test"]
            delay_in_minutes = 0
            severity_level   = "MONITORING_UNAVAILABLE"
        }
        rule {
            include_mode     = "INCLUDE_ALL"
            tags             = ["EnvironmentE:production", "Team:test"]
            delay_in_minutes = 0
            severity_level   = "PERFORMANCE"
        }
        rule {
            include_mode     = "INCLUDE_ALL"
            tags             = ["EnvironmentF:production", "Team:test"]
            delay_in_minutes = 0
            severity_level   = "RESOURCE_CONTENTION"
        }
    }
}

resource "dynatrace_alerting" "demo_alerting" {
    name = "demo_alerting"
    management_zone = ""
    rules {
        rule {
            include_mode     = "INCLUDE_ALL"
            tags             = ["Application:Demo"]
            delay_in_minutes = 0
            severity_level   = "AVAILABILITY"
        }
    }
}