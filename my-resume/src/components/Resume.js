import React, { useState } from 'react';
import Header from './Header';
import Overview from './Overview';
import Education from './Education';
import WorkExperience from './WorkExperience';
import Skills from './Skills';
import Projects from './Projects';
import MatrixBackground from './MatrixBackground';
import ScrambleText from './ScrambleText';

const Resume = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const [hoveredTab, setHoveredTab] = useState(null);

    const tabs = ['Home', 'Experience', 'Skills', 'Projects', 'Education'];

    const renderContent = () => {
        switch (activeTab) {
            case 'Home':
                return (
                    <>
                        <Header />
                        <Overview />
                    </>
                );
            case 'Experience':
                return <WorkExperience />;
            case 'Skills':
                return <Skills />;
            case 'Projects':
                return <Projects />;
            case 'Education':
                return <Education />;
            default:
                return <Overview />;
        }
    };

    return (
        <div className="resume-container">
            <MatrixBackground />
            
            <nav className="matrix-nav">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`nav-item ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                        onMouseEnter={() => setHoveredTab(tab)}
                        onMouseLeave={() => setHoveredTab(null)}
                    >
                        [<ScrambleText 
                            text={tab.toUpperCase()} 
                            isHovered={hoveredTab === tab} 
                            isActive={activeTab === tab}
                        />]
                    </button>
                ))}
            </nav>

            <main className="main-content">
                {renderContent()}
            </main>

            <footer>
                <p>© {new Date().getFullYear()} Mushtaq Mohd Rejowan. ALL RIGHTS RESERVED.</p>
                <p>CONNECTION STABLE // SYSTEM ONLINE</p>
            </footer>
        </div>
    );
}

export default Resume;
