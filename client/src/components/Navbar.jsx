import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiMenu, FiX } from 'react-icons/fi';
const NavContainer = styled.nav`
  max-width: 1500px;
  margin: 0 auto;
  padding: 0.3rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 100;
`;

const Logo = styled.a`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d3748;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s ease;
  
  span {
    color: rgb(149, 87, 73);
    font-size: 3rem;
  }
  
  &:hover {
    transform: translateX(5px);
  }
`;

const LogoImage = styled.img`
  height: 70px;
  width: 70px; 
  margin-right: 17px;
  margin-left:25px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  object-fit: contain;
  transform: skew(-15deg);
  
  & > * {
    transform: skew(15deg);
    display: block;
  }

  ${Logo}:hover & {
    transform: skew(-15deg) scale(1.05);
    box-shadow: 0 6px 16px rgba(0,0,0,0.15);
  }

  @media (max-width: 768px) {
    height: 60px;
    width: 60px; 
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
    width: 70%;
    height: 100vh;
    background: white;
    flex-direction: column;
    justify-content: center;
    box-shadow: -5px 0 25px rgba(0,0,0,0.1);
    transition: right 0.4s cubic-bezier(0.17, 0.67, 0.21, 0.99);
    z-index: 100;
    padding-top: 5rem;
  }
`;

const borderAnimation = keyframes`
  0% { width: 0; left: 50%; }
  50% { width: 100%; left: 0; }
  100% { width: 0; left: 50%; }
`;

const NavLink = styled.a`
  color: rgb(40, 41, 43);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.5rem;
  position: relative;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  transition: all 0.4s ease;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid rgb(149, 87, 73);
    border-radius: 50px;
    transform: scale(0.9);
    opacity: 0;
    transition: all 0.4s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: rgb(149, 87, 73);
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #2d3748;
    
    &::before {
      transform: scale(1);
      opacity: 1;
    }
    
    &::after {
      width: 80%;
      animation: ${borderAnimation} 1.5s infinite;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
    padding: 1rem 2rem;
    margin: 0.5rem 0;
    
    &:hover::before {
      transform: scale(1.05);
    }
  }
`;

const MobileButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #2d3748;
  font-size: 1.8rem;
  cursor: pointer;
  z-index: 101;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: rotate(90deg);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: all 0.4s ease;
  z-index: 99;
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <NavContainer>
        <Logo href="/">
          <LogoImage 
            src="\img\WhatsApp Image 2025-04-06 at 10.50.17_af72f1f4.jpg" 
            alt="EternaPlan Logo" 
          />
          <span>Eterna</span>Plan
        </Logo>

        <MobileButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </MobileButton>

        <NavLinks $isOpen={isOpen}>
          <NavLink href="/" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink href="/services" onClick={() => setIsOpen(false)}>Services</NavLink>
          <NavLink href="/about" onClick={() => setIsOpen(false)}>About</NavLink>
          <NavLink href="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
        </NavLinks>
      </NavContainer>
      <Overlay $isOpen={isOpen} onClick={() => setIsOpen(false)} />
    </>
  );
};

export default Navbar;