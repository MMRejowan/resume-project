import React, { useEffect, useRef } from 'react';
import educationData from '../data/educationData.json';

// Function to get icon based on degree
const getDegreeIcon = (degree) => {
    const lowerDegree = degree.toLowerCase();
    
    if (lowerDegree.includes('bachelor')) {
        return '🎓';
    } else if (lowerDegree.includes('master') || lowerDegree.includes('phd')) {
        return '📚';
    } else if (lowerDegree.includes('certification') || lowerDegree.includes('certificate')) {
        return '🏆';
    } else if (lowerDegree.includes('secondary') || lowerDegree.includes('high school')) {
        return '🏫';
    } else if (lowerDegree.includes('matriculation')) {
        return '📝';
    } else {
        return '📜';
    }
};

// Function to get card color based on degree type
const getDegreeColor = (degree) => {
    const lowerDegree = degree.toLowerCase();
    
    if (lowerDegree.includes('bachelor')) {
        return '#3b82f6'; // Blue
    } else if (lowerDegree.includes('master') || lowerDegree.includes('phd')) {
        return '#8b5cf6'; // Purple
    } else if (lowerDegree.includes('certification') || lowerDegree.includes('certificate')) {
        return '#10b981'; // Green
    } else if (lowerDegree.includes('secondary')) {
        return '#f59e0b'; // Amber
    } else if (lowerDegree.includes('matriculation')) {
        return '#6366f1'; // Indigo
    } else {
        return '#ec4899'; // Pink
    }
};

// Function to render certifications if available
const renderCertifications = (certifications) => {
    if (!certifications || certifications.length === 0) return null;
    
    return (
        <div className="certification-list">
            {certifications.map((cert, index) => (
                <div key={index} className="certification-item">
                    <span className="certification-icon">✓</span>
                    <span className="certification-name">{cert}</span>
                </div>
            ))}
        </div>
    );
};

const Education = () => {
    const cardRefs = useRef([]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('education-card-visible');
                }
            });
        }, observerOptions);

        cardRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => {
            cardRefs.current.forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    return (
        <div className='education'>
            <h2>Education & Certifications</h2>
            <div className="education-grid">
                {educationData.map((education, index) => {
                    const icon = getDegreeIcon(education.degree);
                    const color = getDegreeColor(education.degree);
                    
                    return (
                        <div 
                            key={index} 
                            className="education-card"
                            ref={el => cardRefs.current[index] = el}
                            style={{
                                animationDelay: `${index * 0.15}s`,
                                borderTop: `3px solid ${color}`
                            }}
                        >
                            <div className="degree-icon-container" style={{ backgroundColor: color }}>
                                <span className="degree-icon">{icon}</span>
                            </div>
                            
                            <h3 className="degree-title">{education.degree}</h3>
                            <p className="institution-name">{education.institution}</p>
                            
                            <div className="education-details">
                                <span className="duration">
                                    <i className="duration-icon"></i>
                                    {education.duration}
                                </span>
                                
                                {education.gpa && (
                                    <span className="gpa">
                                        <i className="gpa-icon"></i>
                                        GPA: {education.gpa}
                                    </span>
                                )}
                            </div>
                            
                            {education.achievements && (
                                <div className="achievements">
                                    <span className="achievements-label">Achievements:</span>
                                    <p className="achievements-text">{education.achievements}</p>
                                </div>
                            )}
                            
                            {education.relevantCoursework && (
                                <div className="coursework">
                                    <span className="coursework-label">Relevant Coursework:</span>
                                    <p className="coursework-text">{education.relevantCoursework}</p>
                                </div>
                            )}
                            
                            {renderCertifications(education.certifications)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Education;
