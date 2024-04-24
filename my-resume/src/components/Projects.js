// src/components/Projects.js
import React from 'react';
import projectsData from '../data/projectsData.json';

const Projects = () => {
    return (
        <div className='projects' >
            <h2>Projects</h2>
            {projectsData.map((project, index) => (
                <div key={index}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <p>Technologies used: {project.technologies.join(', ')}</p>
                    <p>Project link: <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a></p>
                </div>
            ))}
        </div>
    );
}

export default Projects;
