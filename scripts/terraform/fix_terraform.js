'use strict';

const fs = require('fs');
const path = require('path');

function fixTerraformContent(content) {
  // This is a very targeted fix for the common broken pattern in dynatrace_network_monitor

  // Clean up previous attempts as seen in fix_network_monitor.js
  content = content.replace(/\s*target_list = \[\]/g, '');
  content = content.replace(/\s*properties\s*=\s*\[\]/g, '');
  // Remove broken constraints blocks
  content = content.replace(/\s*constraints\s*\{[^}]*constraint\s*\{[^}]*\}\s*\}/g, '');

  // 1. Identify resource header and general settings
  // Match everything from the start of the file up to performance_thresholds or steps
  const matchHeader = content.match(
    /([\s\S]*?resource "dynatrace_network_monitor" ".*?" \{[\s\S]*?)(performance_thresholds|steps)/
  );
  if (!matchHeader) {
    // Check if it's a declarative_grouping resource
    if (
      content.includes('resource "dynatrace_declarative_grouping"') &&
      !content.includes('detection {')
    ) {
      return fixDeclarativeGrouping(content);
    }
    return content;
  }

  const header = matchHeader[1].trimEnd();

  // 2. Extract and fix performance_thresholds
  const perfMatch = content.match(/performance_thresholds \{([\s\S]*?)\}\s*steps/);
  let perfBlock = '';
  if (perfMatch) {
    const perfInner = perfMatch[1].trim();
    // Ensure correct nesting: thresholds { threshold { ... } }
    if (perfInner.includes('thresholds {')) {
      // Just rebuild it simply if it follows the known pattern
      perfBlock =
        '\n  performance_thresholds {\n    enabled = false\n    thresholds {\n      threshold {\n        step_index = 1\n        threshold  = 0.8\n      }\n    }\n  }\n';
    } else {
      perfBlock = `\n  performance_thresholds {\n    ${perfInner}\n  }\n`;
    }
  } else if (content.includes('performance_thresholds {')) {
    // Check if it's just 'enabled = false'
    if (/performance_thresholds\s*\{\s*enabled\s*=\s*false\s*\}/.test(content)) {
      perfBlock = '\n  performance_thresholds {\n    enabled = false\n  }\n';
    }
  }

  // 3. Extract and fix steps
  // We'll find all occurrences of 'step {'
  const steps = [];
  const stepRegex = /step\s*\{([\s\S]*?)(?=step\s*\{|tags\s*\{|\}\s*$)/g;
  for (const sm of content.matchAll(stepRegex)) {
    let stepInner = sm[1].trim();

    // Extract request_type - if it exists and is NOT empty, we might want to preserve it?
    // fix_network_monitor.js only patches if request_type is ""
    const reqTypeMatch = stepInner.match(/request_type\s*=\s*"(.*?)"/);
    const requestType = reqTypeMatch ? reqTypeMatch[1] : '';

    // Clean up the inner step content
    // Remove extra closing braces that might have been added
    stepInner = stepInner.replace(/\}\s*$/, '').trim();
    stepInner = stepInner.replace(/\}\s*$/, '').trim();

    // Extract name and other simple fields
    let nameMatch = sm[1].match(/name\s*=\s*"(.*?)"(?:\s*#|\s*\n)/s);
    if (!nameMatch) {
      // Try a more liberal match if the above fails
      nameMatch = sm[1].match(/name\s*=\s*"(.*)/);
    }

    let name = nameMatch ? nameMatch[1].trim() : 'unknown';
    // Escape quotes in name
    // If it was double escaped like \\", unescape it to \" first, then to "
    name = name.replaceAll('\\\\"', '"');
    name = name.replaceAll('\\"', '"');
    name = name.replaceAll('"', '\\"');
    // If it ends with a backslash that was meant to be an escape but is now doubled or trailing
    if (name.endsWith('\\')) {
      name = name.slice(0, -1) + '\\\\'; // Ensure it doesn't escape the closing quote
    }

    // Rebuild step
    const stepText =
      `    step {\n      name         = "${name}"\n      request_type = "${requestType}"\n` +
      `      target_list  = []\n      properties   = {}\n      constraints {\n` +
      `        constraint {\n          type       = "ERROR_CODE"\n          properties = {}\n` +
      `        }\n      }\n    }`;
    steps.push(stepText);
  }

  if (steps.length === 0) {
    return content;
  }

  const stepsBlock = '  steps {\n' + steps.join('\n') + '\n  }\n';

  // Combine everything
  const newContent = header + '\n' + perfBlock + stepsBlock + '}\n';
  return newContent;
}

function fixDeclarativeGrouping(content) {
  // Find resource name
  const match = content.match(/resource "dynatrace_declarative_grouping" "(.*?)"/);
  if (!match) {
    return content;
  }

  const resName = match[1];
  // Extract name field
  const nameMatch = content.match(/name\s*=\s*"(.*?)"/);
  const name = nameMatch ? nameMatch[1] : resName;

  // Add detection block before the final closing brace
  const detectionBlock =
    `  detection {\n    process_definition {\n      id                 = "${name}"\n` +
    `      process_group_name = "${name}"\n      report             = "always"\n` +
    `      rules {\n        rule {\n          condition = "$contains(${name})"\n` +
    `          property  = "executablePath"\n        }\n      }\n    }\n  }\n`;

  // Use a replacer function so '$' inside detectionBlock is not treated specially
  const newContent = content.trim().replace(/\}\s*$/, () => detectionBlock + '}\n');
  return newContent;
}

function fixTerraformFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  const newContent = fixTerraformContent(content);

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    return true;
  }
  return false;
}

function main() {
  const networkMonitorDir = 'modules/network_monitor';
  let filesFixed = 0;
  // Try one file first
  const testFile =
    'modules/network_monitor/AAPilots_Synthetic_Health_Check_Dev_West.network_monitor.tf';
  if (fixTerraformFile(testFile)) {
    console.log(`Fixed ${testFile}`);
    filesFixed += 1;
  }

  // Process network_monitor
  for (const filename of fs.readdirSync(networkMonitorDir)) {
    if (filename.endsWith('.tf') && filename !== path.basename(testFile)) {
      const filePath = path.join(networkMonitorDir, filename);
      if (fixTerraformFile(filePath)) {
        filesFixed += 1;
      }
    }
  }

  // Process declarative_grouping
  const declDir = 'modules/declarative_grouping';
  if (fs.existsSync(declDir)) {
    for (const filename of fs.readdirSync(declDir)) {
      if (filename.endsWith('.tf')) {
        const filePath = path.join(declDir, filename);
        if (fixTerraformFile(filePath)) {
          filesFixed += 1;
        }
      }
    }
  }

  console.log(`Total files fixed: ${filesFixed}`);
}

if (require.main === module) {
  main();
}

module.exports = {
  fixTerraformContent,
  fixDeclarativeGrouping,
  fixTerraformFile,
};