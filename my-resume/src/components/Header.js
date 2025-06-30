// src/components/Header.js
import React, { useState } from 'react';

const Header = () => {
    const [imageError, setImageError] = useState(false);
    
    const handleImageError = () => {
        setImageError(true);
    };
    
    return (
        <div className="header">
            <div className="header-grid">
                <div className="profile-photo">
                    <div className="photo-placeholder">
                        {imageError ? (
                            <span className="initials">MMR</span>
                        ) : (
                            <img 
                                src="https://media.licdn.com/dms/image/D5603AQFT0jZ6yAlWUQ/profile-displayphoto-shrink_800_800/0/1707149318349?e=1716422400&v=beta&t=rYGH-5Ru7nCYIaQ5tJ-oIXj2WVzL3PXgmI8H24HuoBI" 
                                alt="Mushtaq Mohd Rejowan" 
                                className="profile-image"
                                onError={handleImageError}
                            />
                        )}
                    </div>
                </div>
                <div className="header-content">
                    <h1 className="name">Mushtaq Mohd Rejowan</h1>
                    <h2 className="title">QA Engineer II</h2>
                    
                    <div className="contact-grid">
                        <div className="contact-item">
                            <i className="contact-icon phone-icon"></i>
                            <a href="tel:+919365652065">+91 9365652065</a>
                        </div>
                        <div className="contact-item">
                            <i className="contact-icon email-icon"></i>
                            <a href="mailto:mushtaq.mdrizwan@gmail.com">mushtaq.mdrizwan@gmail.com</a>
                        </div>
                        <div className="contact-item">
                            <i className="contact-icon location-icon"></i>
                            <span>Guwahati, Assam, India</span>
                        </div>
                    </div>
                    
                    <div className="social-links">
                        <a href="https://www.linkedin.com/in/mmrejowan" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                            <svg className="social-icon linkedin-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M7.738,17L7.738,17 c-0.697,0-1.262-0.565-1.262-1.262v-4.477C6.477,10.565,7.042,10,7.738,10h0C8.435,10,9,10.565,9,11.262v4.477 C9,16.435,8.435,17,7.738,17z M7.694,8.717c-0.771,0-1.286-0.514-1.286-1.2s0.514-1.2,1.371-1.2c0.771,0,1.286,0.514,1.286,1.2 S8.551,8.717,7.694,8.717z M16.779,17L16.779,17c-0.674,0-1.221-0.547-1.221-1.221v-2.605c0-1.058-0.651-1.174-0.895-1.174 s-1.058,0.035-1.058,1.174v2.605c0,0.674-0.547,1.221-1.221,1.221h-0.081c-0.674,0-1.221-0.547-1.221-1.221v-4.517 c0-0.697,0.565-1.262,1.262-1.262h0c0.697,0,1.262,0.565,1.262,1.262c0,0,0.282-1.262,2.198-1.262C17.023,10,18,10.977,18,13.174 v2.605C18,16.453,17.453,17,16.779,17z"></path>
                            </svg>
                        </a>
                        <a href="https://github.com/MMRejowan" target="_blank" rel="noopener noreferrer" className="social-link github">
                            <svg className="social-icon github-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="header-summary">
                <p>Seasoned QA Engineer II specializing in automation and test framework architecture. Expert in implementing end-to-end testing solutions with Selenium, JavaScript, Python, and Java. Experienced in optimizing CI/CD pipelines using Jenkins and GitHub Actions for continuous quality assurance. Successfully reduced regression testing time by 70% and enhanced test coverage by 45% through strategic automation initiatives. Passionate about delivering high-quality software through data-driven testing approaches and comprehensive quality metrics.</p>
            </div>
        </div>
    );
}

export default Header;
