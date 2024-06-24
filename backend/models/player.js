import mongoose from 'mongoose';
import crypto from 'crypto';

const playerSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: false, default: '' },
    username: { type: String, required: true, unique: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    passwordHash: { type: String, required: true },
    salt: { type: String, required: true },
    level: { type: Number, default: 1 },
    attributes: {
        strength: { type: Number, default: 10 },
        dexterity: { type: Number, default: 10 },
        accuracy: { type: Number, default: 10 },
        defence: { type: Number, default: 10 }
    }
});

playerSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
}

playerSchema.methods.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
    return this.passwordHash === hash;
}

const PlayerModel = mongoose.model('Player', playerSchema);

class Player {
    async create(data) {
        const maxIdPlayer = await PlayerModel.findOne().sort('-id').exec();
        let maxId = 0;

        if (maxIdPlayer) {
            maxId = maxIdPlayer.id;
        }

        const player = new PlayerModel({
            ...data,
            id: maxId + 1
        });

        player.setPassword(data.password);

        await player.save();
        return player;
    }

    async findAll() {
        return PlayerModel.find();
    }

    async findById(id) {
        return PlayerModel.findOne({ id });
    }

    async updateById(id, data) {
        return PlayerModel.findOneAndUpdate({ id }, data, { new: true, runValidators: true });
    }

    async deleteById(id) {
        return PlayerModel.findOneAndDelete({ id });
    }

    async findByUsername(username) {
        return PlayerModel.findOne({ username });
    }

    async findByEmail(email) {
        return PlayerModel.findOne({ email });
    }

    async login(username, password) {
        const player = await PlayerModel.findOne({ username });

        if (!player) {
            throw new Error('Player not found');
        }

        if (!player.validatePassword(password)) {
            throw new Error('Invalid password');
        }

        return {
            username: player.username,
            name: player.name,
            level: player.level,
            id: player.id,
            attributes: player.attributes
        };
    }
}

export default new Player();