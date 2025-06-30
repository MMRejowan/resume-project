// src/components/WorkExperience.js
import React, { useEffect, useRef } from 'react';
import workExperienceData from '../data/workExperienceData.json';

// Function to check if a position is current (contains "Present" in duration)
const isCurrentPosition = (duration) => {
    return duration.toLowerCase().includes('present');
};

// Function to get company initials for logo placeholder
const getCompanyInitials = (companyName) => {
    return companyName
        .split(' ')
        .map(word => word[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
};

// Function to parse description with bullet points
const formatDescription = (description) => {
    if (!description) return [];
    return description.split('\n').filter(item => item.trim() !== '');
};

const WorkExperience = () => {
    const timelineRefs = useRef([]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('timeline-item-visible');
                }
            });
        }, observerOptions);

        timelineRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => {
            timelineRefs.current.forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    return (
        <div className="work-experience">
            <h2>Work Experience</h2>
            <div className="timeline">
                {workExperienceData.map((experience, index) => {
                    const isCurrent = isCurrentPosition(experience.duration);
                    const companyInitials = getCompanyInitials(experience.company);
                    const descriptionItems = formatDescription(experience.description);
                    
                    return (
                        <div 
                            key={index} 
                            className={`timeline-item ${isCurrent ? 'current-position' : ''}`}
                            ref={el => timelineRefs.current[index] = el}
                            style={{animationDelay: `${index * 0.2}s`}}
                        >
                            <div className="timeline-dot">
                                {isCurrent && <div className="pulse"></div>}
                            </div>
                            
                            <div className="timeline-content">
                                <div className="timeline-header">
                                    <div className="company-logo">
                                        <span>{companyInitials}</span>
                                    </div>
                                    <div className="timeline-header-text">
                                        <h3>{experience.position}</h3>
                                        <div className="company-info">
                                            <span className="company-name">{experience.company}</span>
                                            <span className="duration">
                                                <i className="duration-icon"></i>
                                                {experience.duration}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="timeline-description">
                                    {descriptionItems.map((item, itemIndex) => (
                                        <div key={itemIndex} className="description-item">
                                            <span className="bullet-point"></span>
                                            <p>{item}</p>
                                        </div>
                                    ))}
                                </div>
                                
                                {isCurrent && (
                                    <div className="current-badge">
                                        Current
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WorkExperience;
