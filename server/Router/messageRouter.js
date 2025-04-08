import express from "express";
import Message from "../models/Message.js"; 
const router = express.Router();

console.log("Message model imported successfully:", Message);


router.post("/send", async (req, res) => {
  const { name, email, subject, message } = req.body;

 
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required!" });
  }

 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format!" });
  }

  try {
   
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    
    res.status(200).json({ message: "Message sent successfully and saved to database!" });
  } catch (error) {
    console.error("Error saving message:", error.message);
    res.status(500).json({ message: "Failed to save message to the database." });
  }
});

export default router;