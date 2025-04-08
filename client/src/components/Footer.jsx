import React from "react";
import styled from "styled-components";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const FooterContainer = styled.footer`
  background: linear-gradient(to right, #c8c5c1, #ccccbd);
  padding: 60px 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #2d3748;
  font-family: "Poppins", sans-serif;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, rgba(149, 87, 73, 0.8), rgba(149, 87, 73, 0.2));
  }

  @media (max-width: 768px) {
    padding: 40px 15px 20px;
  }

  @media (max-width: 480px) {
    padding: 30px 10px 15px;
  }
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 40px;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
`;

const Section = styled.div`
  flex: 1;
  min-width: 250px;
  text-align: left;
  padding: 0 20px;

  @media (max-width: 768px) {
    min-width: 100%;
    padding: 0 10px;
    text-align: center;
  }

  h3 {
    font-size: 1.5rem;
    color: rgb(149, 87, 73);
    font-weight: 600;
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 10px;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 2px;
      background: rgba(149, 87, 73, 0.8);

      @media (max-width: 768px) {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  p {
    font-size: 0.95rem;
    color: #4a5568;
    line-height: 1.7;
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin: 12px 0;
      position: relative;
      padding-left: 20px;

      &::before {
        content: "→";
        position: absolute;
        left: 0;
        color: rgb(149, 87, 73);
      }

      @media (max-width: 768px) {
        padding-left: 0;
        text-align: center;

        &::before {
          display: none;
        }
      }
    }

    li a {
      color: #4a5568;
      text-decoration: none;
      transition: all 0.3s ease;
      font-size: 0.95rem;

      &:hover {
        color: rgb(149, 87, 73);
        padding-left: 5px;
      }
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  margin: 30px 0;

  a {
    color: #4a5568;
    font-size: 1.5rem;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.5);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-5px);
      background: rgba(255, 255, 255, 0.8);
      color: rgb(149, 87, 73);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
  }

  @media (max-width: 480px) {
    gap: 15px;

    a {
      width: 40px;
      height: 40px;
      font-size: 1.2rem;
    }
  }
`;

const Credit = styled.div`
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
  text-align: center;

  p {
    font-size: 0.9rem;
    color: #4a5568;
    margin: 0;

    @media (max-width: 480px) {
      font-size: 0.8rem;
    }
  }

  a {
    color: rgb(149, 87, 73);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      color: #2d3748;
      text-decoration: underline;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <SectionWrapper>
        <Section>
          <h3>EternaPlan</h3>
          <p>
            Crafting unforgettable experiences with creativity and precision.
            We transform your vision into reality with elegance and perfection.
          </p>
        </Section>

        <Section>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Our Services</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </Section>

        <Section>
          <h3>Contact Us</h3>
          <ul>
            <li><a href="mailto:info@eternaplan.com">info@eternaplan.com</a></li>
            <li><a href="tel:+1234567890">+1 (234) 567-890</a></li>
            <li><a href="/contact">Contact Form</a></li>
            <li><a href="/ServiceDetails">FAQ</a></li>
          </ul>
        </Section>
      </SectionWrapper>

      <SocialIcons>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
      </SocialIcons>

      <Credit>
        <p>
          © {new Date().getFullYear()} <a href="/">EternaPlan</a>. All rights reserved. 
          Designed by <a href="https://github.com/JASPAL70">Jaspal Singh</a>
        </p>
      </Credit>
    </FooterContainer>
  );
};

export default Footer;
