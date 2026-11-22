// Copies the live demo into www/ so Capacitor can bundle it inside the app.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), out = path.join(__dirname, 'www');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const f of fs.readdirSync(path.join(root, 'demo'))) {
  fs.copyFileSync(path.join(root, 'demo', f), path.join(out, f));
}
// the demo references ../logo-mark.svg; in the app it sits beside index.html
fs.copyFileSync(path.join(root, 'logo-mark.svg'), path.join(out, 'logo-mark.svg'));
let html = fs.readFileSync(path.join(out, 'index.html'), 'utf8').split('../logo-mark.svg').join('logo-mark.svg');
fs.writeFileSync(path.join(out, 'index.html'), html);
console.log('www ready:', fs.readdirSync(out).join(', '));
