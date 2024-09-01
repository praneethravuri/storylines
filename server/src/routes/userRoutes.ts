import express from "express"
import * as userControllerV1 from "../controllers/v1/userController"

const router = express.Router();

router.post('/', userControllerV1.createUser)

export default router