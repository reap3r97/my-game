import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        this.app.use(express.json());
        this.app.set('port', process.env.PORT || 5000);
    }

    routes() {
        // Need to add routes here when they are created
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server running on port ${this.app.get('port')}`);
        });
    }
}

export default Server;
