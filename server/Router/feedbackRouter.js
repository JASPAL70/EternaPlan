import express from "express";
import {
  createFeedback,
  getFeedbacks,
} from "../controller/feedbackController.js";

const router = express.Router();

router.post("/", createFeedback);


router.get("/", getFeedbacks);

export default router;