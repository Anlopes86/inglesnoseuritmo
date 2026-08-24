const fs = require('fs');
const http = require('http');
const path = require('path');

const root = path.resolve(__dirname, '..');
const rootPrefix = `${root}${path.sep}`;
const port = Number(process.env.V3_QA_PORT || 8765);
const mimeTypes = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml'
};

http.createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
    const requestedPath = path.resolve(root, `.${pathname}`);
    if (requestedPath !== root && !requestedPath.startsWith(rootPrefix)) {
        response.writeHead(403).end('Forbidden');
        return;
    }
    fs.stat(requestedPath, (statError, stat) => {
        const filePath = !statError && stat.isDirectory() ? path.join(requestedPath, 'index.html') : requestedPath;
        fs.readFile(filePath, (readError, body) => {
            if (readError) {
                response.writeHead(404).end('Not found');
                return;
            }
            response.writeHead(200, {
                'Content-Type': mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
                'Cache-Control': 'no-store'
            });
            response.end(body);
        });
    });
}).listen(port, '127.0.0.1', () => {
    console.log(`V3 QA server listening on http://127.0.0.1:${port}`);
});
