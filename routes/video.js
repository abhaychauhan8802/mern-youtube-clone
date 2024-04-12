import express from "express";
import {
  addVideo,
  deleteVideo,
  feed,
  getVideo,
  search,
  sub,
  tags,
  trending,
  updateVideo,
  views,
} from "../controllers/video.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", getVideo);
router.put("/view/:id", views);
router.get("/trending", trending);
router.get("/feed", feed);
router.get("/sub", sub);
router.get("/tags", tags);
router.get("/search", search);

export default router;
