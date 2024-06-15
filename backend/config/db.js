import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class Database {
    connect() {
        mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log('Mongo connected'))
            .catch((err) => {
                console.log(err);
                process.exit(1);
            })
    }
}

export default new Database();