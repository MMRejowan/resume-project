import React, { useState, useEffect, useRef } from 'react';
import { osEngine, KEYS, SCREENS } from '../c-os/resume_engine';
import '../styles/TerminalOS.css';

const ASCII_BANNER = `
  ██████╗  ██╗ ██████╗ ███████╗
 ██╔═████╗███║██╔═══██╗██╔════╝
 ██║██╔██║╚██║██║   ██║███████╗
 ████╔╝██║ ██║██║   ██║╚════██║
 ╚██████╔╝ ██║╚██████╔╝███████║
  ╚═════╝  ╚═╝ ╚═════╝ ╚══════╝
 [ 01OS KERNEL v1.0.0 // BINARY C-WASM ENGINE ]
`;

const TerminalOS = ({ onReboot }) => {
  const [booting, setBooting] = useState(true);
  const [bootLogs, setBootLogs] = useState([]);
  const [frame, setFrame] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [kernelLogs, setKernelLogs] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [autoScroll, setAutoScroll] = useState(true);

  const logsEndRef = useRef(null);
  const terminalRef = useRef(null);

  // Boot sequence effect
  useEffect(() => {
    osEngine.reset();
    setFrame(osEngine.getFrame());

    const logs = [
      '01OS BIOS ROM v2.4 (C) 2026 REJOWAN SYSTEMS',
      'CPU: x86_64 WASM Core @ 3.40 GHz | 8 Virtual Cores Detected',
      'RAM: 640KB BASE CONVENTIONAL OK // 16384KB EXTENDED OK',
      'DEVICE: Keyboard Controller [Standard 101/102-Key or PS/2] ... READY',
      'DEVICE: Audio Synthesizer (WebAudio 8-Bit DAC) ... INITIALIZED',
      'MOUNT: /dev/c_kernel -> [src/c-os/resume_os.c] ... MOUNTED (RO)',
      'EXEC: Loading C Data Structures (Candidate: Mushtaq Mohd Rejowan) ... OK',
      'MODULE: Playwright, SDET, Embedded CAN/UDS Drivers ... LOADED',
      'SYSTEM: Launching 01OS Terminal UI Engine v1.0.0 ...'
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        const nextLog = logs[currentLogIndex];
        setBootLogs(prev => [...prev, nextLog]);
        osEngine.playTone(300 + currentLogIndex * 60, 'square', 0.03);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setBooting(false);
          osEngine.playBootSound();
          osEngine.addLog('KERNEL_BOOT', '01OS runtime loop started. Waiting for keyboard interrupts.');
        }, 400);
      }
    }, 110);

    return () => clearInterval(interval);
  }, []);

  // Periodic heartbeat log simulation
  useEffect(() => {
    if (booting) return;
    const interval = setInterval(() => {
      const msgs = [
        'poll_event_queue() ... 0 pending IRQ',
        'heap_verify() ... 0 leaks, 640KB intact',
        'cpu_tick() ... sys_clock syncd (1000Hz)',
        'vram_refresh() ... 80x25 character matrix OK'
      ];
      const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
      osEngine.addLog('IDLE_TICK', randomMsg);
    }, 4500);
    return () => clearInterval(interval);
  }, [booting]);

  // Sync state & logs with engine
  useEffect(() => {
    const unsubState = osEngine.subscribe(() => {
      setFrame(osEngine.getFrame());
    });

    const unsubLogs = osEngine.subscribeLogs((logs) => {
      setKernelLogs([...logs]);
    });

    return () => {
      unsubState();
      unsubLogs();
    };
  }, []);

  // Auto scroll logs
  useEffect(() => {
    if (autoScroll && logsEndRef.current && typeof logsEndRef.current.scrollIntoView === 'function') {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [kernelLogs, autoScroll]);

  // Global keyboard listener
  useEffect(() => {
    if (booting) return;

    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        osEngine.sendKey(KEYS.UP);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        osEngine.sendKey(KEYS.DOWN);
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        osEngine.sendKey(KEYS.LEFT);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        osEngine.sendKey(KEYS.RIGHT);
      } else if (e.key === 'Enter') {
        if (osEngine.currentScreen === SCREENS.SHUTDOWN) {
          if (onReboot) onReboot();
          else osEngine.reset();
        } else {
          osEngine.sendKey(KEYS.ENTER);
        }
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        if (osEngine.currentScreen === SCREENS.MAIN_MENU) {
          if (onReboot) onReboot();
        } else {
          osEngine.sendKey(KEYS.ESC);
        }
      } else if (e.key === 'h' || e.key === 'H') {
        osEngine.sendKey(KEYS.HELP);
      } else if (e.key === 'm' || e.key === 'M') {
        const state = osEngine.toggleSound();
        setSoundEnabled(state);
      } else if (e.key === 'q' || e.key === 'Q') {
        if (onReboot) onReboot();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [booting, onReboot]);

  const handleKeyClick = (key) => {
    if (key === KEYS.ENTER && osEngine.currentScreen === SCREENS.SHUTDOWN) {
      if (onReboot) onReboot();
      else osEngine.reset();
      return;
    }
    if (key === KEYS.ESC && osEngine.currentScreen === SCREENS.MAIN_MENU) {
      if (onReboot) onReboot();
      return;
    }
    osEngine.sendKey(key);
  };

  const handleSoundToggle = () => {
    const state = osEngine.toggleSound();
    setSoundEnabled(state);
  };

  const filteredLogs = kernelLogs.filter((log) => {
    if (filter === 'ALL') return true;
    if (filter === 'EVENTS') return ['C_EVENT', 'STATE_CHG', 'SCREEN_NAV'].includes(log.tag);
    if (filter === 'MEMORY') return ['MEM_ALLOC', 'MEM_READ', 'DATA_INIT'].includes(log.tag);
    if (filter === 'SYSCALL') return ['SYSCALL', 'C_CALL', 'KERNEL_BOOT'].includes(log.tag);
    return true;
  });

  return (
    <div className="os-workspace-wrapper">
      {/* Background CRT ambient grid */}
      <div className="os-ambient-grid"></div>

      {/* Main Dual-Pane OS Frame */}
      <div className="os-dual-pane-container">
        
        {/* ================= LEFT PANE: 01OS CRT MONITOR ================= */}
        <div className="os-terminal-pane">
          <div className="crt-monitor-container">
            <div className="crt-scanlines"></div>
            <div className="crt-glow"></div>

            {/* Top Bar */}
            <div className="os-top-bar">
              <div className="os-branding">
                <span className="os-led blink-green"></span>
                <span className="os-title">01OS v1.0.0 // C-WASM ENGINE</span>
              </div>
              <div className="os-top-controls">
                <button className="os-btn-sound" onClick={handleSoundToggle} title="Toggle Sound (M)">
                  {soundEnabled ? '🔊 AUDIO [ON]' : '🔇 AUDIO [OFF]'}
                </button>
                <button className="os-btn-exit" onClick={onReboot} title="Reboot OS (Q / ESC)">
                  ⟳ REBOOT [ESC]
                </button>
              </div>
            </div>

            {/* Screen Content Viewport */}
            <div className="terminal-viewport" ref={terminalRef}>
              {booting ? (
                <div className="bios-boot-screen">
                  <pre className="bios-ascii-banner">{ASCII_BANNER}</pre>
                  <div className="bios-log-container">
                    {bootLogs.map((log, idx) => (
                      <div key={idx} className="bios-log-line">
                        <span className="log-arrow">&gt;&gt;</span> {log}
                      </div>
                    ))}
                    <div className="bios-cursor">_</div>
                  </div>
                </div>
              ) : (
                <pre className="terminal-frame-content">{frame}</pre>
              )}
            </div>

            {/* Bottom Controls Bar */}
            <div className="os-bottom-bar">
              <div className="os-shortcuts-hint">
                <span>[↑/↓] Navigate</span>
                <span>[ENTER] Execute</span>
                <span>[←/ESC] Back</span>
                <span>[H] Help</span>
                <span>[M] Mute</span>
              </div>

              <div className="virtual-dpad">
                <button className="dpad-btn dpad-up" onClick={() => handleKeyClick(KEYS.UP)} title="Up (↑)">▲</button>
                <div className="dpad-middle-row">
                  <button className="dpad-btn dpad-left" onClick={() => handleKeyClick(KEYS.LEFT)} title="Left/Back (←)">◄</button>
                  <button className="dpad-btn dpad-enter" onClick={() => handleKeyClick(KEYS.ENTER)} title="Enter (↵)">ENTER</button>
                  <button className="dpad-btn dpad-right" onClick={() => handleKeyClick(KEYS.RIGHT)} title="Right (►)">►</button>
                </div>
                <button className="dpad-btn dpad-down" onClick={() => handleKeyClick(KEYS.DOWN)} title="Down (↓)">▼</button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT PANE: LIVE C KERNEL TRACER ================= */}
        <div className="os-tracer-pane">
          <div className="tracer-container">
            <div className="tracer-header">
              <div className="tracer-title-group">
                <span className="tracer-icon">⚙</span>
                <span className="tracer-title">C KERNEL RUNTIME TRACER</span>
              </div>
              <span className="tracer-badge">PID: 1 [resume_os.c]</span>
            </div>

            {/* CPU & Memory Registers HUD */}
            <div className="tracer-hud">
              <div className="hud-metric">
                <span className="hud-label">STACK_PTR</span>
                <span className="hud-val">0x7FFD5A80</span>
              </div>
              <div className="hud-metric">
                <span className="hud-label">HEAP_ALLOC</span>
                <span className="hud-val">640 KB</span>
              </div>
              <div className="hud-metric">
                <span className="hud-label">ACTIVE_SCREEN</span>
                <span className="hud-val">0x0{osEngine.currentScreen}</span>
              </div>
              <div className="hud-metric">
                <span className="hud-label">CYCLES</span>
                <span className="hud-val">0x{osEngine.cycleCount.toString(16).toUpperCase()}</span>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="tracer-filter-bar">
              {['ALL', 'EVENTS', 'MEMORY', 'SYSCALL'].map((f) => (
                <button
                  key={f}
                  className={'filter-btn ' + (filter === f ? 'active' : '')}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
              <button
                className={'filter-btn autoscroll-btn ' + (autoScroll ? 'active' : '')}
                onClick={() => setAutoScroll(!autoScroll)}
              >
                {autoScroll ? '● AUTO' : '○ PAUSED'}
              </button>
            </div>

            {/* Live Log Stream */}
            <div className="tracer-log-stream">
              {filteredLogs.map((log) => (
                <div key={log.id} className="tracer-log-entry">
                  <span className="log-time">{log.time}</span>
                  <span className="log-cycles">[{log.cycles}]</span>
                  <span className={'log-tag tag-' + log.tag.toLowerCase()}>{log.tag}</span>
                  <span className="log-msg">{log.message}</span>
                  {log.meta && <span className="log-meta">{' // ' + log.meta}</span>}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>

            {/* Tracer Footer */}
            <div className="tracer-footer">
              <span>WASM INTERFACE: os_send_key() | os_get_frame()</span>
              <span>STATE: SYNCD</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TerminalOS;
