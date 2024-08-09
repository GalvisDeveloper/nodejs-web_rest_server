

import express, { Router } from 'express';

interface Options {
    PORT: number;
    routes: Router;
}

export class Server {
    public readonly app = express();
    private serverListener?: any;
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        this.port = options.PORT;
        this.routes = options.routes;
    }

    async start() {

        // * Middleware
        this.app.use(express.json()); // - raw
        this.app.use(express.urlencoded({ extended: true })); // - x-www-form-urlencoded

        // * Public folder
        this.app.use(express.static('public'));

        // * Routes
        this.app.use(this.routes);

        // * SPA
        this.app.get('*', (req, res) => {
            res.sendFile('index.html', { root: 'public' });
        });

        this.serverListener = this.app.listen(this.port, () => {
            console.log(`Server running at http://localhost:${this.port}/ !`);
        });
    }


    public async stop() {
        this.serverListener?.close();
    }

}