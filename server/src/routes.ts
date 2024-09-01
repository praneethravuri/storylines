import express, { Request, Response, NextFunction } from "express";
import storyRoutesV1 from "./routes/storyRoutes"
import userRoutesV1 from "./routes/userRoutes"
import themeRoomRoutesV1 from "./routes/themeRoomRoutes";

const router = express.Router();

interface VersionedRequest extends Request {
    apiVersion?: string,
}

// router.use((req: VersionedRequest, res: Response, next: NextFunction) => {
//     const version = req.apiVersion || 'v1';

//     switch (version) {
//         case 'v1':
//             router.use('/stories', storyRoutesV1);
//             router.use('/users', userRoutesV1);
//             router.use('/themerooms', themeRoomRoutesV1);
//             break;
//         default:
//             return res.status(400).json({ error: 'Invalid API version' });
//     }
//     next();
// })

// Use the routes without switching based on version
router.use('/v1/stories', storyRoutesV1);
router.use('/v1/users', userRoutesV1);
router.use('/v1/theme-rooms', themeRoomRoutesV1);

// Catch-all for invalid routes
router.use('*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

export default router;