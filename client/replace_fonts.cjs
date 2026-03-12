const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('v:/sh/client/src', function (filePath) {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.css')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let original = content;

        // Replace Inter
        content = content.replace(/'Inter'/g, "'Plus Jakarta Sans'");
        content = content.replace(/"'Inter'/g, "\"'Plus Jakarta Sans'");
        content = content.replace(/Inter,/g, "Plus Jakarta Sans,");

        // Replace Outfit
        content = content.replace(/'Outfit'/g, "'Space Grotesk'");
        content = content.replace(/"'Outfit'/g, "\"'Space Grotesk'");
        content = content.replace(/Outfit,/g, "Space Grotesk,");

        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated: ' + filePath);
        }
    }
});
