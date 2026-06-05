### Skill: Generate Terraform Post-Processing Script

**Description:** Creates a script to fix common issues in exported Dynatrace Terraform configurations.

**Prompt Template:**
```markdown
Act as a Node.js Developer. Create a script `fix_terraform.js` to post-process Terraform HCL files exported from Dynatrace.
The script should:
- Iterate through `.tf` files in specific directories (e.g., `modules/network_monitor`).
- Fix `dynatrace_network_monitor` resources:
    - Remove empty `target_list` and `properties` if they are broken.
    - Rebuild `performance_thresholds` with correct nesting (`thresholds { threshold { ... } }`).
    - Standardize `step` blocks with default `constraints`.
- Fix `dynatrace_declarative_grouping` resources:
    - Add a `detection` block with `process_definition` if it's missing.
- Ensure the script is idempotent and handles missing files gracefully.

Refer to `scripts/terraform/fix_terraform.js` for logic patterns.
```

---

### Skill: Generate Monaco Configuration Updater

**Description:** Creates a script to modify Monaco configurations, specifically for skipping system resources.

**Prompt Template:**
```markdown
Act as a Bash/Awk Expert. Create a shell script `update_config.sh` to modify Monaco `config.yaml` files.
The script should:
- Use `awk` to parse YAML entries.
- Identify entries where the `template` starts with `com-dynatrace` or `dashboard`.
- Set the `skip: true` property for these entries to prevent deployment conflicts with read-only system resources.
- Support in-place editing of the file.

Refer to `scripts/monaco/update_config.sh` for implementation details.
```
