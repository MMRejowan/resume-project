// src/components/Projects.js
import React, { useEffect, useRef } from 'react';
import projectsData from '../data/projectsData.json';

// Function to determine project type based on technologies
const getProjectType = (technologies) => {
    const techLower = technologies.map(tech => tech.toLowerCase());
    
    if (techLower.some(tech => tech.includes('test') || tech.includes('selenium') || tech.includes('cypress') || tech.includes('jest'))) {
        return { type: 'Testing', icon: '🧪', color: '#8b5cf6' };
    } else if (techLower.some(tech => tech.includes('react') || tech.includes('vue') || tech.includes('angular'))) {
        return { type: 'Frontend', icon: '🎨', color: '#3b82f6' };
    } else if (techLower.some(tech => tech.includes('node') || tech.includes('express') || tech.includes('django') || tech.includes('flask'))) {
        return { type: 'Backend', icon: '⚙️', color: '#10b981' };
    } else if (techLower.some(tech => tech.includes('android') || tech.includes('ios') || tech.includes('flutter') || tech.includes('react native'))) {
        return { type: 'Mobile', icon: '📱', color: '#f59e0b' };
    } else if (techLower.some(tech => tech.includes('aws') || tech.includes('azure') || tech.includes('docker') || tech.includes('kubernetes'))) {
        return { type: 'DevOps', icon: '☁️', color: '#6366f1' };
    } else {
        return { type: 'Web', icon: '🌐', color: '#ec4899' };
    }
};

const Projects = () => {
    const projectRefs = useRef([]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('project-visible');
                }
            });
        }, observerOptions);

        // Get current refs to avoid stale closures
        const currentRefs = projectRefs.current.filter(ref => ref);
        
        // Observe all valid refs
        currentRefs.forEach(ref => observer.observe(ref));

        return () => {
            // Clean up by unobserving the same refs
            currentRefs.forEach(ref => observer.unobserve(ref));
        };
    }, []);

    return (
        <div className='projects'>
            <h2>Featured Projects</h2>
            <div className="projects-grid">
                {projectsData.map((project, index) => {
                    const projectType = getProjectType(project.technologies);
                    
                    return (
                        <div 
                            className="project-card" 
                            key={index}
                            ref={el => projectRefs.current[index] = el}
                            style={{
                                animationDelay: `${index * 0.1}s`,
                                borderTop: `3px solid ${projectType.color}`
                            }}
                        >
                            <div className="project-type" style={{ backgroundColor: projectType.color }}>
                                <span className="project-type-icon">{projectType.icon}</span>
                                <span className="project-type-text">{projectType.type}</span>
                            </div>
                            
                            <h3 className="project-title">{project.title}</h3>
                            
                            <p className="project-description">{project.description}</p>
                            
                            <div className="tech-tags">
                                {project.technologies.map((tech, techIndex) => (
                                    <span 
                                        className="tech-tag" 
                                        key={techIndex}
                                        style={{ animationDelay: `${techIndex * 0.05}s` }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            
                            <div className="project-links">
                                <a 
                                    href={project.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="project-link"
                                >
                                    <svg className="link-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19V6.413L11.207 14.207L9.793 12.793L17.585 5H13V3H21Z"/>
                                    </svg>
                                    <span>View Project</span>
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Projects;
