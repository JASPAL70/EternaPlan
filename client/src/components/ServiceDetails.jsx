import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import config from "../config"; 
import ChatBot from "./ChatBot"; 

// Styled Components
const Container = styled.div`
  background-color:rgb(229, 234, 228);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

const Heading = styled.h2`
  color: rgb(149, 87, 73);
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid  rgb(149, 87, 73);
  border-radius: 6px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid  rgb(149, 87, 73);
  border-radius: 6px;
  font-size: 16px;
`;

const RangeInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 17px;
  margin-top: 4px;
  background: #ddd;
  border-radius: 4px;
  outline: none;

  /* WebKit (Chrome/Safari) */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: rgb(149, 87, 73);
    cursor: pointer;
  }

  /* Firefox */
  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: rgb(149, 87, 73);
    cursor: pointer;
    border: none;
  }

  /* Progress fill (Firefox) */
  &::-moz-range-progress {
    background: rgb(149, 87, 73);
    height: 8px;
    border-radius: 4px;
  }
`;

const Feedback = styled.p`
  font-size: 14px;
  margin-top: 0px;
`;

const Button = styled.button`
  background-color: rgb(149, 87, 73);
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: rgb(156, 108, 97);
  }
`;

const OutputSection = styled.div`
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: rgb(229, 234, 228);
`;

const SectionTitle = styled.h3`
  font-size: 22px;
  color: #916f55;
  margin-bottom: 15px;
`;

const StyledList = styled.ul`
  padding-left: 20px;
  margin: 10px 0;
`;

const StyledListItem = styled.li`
  margin-bottom: 10px;
  line-height: 1.8;
  font-size: 16px;
`;

const StarRating = styled.div`
  display: flex;
  gap: 5px;
  margin: 10px 0;
`;

const Star = styled.span`
  font-size: 24px;
  color: ${props => props.$active ? '#ffc107' : '#e4e5e9'};
  cursor: pointer;
`;

const FeedbackForm = styled.div`
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f8f9fa;
`;

const FeedbackItem = styled.div`
  padding: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;

const FeedbackAuthor = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`;

const FeedbackRating = styled.div`
  color: #916f55;
  margin-bottom: 5px;
`;

const FeedbackComment = styled.p`
  font-style: italic;
`;

// Main Component
const ServiceDetails = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    activity: "Birthday Party",
    budget: "5000",
    days: 1,
    guests: "",
    location: "",
    date: "",
  });

  const [feedbackData, setFeedbackData] = useState({
    name: "",
    email: "",
    rating: 0,
    comment: "",
    serviceId: id
  });

  const [themeSuggestions, setThemeSuggestions] = useState(null);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState([]);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = `Service Plan: ${id}`;
    fetchFeedbacks();
  }, [id]);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/api/v1/feedback?serviceId=${id}`);
      // Ensure we always get an array
      const feedbacks = Array.isArray(response.data) ? response.data : 
                       response.data?.data ? response.data.data : 
                       response.data?.feedbacks || [];
      setSubmittedFeedbacks(feedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      setSubmittedFeedbacks([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setFeedbackData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const themeResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.GEMINI_API_KEY}`,
        {
          contents: [{
            parts: [{
              text: `Provide 5 theme suggestions for a ${formData.activity} with a budget of ${formData.budget}, located in ${formData.location}, for ${formData.guests} guests.`
            }]
          }]
        }
      );
      setThemeSuggestions(
        themeResponse.data.candidates[0]?.content.parts.map(part => part.text).join("\n")
      );

      const planResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.GEMINI_API_KEY}`,
        {
          contents: [{
            parts: [{
              text: `Generate a detailed plan for a ${formData.activity} in ${formData.location}, lasting ${formData.days} days, for ${formData.guests} guests, with a budget of ${formData.budget}, event date "${formData.date}".`
            }]
          }]
        }
      );
      setGeneratedPlan(
        planResponse.data.candidates[0]?.content.parts.map(part => part.text).join("\n")
      );
    } catch (error) {
      console.error("Error generating content:", error);
      alert("Failed to generate plan. Please try again.");
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    
    if (!feedbackData.name || !feedbackData.email || !feedbackData.comment || feedbackData.rating === 0) {
      alert("Please fill all fields and provide a rating");
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${config.API_URL}/api/v1/feedback`,
        feedbackData,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      
      if (response.status === 201) {
        await fetchFeedbacks();
        setFeedbackData({
          name: "",
          email: "",
          rating: 0,
          comment: "",
          serviceId: id
        });
      }
    } catch (error) {
      console.error("Feedback submission error:", error);
      alert(error.response?.data?.message || "Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Heading>Service Plan: {id}</Heading>
      <Form onSubmit={handleSubmit}>
        <Label>
          Activity:
          <Select name="activity" value={formData.activity} onChange={handleInputChange}>
            <option value="Birthday Party">Birthday Party</option>
            <option value="Wedding">Wedding</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="Anniversary">Anniversary</option>
            <option value="BabyShowerPlanning">BabyShowerPlanning</option>
            <option value="FestivalCelebrationPlanning">FestivalCelebrationPlanning</option>
            <option value="CharityEventPlanning">CharityEventPlanning</option>
            <option value="SportsEventPlanning">SportsEventPlanning</option>
            <option value="GraduationPartyPlanning">GraduationPartyPlanning</option>
            <option value="GameNightPlanning">GameNightPlanning</option>
            <option value="CampingTripPlanning">CampingTripPlanning</option>
          </Select>
        </Label>

        <Label>
          Budget:
          <RangeInput
            type="range"
            name="budget"
            min="5000"
            max="100000"
            step="2000"
            value={formData.budget}
            onChange={handleInputChange}
          />
          <Feedback>{`Selected Budget: ₹${formData.budget}`}</Feedback>
        </Label>

        <Label>
          Number of Days:
          <RangeInput
            type="range"
            name="days"
            min="1"
            max="10"
            value={formData.days}
            onChange={handleInputChange}
          />
          <Feedback>{`Event Duration: ${formData.days} day(s)`}</Feedback>
        </Label>

        <Label>
          Guests:
          <Input
            type="number"
            name="guests"
            placeholder="Enter number of guests"
            value={formData.guests}
            onChange={handleInputChange}
          />
        </Label>

        <Label>
          Location:
          <Input
            type="text"
            name="location"
            placeholder="Enter preferred location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </Label>

        <Label>
          Event Date:
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </Label>

        <Button type="submit">Generate Plan</Button>
      </Form>

      {themeSuggestions && (
        <OutputSection>
          <SectionTitle>✨ AI-Generated Theme Suggestions</SectionTitle>
          <StyledList>
            {themeSuggestions.split("\n").map((theme, index) => {
              const cleanTheme = theme.replace(/\*/g, "");
              const [title, ...descParts] = cleanTheme.split(":");
              const description = descParts.join(":");
              return (
                <StyledListItem key={index}>
                  <strong>{title.trim()} </strong> {description.trim()}
                </StyledListItem>
              );
            })}
          </StyledList>
        </OutputSection>
      )}

      {generatedPlan && (
        <OutputSection>
          <SectionTitle>📋 Generated Event Plan (Day-Wise)</SectionTitle>
          <StyledList>
            {generatedPlan.split("\n").map((step, index) => {
              const cleanStep = step.replace(/\*/g, "");
              const [dayTitle, ...descParts] = cleanStep.split(":");
              const description = descParts.join(":");
              return (
                <StyledListItem key={index}>
                  <strong>{dayTitle.trim()} </strong> {description.trim()}
                </StyledListItem>
              );
            })}
          </StyledList>
        </OutputSection>
      )}

      {generatedPlan && (
        <FeedbackForm>
          <SectionTitle>💬 Share Your Feedback</SectionTitle>
          <Form onSubmit={handleFeedbackSubmit}>
            <Label>
              Your Name:
              <Input
                type="text"
                name="name"
                value={feedbackData.name}
                onChange={handleFeedbackChange}
                required
              />
            </Label>
            
            <Label>
              Your Email:
              <Input
                type="email"
                name="email"
                value={feedbackData.email}
                onChange={handleFeedbackChange}
                required
              />
            </Label>
            
            <Label>
              Rating:
              <StarRating>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    $active={star <= (hoverRating || feedbackData.rating)}
                    onClick={() => handleRatingChange(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    ★
                  </Star>
                ))}
              </StarRating>
            </Label>
            
            <Label>
              Your Comments:
              <Input
                as="textarea"
                rows="4"
                name="comment"
                value={feedbackData.comment}
                onChange={handleFeedbackChange}
                required
              />
            </Label>
            
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </Form>
        </FeedbackForm>
      )}

      <OutputSection>
        <SectionTitle>🌟 Customer Reviews</SectionTitle>
        {submittedFeedbacks.length > 0 ? (
          submittedFeedbacks.map((feedback, index) => (
            <FeedbackItem key={index}>
              <FeedbackAuthor>
                {feedback.name} ({feedback.email})
              </FeedbackAuthor>
              <FeedbackRating>
                {'★'.repeat(feedback.rating)}{'☆'.repeat(5 - feedback.rating)}
              </FeedbackRating>
              <FeedbackComment>"{feedback.comment}"</FeedbackComment>
            </FeedbackItem>
          ))
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
      </OutputSection>

      <ChatBot userData={formData} />
    </Container>
  );
};

export default ServiceDetails;