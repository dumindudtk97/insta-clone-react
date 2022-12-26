import express from 'express';
import {
    getUser,
    getUserFriends,
    addRemveFriend,

} from "../controllers/users.js";
import { verifyToken } from '../middlewear/auth.js';

const router = express.Router();

/* Read Routes */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);


/* Update Routes*/
router.patch("/:id/friendId", verifyToken, addRemveFriend);

export default router;