import express from 'express';
import dotenv from 'dotenv';
import playerRoutes from '../routes/playerRoutes.js'; // Adjust path as per your project structure

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
        this.app.use('/players', playerRoutes); // Mounting playerRoutes on '/players'
        // Add other routes as needed
        // Example: this.app.use('/characters', characterRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server running on port ${this.app.get('port')}`);
        });
    }
}

export default Server;
