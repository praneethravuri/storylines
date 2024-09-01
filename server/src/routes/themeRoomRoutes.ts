import express from "express";
import * as themeRoomControllerV1 from "../controllers/v1/themeRoomController"

const router = express.Router();

// http://localhost:5000/api/v1/theme-rooms
router.get('/', themeRoomControllerV1.getAllThemeRooms)
// http://localhost:5000/api/v1/theme-rooms
router.post('/', themeRoomControllerV1.createThemeRoom);

// http://localhost:5000/api/v1/theme-rooms/{themeRoomId}
router.get('/:themeRoomId', themeRoomControllerV1.getSingleThemeRoom)
// http://localhost:5000/api/v1/theme-rooms/{themeRoomId}
router.patch('/:themeRoomId', themeRoomControllerV1.editThemeRoom)

export default router