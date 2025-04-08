import React from "react";
import styled, { keyframes } from "styled-components";
import {
  FaBrain,
  FaRobot,
  FaPalette,
  FaMobileAlt,
  FaCommentDots,
} from "react-icons/fa";

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const FeaturesSection = styled.section`
  background: linear-gradient(to right, #c8c5c1, #ccccbd);
  color: #2d3748;
  padding: 100px 20px;
  text-align: center;
  font-family: "Poppins", sans-serif;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 80px 16px;
  }

  @media (max-width: 480px) {
    padding: 60px 10px;
  }
`;

const Title = styled.h2`
  font-size: 3.5rem;
  margin-bottom: 20px;
  font-weight: 700;
  background: rgb(98, 73, 71);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  display: inline-block;
  animation: ${fadeIn} 1s ease-out;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #ff8a00 0%, #e52e71 100%);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #4a5568;
  max-width: 800px;
  margin: 0 auto 60px;
  line-height: 1.6;
  animation: ${fadeIn} 1s ease-out 0.2s both;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 40px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 70px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FeatureCard = styled(({
  $colorStart, $colorEnd, $delay, ...rest
}) => <div {...rest} />)`
  --colorStart: ${props => props.$colorStart};
  --colorEnd: ${props => props.$colorEnd};
  background: rgb(220, 220, 213);
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 1s ease-out ${props => props.$delay || "0.4s"} both;
  z-index: 1;

  &:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.12);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, var(--colorStart), var(--colorEnd));
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: var(--colorStart);
    opacity: 0.05;
    border-radius: 50%;
    transform: translate(40%, 40%);
    z-index: -1;
    transition: all 0.4s ease;
  }

  @media (max-width: 480px) {
    padding: 16px 14px;
  }
`;

const IconContainer = styled(({ $isAssistant, ...rest }) => <div {...rest} />)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 25px;
  font-size: 40px;
  color: white;
  background: linear-gradient(135deg, var(--colorStart), var(--colorEnd));
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  animation: ${props => props.$isAssistant ? float : pulse} 3s ease-in-out infinite;

  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
    font-size: 30px;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #2d3748;

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #718096;
  line-height: 1.8;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const FeatureHighlight = styled.span`
  display: inline-block;
  background: rgba(255, 138, 0, 0.1);
  color: #ff8a00;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-top: 15px;
`;

// Main Component
const Features = () => {
  return (
    <FeaturesSection>
      <Title>Our Premium Features</Title>
      <Subtitle>
        Discover how EternaPlan's innovative tools transform your event planning experience
        with cutting-edge technology and personalized service.
      </Subtitle>

      <FeaturesContainer>
        <FeatureCard $colorStart="#00c6ff" $colorEnd="#0072ff" $delay="0.4s">
          <IconContainer $isAssistant>
            <FaCommentDots />
          </IconContainer>
          <FeatureTitle>AI Planning Assistant</FeatureTitle>
          <FeatureDescription>
            Get 24/7 personalized recommendations from our AI assistant that learns your preferences
            and suggests perfect vendors, themes, and timelines.
          </FeatureDescription>
          <FeatureHighlight>Beta Feature</FeatureHighlight>
        </FeatureCard>

        <FeatureCard $colorStart="#ff4757" $colorEnd="#e84393" $delay="0.6s">
          <IconContainer>
            <FaBrain />
          </IconContainer>
          <FeatureTitle>Smart Recommendations</FeatureTitle>
          <FeatureDescription>
            Our AI analyzes thousands of successful events to suggest perfect themes,
            vendors, and budgets tailored just for you.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard $colorStart="#4facfe" $colorEnd="#00f2fe" $delay="1.0s">
          <IconContainer>
            <FaRobot />
          </IconContainer>
          <FeatureTitle>AI Chatbot Assistant</FeatureTitle>
          <FeatureDescription>
            Smart, real-time assistant for answering event planning queries, offering suggestions,
            reminders, and interactive guidance to streamline your planning journey.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard $colorStart="#2ed573" $colorEnd="#7bed9f" $delay="1.2s">
          <IconContainer>
            <FaPalette />
          </IconContainer>
          <FeatureTitle>Dynamic Theme Generator</FeatureTitle>
          <FeatureDescription>
            AI-powered theme suggestions that evolve as you plan, with automatic
            color palettes and decor recommendations.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard $colorStart="#ff6b81" $colorEnd="#ff4757" $delay="1.4s">
          <IconContainer>
            <FaRobot />
          </IconContainer>
          <FeatureTitle>Real-Time User Feedback</FeatureTitle>
          <FeatureDescription>
            Instantly gather guest feedback, ratings, and suggestions to adapt your event experience on the go.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard $colorStart="#ff6348" $colorEnd="#ff4757" $delay="1.8s">
          <IconContainer>
            <FaMobileAlt />
          </IconContainer>
          <FeatureTitle>Mobile Experience</FeatureTitle>
          <FeatureDescription>
            Full-featured mobile app with responsive design, on-the-go planning tools,
            and instant notifications.
          </FeatureDescription>
        </FeatureCard>
      </FeaturesContainer>
    </FeaturesSection>
  );
};

export default Features;
