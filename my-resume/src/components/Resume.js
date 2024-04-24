// src/components/Resume.js
import React from 'react';
import Header from './Header';
import Overview from './Overview';
import Education from './Education';
import WorkExperience from './WorkExperience';
import Skills from './Skills';
import Projects from './Projects';

const Resume = () => {
    return (
        <div>
            <Header />
            <Overview />
            <Education />
            <WorkExperience />
            <Skills />
            <Projects />
        </div>
    );
}

export default Resume;
