import React from 'react';
import styled from 'styled-components';

const FrontendCard = ({ dataText, rotation, children }: { dataText: string; rotation: number; children: React.ReactNode }) => {
  return (
    <StyledWrapper>
      <div className="container">
        <div data-text={dataText} style={{'--r': rotation} as React.CSSProperties} className="glass">
          {children}
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1000px;
  }

  .container .glass {
    position: relative;
    width: 120px;
    height: 140px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      inset 0 -1px 0 rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
    border-radius: 16px;
    margin: 0 -30px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    transform: rotate(calc(var(--r) * 1deg)) translateZ(0);
    cursor: pointer;
    overflow: hidden;
  }

  .container .glass::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    opacity: 0;
    transition: opacity 0.6s;
  }

  .container .glass::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: rotate(45deg);
    transition: all 0.6s;
    opacity: 0;
  }

  .container:hover .glass {
    transform: rotate(0deg) scale(1.05) translateZ(20px);
    margin: 0 15px;
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.4),
      0 0 60px rgba(100, 200, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      inset 0 -1px 0 rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .container:hover .glass::before {
    opacity: 1;
  }

  .container:hover .glass::after {
    opacity: 1;
    animation: shimmer 0.6s ease-out;
  }

  @keyframes shimmer {
    0% {
      transform: rotate(45deg) translateY(-100%);
    }
    100% {
      transform: rotate(45deg) translateY(100%);
    }
  }

  .container .glass[data-text]::before {
    content: attr(data-text);
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    backdrop-filter: blur(10px);
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .container .glass svg {
    font-size: 3em;
    fill: #fff;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    transition: all 0.6s;
    z-index: 1;
    position: relative;
  }

  .container:hover .glass svg {
    fill: #64b5f6;
    filter: drop-shadow(0 0 20px rgba(100, 181, 246, 0.6));
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    .container .glass {
      width: 100px;
      height: 120px;
      margin: 0 -20px;
    }
    
    .container:hover .glass {
      margin: 0 10px;
    }
  }
`;

export default FrontendCard;
