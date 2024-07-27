"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const http2_1 = __importDefault(require("http2"));
const port = 3000;
const server = http2_1.default.createSecureServer({
    key: (0, fs_1.readFileSync)('./keys/server.key'),
    cert: (0, fs_1.readFileSync)('./keys/server.crt')
}, (req, res) => {
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // const data = { name: 'John Doe', age: 25 };
    // res.end(JSON.stringify(data));
    var _a, _b;
    console.log(req.url);
    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.write('<h1>Hello World</h1>\n');
    if (req.url === '/') {
        const htmlFile = (0, fs_1.readFileSync)('./public/index.html', 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
        return;
    }
    if ((_a = req.url) === null || _a === void 0 ? void 0 : _a.endsWith('.js')) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
    }
    else if ((_b = req.url) === null || _b === void 0 ? void 0 : _b.endsWith('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
    }
    try {
        const responseContent = (0, fs_1.readFileSync)(`./public${req.url}`, 'utf-8');
        res.end(responseContent);
    }
    catch (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
});
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
