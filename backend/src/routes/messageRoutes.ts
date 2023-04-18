import { Router } from 'express';
import { getAllMessages, createMessage, getMessage,
    updateMessage, deleteMessage, getUserMessage } from '../controllers/messageController';

const router = Router();

router.get('/', getAllMessages);

router.post('/', createMessage);

router.get('/:messageId', getMessage);

router.put('/:messageId', updateMessage);

router.get('/user/:userId', getUserMessage);

router.delete('/:messageId', deleteMessage);

export default router;