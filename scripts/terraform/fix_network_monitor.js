const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'modules/network_monitor');

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Clean up previous attempts
    content = content.replace(/\s*target_list = \[\]/g, '');
    content = content.replace(/\s*properties\s*=\s*\[\]/g, '');
    content = content.replace(/\s*constraints\s*{[^}]*constraint\s*{[^}]*}\s*}/g, '');

    // Regex to find step { ... } blocks
    const stepRegex = /step\s*{[^}]*request_type\s*=\s*""[^}]*}/g;
    
    let newContent = content.replace(stepRegex, (match) => {
        if (match.includes('target_list =')) return match;
        
        const insertion = `
      target_list = []
      properties  = {}
      constraints {
        constraint {
          type       = "ERROR_CODE"
          properties = {}
        }
      }`;
        
        return match.replace(/}\s*$/, insertion + '\n    }');
    });
    
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Fixed: ${filePath}`);
    }
}

if (fs.existsSync(directoryPath)) {
    const files = fs.readdirSync(directoryPath);
    files.forEach(file => {
        if (file.endsWith('.tf')) {
            fixFile(path.join(directoryPath, file));
        }
    });
}
