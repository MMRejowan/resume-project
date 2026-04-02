// src/components/Skills.js
import React from 'react';
import skillsData from '../data/skillsData.json';

// Function to get icon based on category name
const getCategoryIcon = (categoryName) => {
    switch(categoryName.toLowerCase()) {
        case 'testing skills':
            return '🧪';
        case 'programming languages':
            return '💻';
        case 'tools & frameworks':
            return '🔧';
        case 'soft skills':
            return '🤝';
        default:
            return '✨';
    }
};

// Function to render proficiency indicator
const ProficiencyIndicator = ({ level }) => {
    return (
        <div className="proficiency-indicator" title={level}>
            <div className="proficiency-bar">
                <div 
                    className="proficiency-fill" 
                    style={{ 
                        width: level === 'Beginner' ? '25%' : 
                               level === 'Intermediate' ? '50%' : 
                               level === 'Advanced' ? '75%' : '100%'
                    }}
                ></div>
            </div>
            <span className="proficiency">{level}</span>
        </div>
    );
};

const Skills = () => {
    return (
        <div className='skills'>
            <h2>Skills & Expertise</h2>
            
            {skillsData.categories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="skills-category">
                    <h3>
                        <span className="category-icon">{getCategoryIcon(category.name)}</span>
                        {category.name}
                    </h3>
                    
                    <div className="skills-list">
                        {category.skills.map((skill, skillIndex) => (
                            <div 
                                key={skillIndex} 
                                className="skill-item"
                                style={{animationDelay: `${skillIndex * 0.1}s`}}
                            >
                                <span className="skill-name">{skill.name}</span>
                                <ProficiencyIndicator level={skill.proficiency} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Skills;
