import React, { useEffect } from 'react';
import MatrixBackground from './MatrixBackground';
import '../styles/TerminalOS.css';

const ASCII_LOGO = `
  ██████╗  ██╗ ██████╗ ███████╗
 ██╔═████╗███║██╔═══██╗██╔════╝
 ██║██╔██║╚██║██║   ██║███████╗
 ████╔╝██║ ██║██║   ██║╚════██║
 ╚██████╔╝ ██║╚██████╔╝███████║
  ╚═════╝  ╚═╝ ╚═════╝ ╚══════╝
`;

const Bootloader = ({ onBoot }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['Enter', ' ', 'b', 'B'].includes(e.key)) {
        e.preventDefault();
        onBoot();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBoot]);

  return (
    <div className="bootloader-wrapper">
      <MatrixBackground />

      <div className="bootloader-card">
        <div className="bootloader-card-header">
          <span className="bootloader-led blink-green"></span>
          <span className="bootloader-card-title">01OS BOOTLOADER v1.0.0 [x86_64 WASM Core]</span>
        </div>

        <pre className="bootloader-ascii-art">{ASCII_LOGO}</pre>

        <div className="bootloader-info">
          <p className="bootloader-candidate">
            <strong>CANDIDATE:</strong> Mushtaq Mohd Rejowan
          </p>
          <p className="bootloader-role">
            <strong>PROFILE:</strong> QA Engineer II | SDET | Automotive & Embedded Systems
          </p>
          <p className="bootloader-desc">
            This portfolio is built as an interactive C / WebAssembly terminal operating system.
            Explore work experiences at Vantage Circle, test automation frameworks, projects, and skills
            navigated exclusively via <strong>Arrow Keys</strong> and <strong>Enter</strong> with live background C kernel logs.
          </p>
        </div>

        <button className="bootloader-launch-btn" onClick={onBoot} autoFocus>
          [ ⚡ BOOT 01OS (EXECUTE KERNEL) ]
        </button>

        <div className="bootloader-hint">
          <span>Press <strong>[ENTER]</strong>, <strong>[SPACE]</strong>, or <strong>[B]</strong> to launch</span>
        </div>
      </div>
    </div>
  );
};

export default Bootloader;
