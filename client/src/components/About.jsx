import React from "react";
import styled, { keyframes } from "styled-components";
import { FaStar, FaMagic, FaHeart, FaGem, FaRocket, FaUsers, FaCalendarAlt, FaGlassCheers } from "react-icons/fa";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const AboutContainer = styled.section`
  padding: 60px 15px;
  background: linear-gradient(to right, #c8c5c1, #ccccbd);
  position: relative;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80') center/cover;
    opacity: 0.03;
    z-index: 0;
  }

  @media (min-width: 768px) {
    padding: 80px 20px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  padding: 0 15px;

  @media (min-width: 768px) {
    padding: 0;
  }
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  background: rgb(98, 73, 71);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${fadeIn} 1s ease-out;
  width: 100%;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #ff8a00 0%, #e52e71 100%);
    border-radius: 2px;
  }

  @media (min-width: 768px) {
    font-size: 3.5rem;
    margin-bottom: 30px;
    width: auto;
  }
`;

const Tagline = styled.p`
  font-size: 1.2rem;
  color: #4a5568;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 300;
  animation: ${fadeIn} 1s ease-out 0.2s both;
  padding: 0 15px;

  @media (min-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 50px;
    padding: 0;
  }
`;

const Description = styled.div`
  background: rgb(220, 220, 213);
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  animation: ${fadeIn} 1s ease-out 0.4s both;
  line-height: 1.6;
  font-size: 1rem;
  color: #4a5568;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, #ff8a00, #e52e71);
  }

  strong {
    color: #2d3748;
    font-weight: 600;
  }

  p {
    margin-bottom: 15px;
  }

  @media (min-width: 768px) {
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    margin-bottom: 60px;
    line-height: 1.8;
    font-size: 1.1rem;

    p {
      margin-bottom: 20px;
    }
  }
`;

const Highlights = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 30px;

  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-top: 50px;
  }
`;

const HighlightCard = styled.div`
  background: rgb(220, 220, 213);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  animation: ${fadeIn} 1s ease-out ${props => props.delay || '0.6s'} both;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, ${props => props.colorStart || '#ff8a00'}, ${props => props.colorEnd || '#e52e71'});
  }

  @media (min-width: 768px) {
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);

    &:hover {
      transform: translateY(-10px);
    }
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  font-size: 25px;
  color: white;
  background: linear-gradient(135deg, ${props => props.colorStart || '#ff8a00'}, ${props => props.colorEnd || '#e52e71'});
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  animation: ${pulse} 2s infinite;

  @media (min-width: 768px) {
    width: 70px;
    height: 70px;
    font-size: 30px;
    margin-bottom: 20px;
  }
`;

const HighlightTitle = styled.h3`
  font-size: 1.3rem;
  color: #2d3748;
  font-weight: 600;
  text-align: center;
  margin-bottom: 12px;

  @media (min-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const HighlightDescription = styled.p`
  font-size: 0.95rem;
  color: #718096;
  text-align: center;
  line-height: 1.5;

  @media (min-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 40px 0;
  animation: ${fadeIn} 1s ease-out 0.8s both;

  @media (min-width: 576px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  @media (min-width: 768px) {
    margin: 60px 0;
    gap: 30px;
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 15px;
  min-width: auto;

  @media (min-width: 768px) {
    padding: 20px;
    min-width: 200px;
  }
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 5px;
  background: linear-gradient(90deg, #2b5876 0%, #4e4376 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  @media (min-width: 768px) {
    font-size: 3rem;
    margin-bottom: 10px;
  }
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #718096;
  font-weight: 500;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const About = () => {
  return (
    <AboutContainer>
      <ContentWrapper>
        <Heading>About EternaPlan</Heading>
        <Tagline>Where Dreams Become Unforgettable Experiences</Tagline>
        
        <Description>
          <p>
            <strong>EternaPlan</strong> is not just an event planning company - we're memory architects. 
            Founded in 2025, we've transformed over 1,200 special occasions into timeless experiences 
            that continue to live in the hearts of our Users.
          </p>
          
          <p>
            Our philosophy is simple: <strong>Every event tells a story</strong>, and we're here to ensure 
            yours is told with perfection. From intimate gatherings to grand celebrations, we blend 
            innovative design with flawless execution to create moments that transcend the ordinary.
          </p>
          
          <p>
            What sets us apart is our <strong>obsessive attention to detail</strong> and our ability to 
            understand and interpret our usrs' visions. We don't just plan events; we craft 
            immersive experiences that engage all senses and leave lasting impressions.
          </p>
        </Description>
        
        <StatsContainer>
          <StatItem>
            <StatNumber>1,200+</StatNumber>
            <StatLabel>Events Plan created</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>98%</StatNumber>
            <StatLabel>User Satisfaction</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>15+</StatNumber>
            <StatLabel>Awards Won</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>5</StatNumber>
            <StatLabel>Years Experience</StatLabel>
          </StatItem>
        </StatsContainer>
        
        <Highlights>
          <HighlightCard delay="0.6s" colorStart="#ff8a00" colorEnd="#e52e71">
            <IconWrapper colorStart="#ff8a00" colorEnd="#e52e71">
              <FaStar />
            </IconWrapper>
            <HighlightTitle>Unmatched Expertise</HighlightTitle>
            <HighlightDescription>
              With over 15 years in the industry and 1,200+ successful events, our veteran team brings unparalleled knowledge to every project.
            </HighlightDescription>
          </HighlightCard>
          
          <HighlightCard delay="0.8s" colorStart="#4e4376" colorEnd="#2b5876">
            <IconWrapper colorStart="#4e4376" colorEnd="#2b5876">
              <FaMagic />
            </IconWrapper>
            <HighlightTitle>Creative Magic</HighlightTitle>
            <HighlightDescription>
              Our award-winning design team specializes in unique, personalized themes that transform venues into magical worlds.
            </HighlightDescription>
          </HighlightCard>
          
          <HighlightCard delay="1.0s" colorStart="#e52e71" colorEnd="#ff8a00">
            <IconWrapper colorStart="#e52e71" colorEnd="#ff8a00">
              <FaHeart />
            </IconWrapper>
            <HighlightTitle>Client-Centric Approach</HighlightTitle>
            <HighlightDescription>
              Dedicated planners, 24/7 support, and white-glove service ensure your experience is as perfect as your event.
            </HighlightDescription>
          </HighlightCard>
          
          <HighlightCard delay="1.2s" colorStart="#2b5876" colorEnd="#4e4376">
            <IconWrapper colorStart="#2b5876" colorEnd="#4e4376">
              <FaGem />
            </IconWrapper>
            <HighlightTitle>Luxury & Elegance</HighlightTitle>
            <HighlightDescription>
              Exclusive partnerships with premium vendors allow us to deliver truly luxurious experiences at competitive prices.
            </HighlightDescription>
          </HighlightCard>

          <HighlightCard delay="1.4s" colorStart="#00c6ff" colorEnd="#0072ff">
            <IconWrapper colorStart="#00c6ff" colorEnd="#0072ff">
              <FaRocket />
            </IconWrapper>
            <HighlightTitle>Innovative Solutions</HighlightTitle>
            <HighlightDescription>
              We stay ahead of trends with cutting-edge technology including VR venue previews and AI-powered planning tools.
            </HighlightDescription>
          </HighlightCard>

          <HighlightCard delay="1.6s" colorStart="#f46b45" colorEnd="#eea849">
            <IconWrapper colorStart="#f46b45" colorEnd="#eea849">
              <FaUsers />
            </IconWrapper>
            <HighlightTitle>Global Network</HighlightTitle>
            <HighlightDescription>
              With partners in 12 countries, we can coordinate destination events anywhere in the world with local expertise.
            </HighlightDescription>
          </HighlightCard>
        </Highlights>
      </ContentWrapper>
    </AboutContainer>
  );
};

export default About;