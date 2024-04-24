// src/components/WorkExperience.js
import React from 'react';
import workExperienceData from '../data/workExperienceData.json';

const WorkExperience = () => {
    return (
        <div className="container">
            <div className="card">
                <h2>Work Experience</h2>
                <div className="timeline">
                    {workExperienceData.map((experience, index) => (
                        <div key={index} className="timeline-item">
                            <div className="timeline-content">
                                <h3>{experience.position}</h3>
                                <p>{experience.company}</p>
                                <p>{experience.duration}</p>
                                <p>{experience.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WorkExperience;
