const http = require('http');

const server = http.createServer((req, res) => {
  // Check for large request body
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      // Check request body size
      if (body.length > 1e6) {
        res.statusCode = 413;
        res.end('Request body too large');
        return;
      }
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Success!', data }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    res.statusCode = 405;
    res.end('Method Not Allowed');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});