import { readFileSync } from 'fs';
import http2 from 'http2';

const port = 3000;

const server = http2.createSecureServer({
	key: readFileSync('./keys/server.key'),
	cert: readFileSync('./keys/server.crt')
}, (req, res) => {
	// res.writeHead(200, { 'Content-Type': 'application/json' });
	// const data = { name: 'John Doe', age: 25 };
	// res.end(JSON.stringify(data));

	console.log(req.url)
	// res.writeHead(200, { 'Content-Type': 'text/html' });
	// res.write('<h1>Hello World</h1>\n');

	if (req.url === '/') {
		const htmlFile = readFileSync('./public/index.html', 'utf8');
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(htmlFile);
		return;
	}

	if (req.url?.endsWith('.js')) {
		res.writeHead(200, { 'Content-Type': 'application/javascript' });
	} else if (req.url?.endsWith('.css')) {
		res.writeHead(200, { 'Content-Type': 'text/css' });
	}

	try {
		const responseContent = readFileSync(`./public${req.url}`, 'utf-8');
		res.end(responseContent);
	} catch (err) {
		res.writeHead(404, { 'Content-Type': 'text/html' });
		res.end('<h1>404 Not Found</h1>');
	}

})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});
