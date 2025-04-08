import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();

    
    if (!name || !email || !subject || !message) {
      toast.error("All fields are required!");
      return;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/message/send",
        { name, email, subject, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      
      toast.success(res.data.message || "Message sent successfully!");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Error:", error.response || error.message);
      toast.error(
        error.response?.data?.message || "Something went wrong. Try again!"
      );
    }
  };

  return (
    <div className="contact container">
      <div className="banner">
        <div className="item">
          <h4>Address</h4>
          <p>Place, City, 1234</p>
        </div>
        <div className="item">
          <h4>Call Us</h4>
          <p>Call Us: +91-XXXXXXXXXX</p>
        </div>
        <div className="item">
          <h4>Please mail us!</h4>
          <p>jasub787@gmail.com</p>
        </div>
      </div>
      <div className="banner">
      <div className="item">
  <iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.8140627364187!2d75.95272657523465!3d27.193580176480875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396d09d29fda6413%3A0xeff4b5cb1ce3e35a!2sNIMS%20University!5e0!3m2!1sen!2sin!4v1743913688750!5m2!1sen!2sin"
    style={{ border: 0, width: "100%", height: "450px" }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="NIMS University Location"
  />
</div>
        <div className="item">
          <form onSubmit={handleSendMessage}>
            <h2>Contact</h2>
            <div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              rows={10}
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;