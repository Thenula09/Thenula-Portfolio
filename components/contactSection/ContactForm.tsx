import React, { useState } from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can add the logic to send the email
    console.log('Form data:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <StyledWrapper>
      <div className="contact-grid">
        <div className="contact-form-left">
          <h2 className="form-title">Get In Touch</h2>
          <p className="form-description">Have a project in mind or want to collaborate? I'd love to hear from you.</p>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="form-textarea"
                rows={5}
              />
            </div>
            
            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>

        <div className="contact-form-right">
          <div className="connect-section">
            <h3 className="section-title">Connect With Me</h3>
            <div className="contact-links">
              <a href="mailto:thenulahansaja12@gmail.com" className="contact-link">
                <MdEmail className="contact-icon text-red-500" />
                <span>thenulahansaja12@gmail.com</span>
              </a>
              <a href="https://github.com/Thenula09" target="_blank" rel="noopener noreferrer" className="contact-link">
                <FaGithub className="contact-icon" />
                <span>thenula09</span>
              </a>
              <a href="https://www.linkedin.com/in/thenula-hansaja-317a63301/" target="_blank" rel="noopener noreferrer" className="contact-link">
                <FaLinkedin className="contact-icon text-blue-600" />
                <span>Thenula hansaja</span>
              </a>
              <a href="https://instagram.com/thenula09" target="_blank" rel="noopener noreferrer" className="contact-link">
                <FaInstagram className="contact-icon text-pink-600" />
                <span>thenula09</span>
              </a>
            </div>
          </div>

          <div className="work-together-section">
            <h3 className="section-title">Let's Work Together</h3>
            <p className="section-description">
              I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!
            </p>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .contact-form-left {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 2.5rem;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  .contact-form-right {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .connect-section,
  .work-together-section {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 2rem;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  .form-title {
    color: #fff;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .form-description {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .section-title {
    color: #fff;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .section-description {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    line-height: 1.6;
  }

  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #fff;
    text-decoration: none;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .contact-link:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(100, 200, 255, 0.3);
  }

  .contact-icon {
    font-size: 1.5rem;
    color: #64b5f6;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-label {
    display: block;
    color: #fff;
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  .form-input,
  .form-textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    color: #fff;
    font-size: 1rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .form-input::placeholder,
  .form-textarea::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  .form-input:focus,
  .form-textarea:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 20px rgba(100, 200, 255, 0.3);
  }

  .form-textarea {
    resize: vertical;
    min-height: 120px;
  }

  .submit-btn {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 10px;
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }

  .submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(102, 126, 234, 0.6);
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  }

  .submit-btn:active {
    transform: translateY(0);
  }

  @media (max-width: 1024px) {
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 1rem;
    }

    .form-title {
      font-size: 2rem;
    }
  }

  @media (max-width: 768px) {
    .contact-form-left,
    .connect-section,
    .work-together-section {
      padding: 1.5rem;
    }

    .form-title {
      font-size: 1.8rem;
    }

    .section-title {
      font-size: 1.3rem;
    }
  }
`;

export default ContactForm;
