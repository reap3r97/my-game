import Player from '../models/player.js';
import crypto from 'crypto';

class PlayerController {
    async createPlayer(req, res) {
        try {
            const { username, email, password } = req.body;
            const existingUsername = await Player.findByUsername(username);
            const existingEmail = await Player.findByEmail(email);

            if (existingUsername) {
                return res.status(400).json({ error: 'Username already exists' });
            }

            if (existingEmail) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            const player = await Player.create({
                username, email, password
            });

            res.status(201).json(player);
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    async getAllPlayers(req, res) {
        try {
            const players = await Player.findAll();
            res.status(200).json(players);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPlayerById(req, res) {
        try {
            const player = await Player.findById(req.params.id);

            if (!player) {
                return res.status(404).json({ error: 'Player not found' });
            }

            res.status(200).json(player);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updatePlayer(req, res) {
        try {
            const { username } = req.body;
            const player = await Player.findById(req.params.id);

            if (!player) {
                return res.status(404).json({ error: 'Player not found' });
            }

            if (username !== player.username) {
                const existingUsername = await Player.findByUsername(username);
                if (existingUsername) {
                    return res.status(400).json({ error: 'Username already taken' });
                }
            }

            const updatedPlayer = await Player.updateById(req.params.id, req.body);
            res.status(200).json(updatedPlayer);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deletePlayer(req, res) {
        try {
            const player = await Player.findById(req.params.id);

            if (!player) {
                return res.status(404).json({ error: 'Player not found' });
            }

            await Player.deleteById(req.params.id);

            res.status(200).json({ message: 'Player deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async loginPlayer(req, res) {
        try {
            const { username, password } = req.body;
            const player = await Player.login(username, password);

            res.status(200).json({ message: 'Login successful', player });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}

export default new PlayerController();
