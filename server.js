const { createServer } = require('http');
const next = require('next');
// Next.js loads .env files itself; PORT and NODE_ENV also come from pm2.
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const port = process.env.PORT || 7000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        createServer(async (req, res) => {
            if (req.url.startsWith("/api/auth/")) {
                // Forward NextAuth API requests
                return handle(req, res);
            }
            handle(req, res);
        }).listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Error starting server:', err);
        process.exit(1);
    });
