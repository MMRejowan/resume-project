import React from 'react';

const Overview = () => {
    const metrics = [
        { label: 'REGRESSION_TIME', value: '-70%', status: 'OPTIMIZED' },
        { label: 'MANUAL_EFFORT', value: '-45%', status: 'REDUCED' },
        { label: 'TEST_COVERAGE', value: '85%', status: 'STABLE' },
        { label: 'SYSTEM_UPTIME', value: '99.9%', status: 'OPERATIONAL' }
    ];

    return (
        <div className="overview">
            <h2>[MISSION_PROFILE]</h2>
            <div className="metrics-dashboard">
                {metrics.map((m, i) => (
                    <div key={i} className="metric-tile">
                        <span className="metric-label">{m.label}</span>
                        <span className="metric-value">{m.value}</span>
                        <span className="metric-status">>> {m.status}</span>
                    </div>
                ))}
            </div>

            <div className="mission-text">
                <p>
                    <span className="text-accent">> OBJECTIVE:</span> Seasoned QA Engineer II specializing in automation and test framework architecture. 
                    Implementing end-to-end testing solutions with a focus on high-scale HR tech platforms.
                </p>
                <p>
                    <span className="text-accent">> EXPERTISE:</span> Advanced proficiency in building robust test frameworks using Selenium, 
                    JavaScript, Python, and Java. Expert in API testing and CI/CD integration.
                </p>
                <p>
                    <span className="text-accent">> CURRENT_STATUS:</span> Driving quality engineering initiatives at Vantage Circle, 
                    mentoring junior engineers, and optimizing release pipelines for high-profile global clients.
                </p>
            </div>
        </div>
    );
}

export default Overview;
