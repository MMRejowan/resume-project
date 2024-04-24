import React from 'react';
import educationData from '../data/educationData.json';

const Education = () => {
    return (
        <div className='education' >
            <h2>Education</h2>
            <ul>
                {educationData.map((education, index) => (
                    <li key={index}>
                        <h3>{education.degree}</h3>
                        <p>{education.institution}</p>
                        <p>{education.duration}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Education;