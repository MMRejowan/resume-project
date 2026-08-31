/**
 * 01OS C / WebAssembly Runtime Engine & Real-Time Kernel Tracer
 * Mushtaq Mohd Rejowan Portfolio OS
 */

// Keycode constants matching resume_os.c
export const KEYS = {
  NONE: 0,
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
  ENTER: 5,
  ESC: 6,
  HELP: 7
};

export const SCREENS = {
  BOOT: 0,
  MAIN_MENU: 1,
  OVERVIEW: 2,
  EXPERIENCE: 3,
  PROJECTS: 4,
  SKILLS: 5,
  EDUCATION: 6,
  C_SOURCE: 7,
  HELP: 8,
  SHUTDOWN: 9
};

const SCREEN_NAMES = [
  'SCREEN_BOOT',
  'SCREEN_MAIN_MENU',
  'SCREEN_OVERVIEW',
  'SCREEN_EXPERIENCE',
  'SCREEN_PROJECTS',
  'SCREEN_SKILLS',
  'SCREEN_EDUCATION',
  'SCREEN_C_SOURCE',
  'SCREEN_HELP',
  'SCREEN_SHUTDOWN'
];

const KEY_NAMES = {
  0: 'KEY_NONE',
  1: 'KEY_UP',
  2: 'KEY_DOWN',
  3: 'KEY_LEFT',
  4: 'KEY_RIGHT',
  5: 'KEY_ENTER',
  6: 'KEY_ESC',
  7: 'KEY_HELP'
};

class ResumeEngine {
  constructor() {
    this.currentScreen = SCREENS.MAIN_MENU;
    this.mainMenuIndex = 0;
    this.subItemIndex = 0;
    this.soundEnabled = true;
    this.audioCtx = null;
    this.listeners = [];
    this.logListeners = [];
    this.kernelLogs = [];
    this.startTime = Date.now();
    this.cycleCount = 1048200;

    this.mainMenuOptions = [
      '[01] SYSTEM OVERVIEW     :: Candidate Profile, Mission & Bio',
      '[02] WORK EXPERIENCE     :: Vantage Circle QA Roles & Timeline (4 yrs)',
      '[03] PROJECTS DIRECTORY  :: Test Automation, CI/CD & DevOps Repos',
      '[04] SKILLS MATRIX       :: Playwright, Python, C/C++, Embedded & QA',
      '[05] EDUCATION & CERTS   :: B.Tech CSE, AI Agents & Cloud Credentials',
      '[06] VIEW 01OS C SOURCE  :: Explore the C / WebAssembly Kernel Code',
      '[07] SYSTEM REBOOT       :: Reset 01OS State & Return to Bootloader'
    ];

    this.experiences = [
      {
        position: 'QA Engineer II',
        company: 'Vantage Circle',
        duration: 'May 2025 - Present (1 yr 4 mos)',
        location: 'Guwahati, Assam, India',
        bullets: [
          'Owned end-to-end test strategy for core modules, aligning with Agile sprints.',
          'Led migration from Selenium (Mocha + JS) to Playwright (65%+ coverage).',
          'Built API automation with Playwright APIRequestContext for UI & backend flows.',
          'Integrated automation into CI/CD pipelines via Jenkins & GitHub Actions.',
          'Applied AI-assisted automation to generate test cases by analyzing DOM structures.',
          'Conducted performance testing using Artillery, validating system scalability.'
        ]
      },
      {
        position: 'QA Engineer - I',
        company: 'Vantage Circle',
        duration: 'June 2024 - May 2025 (1 yr)',
        location: 'Assam, India',
        bullets: [
          'Collaborated with enterprise clients: Tata Motors, Wipro, Bangalore Airport, HDFC.',
          'Developed automated test scripts using Selenium (Java/JS), Python (Pytest), Cypress.',
          'Conducted UAT and database validation using MySQL for data integrity.',
          'Monitored system performance using Grafana and Prometheus to identify bottlenecks.',
          'Executed functional, regression, and cross-browser testing across multiple platforms.',
          'Maintained version control and CI/CD pipelines with Git and Jenkins.'
        ]
      },
      {
        position: 'Associate Test Engineer',
        company: 'Vantage Circle',
        duration: 'November 2022 - June 2024 (1 yr 8 mos)',
        location: 'Guwahati, Assam',
        bullets: [
          'Conducted UAT/E2E testing for Hyundai Capital Canada, L&T, Inmobi, Bluestar.',
          'Designed test plans and test cases aligned with product requirements.',
          'Executed manual & automated tests on BrowserStack, LambdaTest, Zephyr Squad.',
          'Utilized JIRA for defect tracking, log analysis, and root cause reporting.',
          'Collaborated with cross-functional teams to accelerate defect resolution.',
          'Enhanced test strategies with best practices for defect lifecycle management.'
        ]
      },
      {
        position: 'Test Engineer Intern',
        company: 'Vantage Circle',
        duration: 'July 2022 - October 2022 (4 mos)',
        location: 'Guwahati, Assam',
        bullets: [
          'Gained hands-on experience in Functional, UI/UX, Blackbox & Regression testing.',
          'Utilized MySQL to validate front-end data against database tables.',
          'Conducted testing on Employee Engagement product with redemption features.',
          'Practiced SDLC processes and Agile methodologies in a production environment.'
        ]
      }
    ];

    this.projects = [
      {
        title: 'Employee Recognition Platform Test Automation',
        category: 'QA Engineering',
        stack: 'Playwright, TypeScript, Selenium, Mocha, Jenkins, CI/CD',
        description: 'Automated testing framework achieving 85% coverage and reducing regression by 70%.',
        link: 'https://github.com/MMRejowan/automation-framework'
      },
      {
        title: 'Performance Monitoring System for HR Apps',
        category: 'DevOps & Monitoring',
        stack: 'Prometheus, Grafana, Docker, Python, JMeter, Artillery',
        description: 'Full metrics dashboard tracking response times and system load, improving speed by 40%.',
        link: 'https://github.com/MMRejowan/performance-monitoring'
      },
      {
        title: 'Automotive ECU Simulation & Validation Suite',
        category: 'Embedded & Automotive',
        stack: 'C / C++, Python, CAN Bus, UDS Protocol, PyTest',
        description: 'Hardware-in-the-loop (HIL) test harness simulating ECU signals and automotive diagnostic services.',
        link: 'https://github.com/MMRejowan'
      },
      {
        title: 'Employee Survey Platform Test Suite',
        category: 'QA Engineering',
        stack: 'Selenium WebDriver, Python, PyTest, SQL, REST APIs',
        description: 'Automated validation test suite reducing manual effort by 60% with dynamic data generation.',
        link: 'https://github.com/MMRejowan/survey-testing-framework'
      },
      {
        title: 'Cross-Platform Mobile App Automation',
        category: 'Mobile Testing',
        stack: 'Appium, Java, TestNG, Docker, Allure Reports',
        description: 'Page Object Model mobile testing solution for Android & iOS with CI/CD integration.',
        link: 'https://github.com/MMRejowan/mobile-app-testing'
      },
      {
        title: 'Microservices API Testing Framework',
        category: 'API Testing',
        stack: 'Playwright APIRequestContext, Postman, JavaScript, Jenkins',
        description: 'Comprehensive API validation suite with parameterized requests, reducing API test time by 75%.',
        link: 'https://github.com/MMRejowan/api-testing-framework'
      },
      {
        title: 'CI/CD Quality Pipeline for Test Automation',
        category: 'DevOps & QA',
        stack: 'Jenkins, GitHub Actions, Docker, Selenium Grid',
        description: 'Continuous automated test pipeline with smart test selection and automated defect reporting.',
        link: 'https://github.com/MMRejowan/ci-test-pipeline'
      }
    ];

    this.skillCategories = [
      {
        category: 'Testing & Quality Engineering',
        skills: ['Playwright (Expert)', 'Selenium WebDriver (Expert)', 'AI-Assisted Automation', 'Artillery (Performance)', 'API Testing (APIRequestContext)', 'UAT & System Testing', 'Mobile Testing (Appium)']
      },
      {
        category: 'Languages & Systems',
        skills: ['TypeScript (Advanced)', 'JavaScript (ES6+ Expert)', 'Python (Advanced)', 'C / C++ (Advanced)', 'Java (Advanced)', 'SQL (Advanced)', 'HTML5 / CSS3']
      },
      {
        category: 'Automotive & Embedded Systems',
        skills: ['ECU Simulation & Validation', 'CAN / UDS Protocols', 'Python Hardware Automation', 'Embedded Software QA']
      },
      {
        category: 'DevOps, Tools & Infrastructure',
        skills: ['GitHub Actions', 'Jenkins CI/CD', 'Docker', 'Git / GitHub', 'Prometheus & Grafana', 'JIRA & Zephyr Squad', 'BrowserStack / LambdaTest']
      },
      {
        category: 'Databases & Methodologies',
        skills: ['MySQL', 'MongoDB', 'Data Integrity Validation', 'Test Architecture', 'Agile / Scrum', 'Code Reviews & Mentoring']
      }
    ];

    this.educations = [
      {
        degree: 'B.Tech in Computer Science and Engineering',
        institution: 'Kaziranga University, Assam',
        duration: 'August 2018 - May 2022 | GPA: 3.8/4.0',
        detail: "Dean's List for Academic Excellence (3 Semesters)"
      },
      {
        degree: 'Professional Certifications',
        institution: 'Industry Credentials',
        duration: '2022 - 2025',
        detail: 'AI Agents Fundamentals, Software Engineer Certificate, MySQL Mastery, Selenium Pytest, SQL Advanced'
      },
      {
        degree: 'Higher Secondary (Science)',
        institution: 'B. Borooah College, Guwahati',
        duration: 'August 2016 - June 2018 | Score: 85%',
        detail: 'Mathematics Excellence Award, Science Club President'
      },
      {
        degree: 'Matriculation',
        institution: 'Don Bosco School Mangaldoi',
        duration: 'January 2015 - June 2016 | Score: 92%',
        detail: 'School Merit Scholarship, 1st position in Computer Science'
      }
    ];

    this.addLog('SYSTEM', 'Kernel initialized at physical address 0x00400000');
    this.addLog('MEM_ALLOC', 'static char frame_buffer[8192] allocated at 0x00407180');
    this.addLog('DATA_INIT', 'Loaded experiences[] (4 entries), projects[] (7 entries)');
    this.addLog('DATA_INIT', 'Loaded skill_categories[] (5 entries), educations[] (4 entries)');
  }

  getTimestamp() {
    const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(4);
    return '+' + elapsed.padStart(7, '0') + 's';
  }

  addLog(tag, message, meta = '') {
    this.cycleCount += Math.floor(Math.random() * 24) + 8;
    const hexCycles = '0x' + this.cycleCount.toString(16).toUpperCase().padStart(8, '0');
    const logEntry = {
      id: Math.random().toString(36).substr(2, 9),
      time: this.getTimestamp(),
      cycles: hexCycles,
      tag: tag,
      message: message,
      meta: meta
    };

    this.kernelLogs.push(logEntry);
    if (this.kernelLogs.length > 250) {
      this.kernelLogs.shift();
    }
    this.notifyLogs();
  }

  subscribeLogs(fn) {
    this.logListeners.push(fn);
    return () => {
      this.logListeners = this.logListeners.filter(l => l !== fn);
    };
  }

  notifyLogs() {
    this.logListeners.forEach(fn => fn(this.kernelLogs));
  }

  initAudio() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playTone(freq = 440, type = 'square', duration = 0.04) {
    if (!this.soundEnabled) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      // Ignore audio errors
    }
  }

  playBootSound() {
    this.playTone(520, 'square', 0.08);
    setTimeout(() => this.playTone(680, 'square', 0.08), 90);
    setTimeout(() => this.playTone(880, 'square', 0.12), 180);
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.addLog('SYSCALL', 'sys_audio_ctrl(SET_MUTE, ' + (!this.soundEnabled ? '1' : '0') + ') -> OK');
    if (this.soundEnabled) this.playTone(600, 'sine', 0.05);
    return this.soundEnabled;
  }

  reset() {
    this.currentScreen = SCREENS.MAIN_MENU;
    this.mainMenuIndex = 0;
    this.subItemIndex = 0;
    this.addLog('C_CALL', 'os_init() -> State reset to SCREEN_MAIN_MENU (0x01)');
    this.notify();
  }

  subscribe(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn());
  }

  sendKey(keyCode) {
    const keyName = KEY_NAMES[keyCode] || 'UNKNOWN_KEY';
    const oldScreen = SCREEN_NAMES[this.currentScreen];
    
    this.addLog('C_EVENT', 'os_send_key(' + keyName + '=' + keyCode + ') triggered', 'Screen=' + oldScreen);

    switch (this.currentScreen) {
      case SCREENS.MAIN_MENU:
        if (keyCode === KEYS.UP) {
          this.mainMenuIndex = (this.mainMenuIndex > 0) ? this.mainMenuIndex - 1 : this.mainMenuOptions.length - 1;
          this.playTone(500, 'square', 0.03);
          this.addLog('STATE_CHG', 'main_menu_index=' + this.mainMenuIndex + ' (' + this.mainMenuOptions[this.mainMenuIndex].slice(0, 25) + '...)');
        } else if (keyCode === KEYS.DOWN) {
          this.mainMenuIndex = (this.mainMenuIndex + 1) % this.mainMenuOptions.length;
          this.playTone(450, 'square', 0.03);
          this.addLog('STATE_CHG', 'main_menu_index=' + this.mainMenuIndex + ' (' + this.mainMenuOptions[this.mainMenuIndex].slice(0, 25) + '...)');
        } else if (keyCode === KEYS.ENTER) {
          this.subItemIndex = 0;
          this.playTone(750, 'triangle', 0.06);
          switch (this.mainMenuIndex) {
            case 0: this.currentScreen = SCREENS.OVERVIEW; break;
            case 1: this.currentScreen = SCREENS.EXPERIENCE; break;
            case 2: this.currentScreen = SCREENS.PROJECTS; break;
            case 3: this.currentScreen = SCREENS.SKILLS; break;
            case 4: this.currentScreen = SCREENS.EDUCATION; break;
            case 5: this.currentScreen = SCREENS.C_SOURCE; break;
            case 6: this.currentScreen = SCREENS.SHUTDOWN; break;
            default: break;
          }
          this.addLog('SCREEN_NAV', oldScreen + ' -> ' + SCREEN_NAMES[this.currentScreen], 'Allocating sub-frame buffer');
        } else if (keyCode === KEYS.HELP) {
          this.playTone(600, 'sine', 0.04);
          this.currentScreen = SCREENS.HELP;
          this.addLog('SCREEN_NAV', oldScreen + ' -> SCREEN_HELP');
        }
        break;

      case SCREENS.EXPERIENCE:
        if (keyCode === KEYS.UP) {
          this.subItemIndex = (this.subItemIndex > 0) ? this.subItemIndex - 1 : this.experiences.length - 1;
          this.playTone(500, 'square', 0.03);
          this.addLog('MEM_READ', 'Dereferencing &experiences[' + this.subItemIndex + '] (ptr=0x00408A' + (this.subItemIndex * 40).toString(16) + ')');
        } else if (keyCode === KEYS.DOWN) {
          this.subItemIndex = (this.subItemIndex + 1) % this.experiences.length;
          this.playTone(450, 'square', 0.03);
          this.addLog('MEM_READ', 'Dereferencing &experiences[' + this.subItemIndex + '] (ptr=0x00408A' + (this.subItemIndex * 40).toString(16) + ')');
        } else if (keyCode === KEYS.LEFT || keyCode === KEYS.ESC) {
          this.playTone(350, 'square', 0.04);
          this.currentScreen = SCREENS.MAIN_MENU;
          this.addLog('SCREEN_NAV', 'SCREEN_EXPERIENCE -> SCREEN_MAIN_MENU');
        }
        break;

      case SCREENS.PROJECTS:
        if (keyCode === KEYS.UP) {
          this.subItemIndex = (this.subItemIndex > 0) ? this.subItemIndex - 1 : this.projects.length - 1;
          this.playTone(500, 'square', 0.03);
          this.addLog('MEM_READ', 'Dereferencing &projects[' + this.subItemIndex + '] -> ' + this.projects[this.subItemIndex].title.slice(0, 20) + '...');
        } else if (keyCode === KEYS.DOWN) {
          this.subItemIndex = (this.subItemIndex + 1) % this.projects.length;
          this.playTone(450, 'square', 0.03);
          this.addLog('MEM_READ', 'Dereferencing &projects[' + this.subItemIndex + '] -> ' + this.projects[this.subItemIndex].title.slice(0, 20) + '...');
        } else if (keyCode === KEYS.ENTER) {
          const prj = this.projects[this.subItemIndex];
          if (prj && prj.link && typeof window !== 'undefined') {
            this.addLog('SYSCALL', 'sys_exec_browser_open("' + prj.link + '")');
            window.open(prj.link, '_blank');
          }
        } else if (keyCode === KEYS.LEFT || keyCode === KEYS.ESC) {
          this.playTone(350, 'square', 0.04);
          this.currentScreen = SCREENS.MAIN_MENU;
          this.addLog('SCREEN_NAV', 'SCREEN_PROJECTS -> SCREEN_MAIN_MENU');
        }
        break;

      case SCREENS.SKILLS:
        if (keyCode === KEYS.UP) {
          this.subItemIndex = (this.subItemIndex > 0) ? this.subItemIndex - 1 : this.skillCategories.length - 1;
          this.playTone(500, 'square', 0.03);
          this.addLog('MEM_READ', 'Category ptr: &skill_categories[' + this.subItemIndex + '] (' + this.skillCategories[this.subItemIndex].category + ')');
        } else if (keyCode === KEYS.DOWN) {
          this.subItemIndex = (this.subItemIndex + 1) % this.skillCategories.length;
          this.playTone(450, 'square', 0.03);
          this.addLog('MEM_READ', 'Category ptr: &skill_categories[' + this.subItemIndex + '] (' + this.skillCategories[this.subItemIndex].category + ')');
        } else if (keyCode === KEYS.LEFT || keyCode === KEYS.ESC) {
          this.playTone(350, 'square', 0.04);
          this.currentScreen = SCREENS.MAIN_MENU;
          this.addLog('SCREEN_NAV', 'SCREEN_SKILLS -> SCREEN_MAIN_MENU');
        }
        break;

      case SCREENS.EDUCATION:
        if (keyCode === KEYS.UP) {
          this.subItemIndex = (this.subItemIndex > 0) ? this.subItemIndex - 1 : this.educations.length - 1;
          this.playTone(500, 'square', 0.03);
          this.addLog('MEM_READ', 'Edu record ptr: &educations[' + this.subItemIndex + ']');
        } else if (keyCode === KEYS.DOWN) {
          this.subItemIndex = (this.subItemIndex + 1) % this.educations.length;
          this.playTone(450, 'square', 0.03);
          this.addLog('MEM_READ', 'Edu record ptr: &educations[' + this.subItemIndex + ']');
        } else if (keyCode === KEYS.LEFT || keyCode === KEYS.ESC) {
          this.playTone(350, 'square', 0.04);
          this.currentScreen = SCREENS.MAIN_MENU;
          this.addLog('SCREEN_NAV', 'SCREEN_EDUCATION -> SCREEN_MAIN_MENU');
        }
        break;

      case SCREENS.OVERVIEW:
      case SCREENS.C_SOURCE:
      case SCREENS.HELP:
        if (keyCode === KEYS.LEFT || keyCode === KEYS.ESC || keyCode === KEYS.ENTER) {
          this.playTone(350, 'square', 0.04);
          this.currentScreen = SCREENS.MAIN_MENU;
          this.addLog('SCREEN_NAV', oldScreen + ' -> SCREEN_MAIN_MENU');
        }
        break;

      case SCREENS.SHUTDOWN:
        if (keyCode === KEYS.ESC || keyCode === KEYS.LEFT) {
          this.playTone(350, 'square', 0.04);
          this.currentScreen = SCREENS.MAIN_MENU;
          this.addLog('SCREEN_NAV', 'SCREEN_SHUTDOWN -> SCREEN_MAIN_MENU (Shutdown cancelled)');
        }
        break;

      default:
        break;
    }

    this.notify();
  }

  getFrame() {
    let out = '';
    out += '+============================================================================+\n';
    out += '|  01OS v1.0.0 [x86_64 WASM Core]                SYSTEM STATUS: ACTIVE (OK) |\n';
    out += '|  CANDIDATE: Mushtaq Mohd Rejowan               ROLE: QA Engineer II / SDET |\n';
    out += '+============================================================================+\n\n';

    switch (this.currentScreen) {
      case SCREENS.MAIN_MENU:
        out += '  MAIN MENU // SELECT MODULE WITH [UP/DOWN] AND PRESS [ENTER]:\n';
        out += '  --------------------------------------------------------------------------\n\n';
        this.mainMenuOptions.forEach((opt, i) => {
          if (i === this.mainMenuIndex) {
            out += '   >>> ' + opt + ' <<<\n\n';
          } else {
            out += '       ' + opt + '\n\n';
          }
        });
        out += '  --------------------------------------------------------------------------\n';
        out += '  CONTROLS: [UP/DOWN] Navigate  |  [ENTER] Execute  |  [H] Help  |  [ESC] Exit\n';
        break;

      case SCREENS.OVERVIEW:
        out += '  [01] SYSTEM OVERVIEW & CANDIDATE SUMMARY\n';
        out += '  --------------------------------------------------------------------------\n';
        out += '  NAME     : Mushtaq Mohd Rejowan\n';
        out += '  LOCATION : Guwahati, Assam, India\n';
        out += '  EMAIL    : mushtaq.mdrizwan@gmail.com   |   TEL: +91 9365652065\n';
        out += '  GITHUB   : github.com/MMRejowan         |   LINKEDIN: in/mmrejowan\n\n';
        out += '  PROFILE SUMMARY:\n';
        out += '  Software Quality Engineer / SDET with 4+ years of experience building test\n';
        out += '  automation, API validation, and quality engineering solutions for enterprise\n';
        out += '  production systems. Core expertise in Playwright, Selenium, TypeScript,\n';
        out += '  JavaScript, Python, Docker, CI/CD (Jenkins, GitHub Actions), and Artillery.\n\n';
        out += '  EXPANDING FOCUS:\n';
        out += '  Active development in Automotive & Embedded Software (ECU simulation,\n';
        out += '  CAN / UDS protocols, and Python hardware validation test suites).\n\n';
        out += '  METRICS SUMMARY:\n';
        out += '  * Regression Cycle Time  : -70% Reduction\n';
        out += '  * Automation Test Coverage: 85% System Coverage\n';
        out += '  * Manual Effort Reduction : -45% via Smart Scripting\n';
        out += '  * System Reliability     : 99.9% Production Uptime\n';
        out += '  --------------------------------------------------------------------------\n';
        out += '  [ENTER / ESC / LEFT] Return to Main Menu\n';
        break;

      case SCREENS.EXPERIENCE:
        out += '  [02] WORK EXPERIENCE // VANTAGE CIRCLE (4 YEARS 2 MONTHS)\n';
        out += '  --------------------------------------------------------------------------\n';
        out += '  SELECT ROLE USING [UP/DOWN]:\n\n';
        this.experiences.forEach((exp, i) => {
          const paddedPos = exp.position.padEnd(24);
          if (i === this.subItemIndex) {
            out += '   [*] ' + paddedPos + ' | ' + exp.duration + '\n';
          } else {
            out += '   [ ] ' + paddedPos + ' | ' + exp.duration + '\n';
          }
        });
        out += '\n  ROLE HIGHLIGHTS:\n';
        out += '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n';
        const exp = this.experiences[this.subItemIndex];
        if (exp) {
          exp.bullets.forEach(b => {
            out += '   -> ' + b + '\n';
          });
        }
        out += '  --------------------------------------------------------------------------\n';
        out += '  [UP/DOWN] Switch Role  |  [ESC / LEFT] Return to Main Menu\n';
        break;

      case SCREENS.PROJECTS:
        out += '  [03] PROJECTS DIRECTORY // REPOSITORIES & ENGINEERING WORK\n';
        out += '  --------------------------------------------------------------------------\n';
        out += '  SELECT PROJECT USING [UP/DOWN]:\n\n';
        this.projects.forEach((prj, i) => {
          if (i === this.subItemIndex) {
            out += '   [*] [' + prj.category + '] ' + prj.title + '\n';
          } else {
            out += '   [ ] [' + prj.category + '] ' + prj.title + '\n';
          }
        });
        out += '\n  PROJECT SPECIFICATION:\n';
        out += '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n';
        const prj = this.projects[this.subItemIndex];
        if (prj) {
          out += '   STACK       : ' + prj.stack + '\n';
          out += '   DESCRIPTION : ' + prj.description + '\n';
          out += '   REPO LINK   : ' + prj.link + ' (Press ENTER to Open)\n';
        }
        out += '  --------------------------------------------------------------------------\n';
        out += '  [UP/DOWN] Switch Project  |  [ENTER] Open Repo Link  |  [ESC / LEFT] Back\n';
        break;

      case SCREENS.SKILLS:
        out += '  [04] SKILLS MATRIX & PROFICIENCY LEVELS\n';
        out += '  --------------------------------------------------------------------------\n';
        out += '  SELECT CATEGORY USING [UP/DOWN]:\n\n';
        this.skillCategories.forEach((cat, i) => {
          if (i === this.subItemIndex) {
            out += '   [*] ' + cat.category + '\n';
          } else {
            out += '   [ ] ' + cat.category + '\n';
          }
        });
        out += '\n  SKILLS IN SELECTED DOMAIN:\n';
        out += '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n';
        const cat = this.skillCategories[this.subItemIndex];
        if (cat) {
          cat.skills.forEach(s => {
            out += '   [OK] ' + s + '\n';
          });
        }
        out += '  --------------------------------------------------------------------------\n';
        out += '  [UP/DOWN] Switch Category  |  [ESC / LEFT] Return to Main Menu\n';
        break;

      case SCREENS.EDUCATION:
        out += '  [05] EDUCATION & PROFESSIONAL CERTIFICATIONS\n';
        out += '  --------------------------------------------------------------------------\n';
        out += '  SELECT RECORD USING [UP/DOWN]:\n\n';
        this.educations.forEach((edu, i) => {
          if (i === this.subItemIndex) {
            out += '   [*] ' + edu.degree + '\n';
          } else {
            out += '   [ ] ' + edu.degree + '\n';
          }
        });
        out += '\n  ACADEMIC DETAILS:\n';
        out += '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n';
        const edu = this.educations[this.subItemIndex];
        if (edu) {
          out += '   INSTITUTION : ' + edu.institution + '\n';
          out += '   DURATION    : ' + edu.duration + '\n';
          out += '   DETAILS     : ' + edu.detail + '\n';
        }
        out += '  --------------------------------------------------------------------------\n';
        out += '  [UP/DOWN] Switch Record  |  [ESC / LEFT] Return to Main Menu\n';
        break;

      case SCREENS.C_SOURCE:
        out += '  [06] 01OS C / WEBASSEMBLY KERNEL ARCHITECTURE\n';
        out += '  --------------------------------------------------------------------------\n';
        out += '  Source File  : src/c-os/resume_os.c\n';
        out += '  Compilation  : emcc resume_os.c -s WASM=1 -O3 -o resume_os.wasm\n';
        out += '  Interface    : os_init(), os_send_key(int key), os_get_frame()\n\n';
        out += '  KERNEL CODE STRUCTURE:\n';
        out += '  ------------------------------------------------------------------\n';
        out += '  typedef enum { SCREEN_MAIN_MENU, SCREEN_EXPERIENCE, ... } OSScreen;\n';
        out += '  void os_send_key(int key_code) {\n';
        out += '      if (key_code == KEY_UP)   navigate_up();\n';
        out += '      if (key_code == KEY_DOWN) navigate_down();\n';
        out += '      if (key_code == KEY_ENTER) execute_selection();\n';
        out += '  }\n';
        out += '  const char* os_get_frame() {\n';
        out += '      // Renders 80x25 character ASCII TUI frame buffer in C memory\n';
        out += '      return frame_buffer;\n';
        out += '  }\n';
        out += '  --------------------------------------------------------------------------\n';
        out += '  [ENTER / ESC / LEFT] Return to Main Menu\n';
        break;

      case SCREENS.HELP:
        out += '  [HELP & CONTROLS] 01OS OPERATING SYSTEM GUIDE\n';
        out += '  --------------------------------------------------------------------------\n';
        out += '  KEYBOARD NAVIGATION (PHYSICAL & TOUCH D-PAD):\n\n';
        out += '   * [ARROW UP]    : Move selection cursor up\n';
        out += '   * [ARROW DOWN]  : Move selection cursor down\n';
        out += '   * [ARROW LEFT]  : Go back to previous screen\n';
        out += '   * [ENTER]       : Execute selected menu item or open details\n';
        out += '   * [ESC]         : Return to Main Menu / Exit OS\n';
        out += '   * [H]           : Show this help screen\n\n';
        out += '  AUDIO & CONTROLS:\n';
        out += '   * Press [M] to toggle retro keyboard sound synthesizer on/off.\n';
        out += '  --------------------------------------------------------------------------\n';
        out += '  [ENTER / ESC / LEFT] Return to Main Menu\n';
        break;

      case SCREENS.SHUTDOWN:
        out += '  [07] SYSTEM REBOOT // RESET 01OS ENVIRONMENT\n';
        out += '  --------------------------------------------------------------------------\n\n';
        out += '   Do you wish to reboot 01OS and return to the BIOS bootloader?\n\n';
        out += '   >>> [ENTER] Confirm Reboot <<<\n';
        out += '       [ESC]   Cancel and return to Main Menu\n\n';
        out += '  --------------------------------------------------------------------------\n';
        out += '  [ENTER] Reboot 01OS  |  [ESC] Cancel\n';
        break;

      default:
        break;
    }

    return out;
  }
}

export const osEngine = new ResumeEngine();
