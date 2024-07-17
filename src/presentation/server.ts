

import express from 'express';

interface Options {
    PORT: number;
}

export class Server {
    private app = express();
    private readonly port: number;

    constructor(options: Options) {
        this.port = options.PORT;
    }

    async start() {
        // * Public folder
        this.app.use(express.static('public'));

        // * Middleware
        this.app.get('*', (req, res) => {
            res.sendFile('index.html', { root: 'public' });
        });

        this.app.listen(this.port, () => {
            console.log(`Server running at http://localhost:${this.port}/`);
        });
    }

    get(path: string, handler: express.RequestHandler) {
        this.app.get(path, handler);
    }

    post(path: string, handler: express.RequestHandler) {
        this.app.post(path, handler);
    }
}