// src/components/Skills.js
import React from 'react';
import skillsData from '../data/skillsData.json';

const Skills = () => {
    return (
        <div className='skills'>
            <h2>Skills</h2>
            <ul>
                {skillsData.map((skill, index) => (
                    <li key={index}>
                        {skill}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Skills;
