import express from 'express';
import PlayerController from '../controllers/playerController.js';

const router = express.Router();

router.get('/', PlayerController.getAllPlayers);
router.post('/register', PlayerController.createPlayer);
router.post('/login', PlayerController.loginPlayer);
router.get('/:id', PlayerController.getPlayerById);
router.patch('/:id', PlayerController.updatePlayer);
router.delete('/:id', PlayerController.deletePlayer);

export default router;