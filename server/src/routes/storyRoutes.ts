import express from "express";
import * as storyControllerV1 from "../controllers/v1/storyController";

const router = express.Router();

// http://localhost:5000/api/v1/stories/theme-rooms/{themeRoomId}
router.get('/theme-rooms/:themeRoomId', storyControllerV1.fetchStoriesByThemeRoomId);

// http://localhost:5000/api/v1/stories/theme-rooms
router.get('/theme-rooms', storyControllerV1.fetchStoriesByThemeRooms);

// http://localhost:5000/api/v1/stories
router.get('/', storyControllerV1.fetchAllStories);

// http://localhost:5000/api/v1/stories
router.post('/', storyControllerV1.createStory);

// http://localhost:5000/api/v1/stories/filtered
router.post('/filtered', storyControllerV1.fetchFilteredStories);

// http://localhost:5000/api/v1/stories/{storyId}
router.get('/:storyId', storyControllerV1.fetchSingleStory);

// http://localhost:5000/api/v1/stories/{storyId}
router.delete('/:storyId', storyControllerV1.deleteSingleStory);

// http://localhost:5000/api/v1/stories/{storyId}
router.patch('/:storyId', storyControllerV1.editStory);



export default router;