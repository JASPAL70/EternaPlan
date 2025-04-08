import Feedback from "../models/feedbackModel.js";

export const createFeedback = async (req, res, next) => {
  try {
    const { name, email, rating, comment, serviceId } = req.body;

    const feedback = new Feedback({
      name,
      email,
      rating,
      comment,
      serviceId,
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    next(error);
  }
};


export const getFeedbacks = async (req, res, next) => {
  try {
    const { serviceId } = req.query;

    if (!serviceId) {
      return res.status(400).json({
        success: false,
        message: "Service ID is required",
      });
    }

    const feedbacks = await Feedback.find({ serviceId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feedbacks.length,
      feedbacks,
    });
  } catch (error) {
    next(error);
  }
};