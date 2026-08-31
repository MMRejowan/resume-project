/*
 * ============================================================================
 *  01OS v1.0.0 - Mushtaq Mohd Rejowan Interactive Resume OS (C / WebAssembly)
 *  Architecture : x86_64-wasm / Pure ANSI C
 *  Navigation   : Arrow Keys [UP / DOWN / LEFT / RIGHT] + ENTER
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define SCREEN_WIDTH 78
#define MAX_BUFFER_SIZE 8192

/* Key Codes */
#define KEY_NONE   0
#define KEY_UP     1
#define KEY_DOWN   2
#define KEY_LEFT   3
#define KEY_RIGHT  4
#define KEY_ENTER  5
#define KEY_ESC    6
#define KEY_HELP   7

/* OS Screens */
typedef enum {
    SCREEN_BOOT = 0,
    SCREEN_MAIN_MENU,
    SCREEN_OVERVIEW,
    SCREEN_EXPERIENCE,
    SCREEN_PROJECTS,
    SCREEN_SKILLS,
    SCREEN_EDUCATION,
    SCREEN_C_SOURCE,
    SCREEN_HELP,
    SCREEN_SHUTDOWN
} OSScreen;

/* Data Structures */
typedef struct {
    const char* position;
    const char* company;
    const char* duration;
    const char* location;
    const char* bullets[6];
} ExperienceItem;

typedef struct {
    const char* title;
    const char* category;
    const char* stack;
    const char* description;
    const char* link;
} ProjectItem;

typedef struct {
    const char* category;
    const char* skills[8];
} SkillCategory;

typedef struct {
    const char* degree;
    const char* institution;
    const char* duration;
    const char* detail;
} EducationItem;

/* Global OS State */
static OSScreen current_screen = SCREEN_MAIN_MENU;
static int main_menu_index = 0;
static int sub_item_index = 0;
static int detail_scroll_index = 0;
static char frame_buffer[MAX_BUFFER_SIZE];

/* Static Resume Data */
static const char* main_menu_options[] = {
    "[01] SYSTEM OVERVIEW     :: Candidate Profile, Mission & Bio",
    "[02] WORK EXPERIENCE     :: Vantage Circle QA Roles & Timeline (4 yrs)",
    "[03] PROJECTS DIRECTORY  :: Test Automation, CI/CD & DevOps Repos",
    "[04] SKILLS MATRIX       :: Playwright, Python, C/C++, Embedded & QA",
    "[05] EDUCATION & CERTS   :: B.Tech CSE, AI Agents & Cloud Credentials",
    "[06] VIEW 01OS C SOURCE  :: Explore the C / WebAssembly Kernel Code",
    "[07] SYSTEM SHUTDOWN     :: Exit 01OS and return to Web Interface"
};
static const int MAIN_MENU_COUNT = 7;

static const ExperienceItem experiences[] = {
    {
        "QA Engineer II",
        "Vantage Circle",
        "May 2025 - Present (1 yr 4 mos)",
        "Guwahati, Assam, India",
        {
            "Owned end-to-end test strategy for core modules, aligning with Agile sprints.",
            "Led migration from Selenium (Mocha + JS) to Playwright (65%+ coverage).",
            "Built API automation with Playwright APIRequestContext for UI & backend flows.",
            "Integrated automation into CI/CD pipelines via Jenkins & GitHub Actions.",
            "Applied AI-assisted automation to generate test cases by analyzing DOM structures.",
            "Conducted performance testing using Artillery, validating system scalability."
        }
    },
    {
        "QA Engineer - I",
        "Vantage Circle",
        "June 2024 - May 2025 (1 yr)",
        "Assam, India",
        {
            "Collaborated with enterprise clients: Tata Motors, Wipro, Bangalore Airport, HDFC.",
            "Developed automated test scripts using Selenium (Java/JS), Python (Pytest), Cypress.",
            "Conducted UAT and database validation using MySQL for data integrity.",
            "Monitored system performance using Grafana and Prometheus to identify bottlenecks.",
            "Executed functional, regression, and cross-browser testing across multiple platforms.",
            "Maintained version control and CI/CD pipelines with Git and Jenkins."
        }
    },
    {
        "Associate Test Engineer",
        "Vantage Circle",
        "November 2022 - June 2024 (1 yr 8 mos)",
        "Guwahati, Assam",
        {
            "Conducted UAT/E2E testing for Hyundai Capital Canada, L&T, Inmobi, Bluestar.",
            "Designed test plans and test cases aligned with product requirements.",
            "Executed manual & automated tests on BrowserStack, LambdaTest, Zephyr Squad.",
            "Utilized JIRA for defect tracking, log analysis, and root cause reporting.",
            "Collaborated with cross-functional teams to accelerate defect resolution.",
            "Enhanced test strategies with best practices for defect lifecycle management."
        }
    },
    {
        "Test Engineer Intern",
        "Vantage Circle",
        "July 2022 - October 2022 (4 mos)",
        "Guwahati, Assam",
        {
            "Gained hands-on experience in Functional, UI/UX, Blackbox & Regression testing.",
            "Utilized MySQL to validate front-end data against database tables.",
            "Conducted testing on Employee Engagement product with redemption features.",
            "Practiced SDLC processes and Agile methodologies in a production environment.",
            NULL, NULL
        }
    }
};
static const int EXPERIENCE_COUNT = 4;

static const ProjectItem projects[] = {
    {
        "Employee Recognition Platform Test Automation",
        "QA Engineering",
        "Playwright, TypeScript, Selenium, Mocha, Jenkins, CI/CD",
        "Automated testing framework achieving 85% coverage and reducing regression by 70%.",
        "https://github.com/MMRejowan/automation-framework"
    },
    {
        "Performance Monitoring System for HR Apps",
        "DevOps & Monitoring",
        "Prometheus, Grafana, Docker, Python, JMeter, Artillery",
        "Full metrics dashboard tracking response times and system load, improving speed by 40%.",
        "https://github.com/MMRejowan/performance-monitoring"
    },
    {
        "Automotive ECU Simulation & Validation Suite",
        "Embedded & Automotive",
        "C / C++, Python, CAN Bus, UDS Protocol, PyTest",
        "Hardware-in-the-loop (HIL) test harness simulating ECU signals and automotive diagnostic services.",
        "https://github.com/MMRejowan"
    },
    {
        "Employee Survey Platform Test Suite",
        "QA Engineering",
        "Selenium WebDriver, Python, PyTest, SQL, REST APIs",
        "Automated validation test suite reducing manual effort by 60% with dynamic data generation.",
        "https://github.com/MMRejowan/survey-testing-framework"
    },
    {
        "Cross-Platform Mobile App Automation",
        "Mobile Testing",
        "Appium, Java, TestNG, Docker, Allure Reports",
        "Page Object Model mobile testing solution for Android & iOS with CI/CD integration.",
        "https://github.com/MMRejowan/mobile-app-testing"
    },
    {
        "Microservices API Testing Framework",
        "API Testing",
        "Playwright APIRequestContext, Postman, JavaScript, Jenkins",
        "Comprehensive API validation suite with parameterized requests, reducing API test time by 75%.",
        "https://github.com/MMRejowan/api-testing-framework"
    },
    {
        "CI/CD Quality Pipeline for Test Automation",
        "DevOps & QA",
        "Jenkins, GitHub Actions, Docker, Selenium Grid",
        "Continuous automated test pipeline with smart test selection and automated defect reporting.",
        "https://github.com/MMRejowan/ci-test-pipeline"
    }
};
static const int PROJECT_COUNT = 7;

static const SkillCategory skill_categories[] = {
    {
        "Testing & Quality Engineering",
        { "Playwright (Expert)", "Selenium WebDriver (Expert)", "AI-Assisted Automation", "Artillery (Performance)", "API Testing (APIRequestContext)", "UAT & System Testing", "Mobile Testing (Appium)", NULL }
    },
    {
        "Languages & Systems",
        { "TypeScript (Advanced)", "JavaScript (ES6+ Expert)", "Python (Advanced)", "C / C++ (Advanced)", "Java (Advanced)", "SQL (Advanced)", "HTML5 / CSS3", NULL }
    },
    {
        "Automotive & Embedded",
        { "ECU Simulation & Validation", "CAN / UDS Protocols", "Python Hardware Automation", "Embedded Software QA", NULL }
    },
    {
        "DevOps, Tools & Infrastructure",
        { "GitHub Actions", "Jenkins CI/CD", "Docker", "Git / GitHub", "Prometheus & Grafana", "JIRA & Zephyr Squad", "BrowserStack / LambdaTest", NULL }
    },
    {
        "Databases & Methodologies",
        { "MySQL", "MongoDB", "Data Integrity Validation", "Test Architecture", "Agile / Scrum", "Code Reviews & Mentoring", NULL }
    }
};
static const int SKILL_CATEGORY_COUNT = 5;

static const EducationItem educations[] = {
    {
        "B.Tech in Computer Science and Engineering",
        "Kaziranga University, Assam",
        "August 2018 - May 2022 | GPA: 3.8/4.0",
        "Dean's List for Academic Excellence (3 Semesters)"
    },
    {
        "Professional Certifications",
        "Industry Credentials",
        "2022 - 2025",
        "AI Agents Fundamentals, Software Engineer Certificate, MySQL Mastery, Selenium Pytest, SQL Advanced"
    },
    {
        "Higher Secondary (Science)",
        "B. Borooah College, Guwahati",
        "August 2016 - June 2018 | Score: 85%",
        "Mathematics Excellence Award, Science Club President"
    },
    {
        "Matriculation",
        "Don Bosco School Mangaldoi",
        "January 2015 - June 2016 | Score: 92%",
        "School Merit Scholarship, 1st position in Computer Science"
    }
};
static const int EDUCATION_COUNT = 4;

/* Forward Declarations */
void os_init(void);
void os_send_key(int key_code);
const char* os_get_frame(void);
int os_get_active_screen(void);
int os_get_selected_index(void);

void os_init(void) {
    current_screen = SCREEN_MAIN_MENU;
    main_menu_index = 0;
    sub_item_index = 0;
    detail_scroll_index = 0;
    memset(frame_buffer, 0, sizeof(frame_buffer));
}

int os_get_active_screen(void) {
    return (int)current_screen;
}

int os_get_selected_index(void) {
    return main_menu_index;
}

void os_send_key(int key_code) {
    switch (current_screen) {
        case SCREEN_MAIN_MENU:
            if (key_code == KEY_UP) {
                main_menu_index = (main_menu_index > 0) ? main_menu_index - 1 : MAIN_MENU_COUNT - 1;
            } else if (key_code == KEY_DOWN) {
                main_menu_index = (main_menu_index + 1) % MAIN_MENU_COUNT;
            } else if (key_code == KEY_ENTER) {
                sub_item_index = 0;
                detail_scroll_index = 0;
                switch (main_menu_index) {
                    case 0: current_screen = SCREEN_OVERVIEW; break;
                    case 1: current_screen = SCREEN_EXPERIENCE; break;
                    case 2: current_screen = SCREEN_PROJECTS; break;
                    case 3: current_screen = SCREEN_SKILLS; break;
                    case 4: current_screen = SCREEN_EDUCATION; break;
                    case 5: current_screen = SCREEN_C_SOURCE; break;
                    case 6: current_screen = SCREEN_SHUTDOWN; break;
                }
            } else if (key_code == KEY_HELP) {
                current_screen = SCREEN_HELP;
            }
            break;

        case SCREEN_EXPERIENCE:
            if (key_code == KEY_UP) {
                sub_item_index = (sub_item_index > 0) ? sub_item_index - 1 : EXPERIENCE_COUNT - 1;
            } else if (key_code == KEY_DOWN) {
                sub_item_index = (sub_item_index + 1) % EXPERIENCE_COUNT;
            } else if (key_code == KEY_LEFT || key_code == KEY_ESC) {
                current_screen = SCREEN_MAIN_MENU;
            }
            break;

        case SCREEN_PROJECTS:
            if (key_code == KEY_UP) {
                sub_item_index = (sub_item_index > 0) ? sub_item_index - 1 : PROJECT_COUNT - 1;
            } else if (key_code == KEY_DOWN) {
                sub_item_index = (sub_item_index + 1) % PROJECT_COUNT;
            } else if (key_code == KEY_LEFT || key_code == KEY_ESC) {
                current_screen = SCREEN_MAIN_MENU;
            }
            break;

        case SCREEN_SKILLS:
            if (key_code == KEY_UP) {
                sub_item_index = (sub_item_index > 0) ? sub_item_index - 1 : SKILL_CATEGORY_COUNT - 1;
            } else if (key_code == KEY_DOWN) {
                sub_item_index = (sub_item_index + 1) % SKILL_CATEGORY_COUNT;
            } else if (key_code == KEY_LEFT || key_code == KEY_ESC) {
                current_screen = SCREEN_MAIN_MENU;
            }
            break;

        case SCREEN_EDUCATION:
            if (key_code == KEY_UP) {
                sub_item_index = (sub_item_index > 0) ? sub_item_index - 1 : EDUCATION_COUNT - 1;
            } else if (key_code == KEY_DOWN) {
                sub_item_index = (sub_item_index + 1) % EDUCATION_COUNT;
            } else if (key_code == KEY_LEFT || key_code == KEY_ESC) {
                current_screen = SCREEN_MAIN_MENU;
            }
            break;

        case SCREEN_OVERVIEW:
        case SCREEN_C_SOURCE:
        case SCREEN_HELP:
            if (key_code == KEY_LEFT || key_code == KEY_ESC || key_code == KEY_ENTER) {
                current_screen = SCREEN_MAIN_MENU;
            }
            break;

        case SCREEN_SHUTDOWN:
            if (key_code == KEY_ESC || key_code == KEY_LEFT) {
                current_screen = SCREEN_MAIN_MENU;
            }
            break;

        default:
            break;
    }
}

const char* os_get_frame(void) {
    char temp[MAX_BUFFER_SIZE];
    frame_buffer[0] = '\0';

    /* Header */
    strcat(frame_buffer, "+============================================================================+\n");
    strcat(frame_buffer, "|  01OS v1.0.0 [x86_64 WASM Core]                SYSTEM STATUS: ACTIVE (OK) |\n");
    strcat(frame_buffer, "|  CANDIDATE: Mushtaq Mohd Rejowan               ROLE: QA Engineer II / SDET |\n");
    strcat(frame_buffer, "+============================================================================+\n\n");

    switch (current_screen) {
        case SCREEN_MAIN_MENU: {
            strcat(frame_buffer, "  MAIN MENU // SELECT MODULE WITH [UP/DOWN] AND PRESS [ENTER]:\n");
            strcat(frame_buffer, "  --------------------------------------------------------------------------\n\n");
            for (int i = 0; i < MAIN_MENU_COUNT; i++) {
                if (i == main_menu_index) {
                    snprintf(temp, sizeof(temp), "   >>> %s <<<\n\n", main_menu_options[i]);
                } else {
                    snprintf(temp, sizeof(temp), "       %s\n\n", main_menu_options[i]);
                }
                strcat(frame_buffer, temp);
            }
            strcat(frame_buffer, "  --------------------------------------------------------------------------\n");
            strcat(frame_buffer, "  CONTROLS: [UP/DOWN] Navigate  |  [ENTER] Execute  |  [H] Help  |  [ESC] Exit\n");
            break;
        }

        case SCREEN_OVERVIEW: {
            strcat(frame_buffer, "  [01] SYSTEM OVERVIEW & CANDIDATE SUMMARY\n");
            strcat(frame_buffer, "  --------------------------------------------------------------------------\n");
            strcat(frame_buffer, "  NAME     : Mushtaq Mohd Rejowan\n");
            strcat(frame_buffer, "  LOCATION : Guwahati, Assam, India\n");
            strcat(frame_buffer, "  EMAIL    : mushtaq.mdrizwan@gmail.com   |   TEL: +91 9365652065\n");
            strcat(frame_buffer, "  GITHUB   : github.com/MMRejowan         |   LINKEDIN: in/mmrejowan\n\n");
            strcat(frame_buffer, "  PROFILE SUMMARY:\n");
            strcat(frame_buffer, "  Software Quality Engineer / SDET with 4+ years of experience building test\n");
            strcat(frame_buffer, "  automation, API validation, and quality engineering solutions for enterprise\n");
            strcat(frame_buffer, "  production systems. Core expertise in Playwright, Selenium, TypeScript,\n");
            strcat(frame_buffer, "  JavaScript, Python, Docker, CI/CD (Jenkins, GitHub Actions), and Artillery.\n\n");
            strcat(frame_buffer, "  EXPANDING FOCUS:\n");
            strcat(frame_buffer, "  Active development in Automotive & Embedded Software (ECU simulation,\n");
            strcat(frame_buffer, "  CAN / UDS protocols, and Python hardware validation test suites).\n\n");
            strcat(frame_buffer, "  METRICS SUMMARY:\n");
            strcat(frame_buffer, "  * Regression Cycle Time  : -70% Reduction\n");
            strcat(frame_buffer, "  * Automation Test Coverage: 85% System Coverage\n");
            strcat(frame_buffer, "  * Manual Effort Reduction : -45% via Smart Scripting\n");
            strcat(frame_buffer, "  * System Reliability     : 99.9% Production Uptime\n");
            strcat(frame_buffer, "  --------------------------------------------------------------------------\n");
            strcat(frame_buffer, "  [ENTER / ESC / LEFT] Return to Main Menu\n");
            break;
        }

        case SCREEN_EXPERIENCE: {
            strcat(frame_buffer, "  [02] WORK EXPERIENCE // VANTAGE CIRCLE (4 YEARS 2 MONTHS)\n");
            strcat(frame_buffer, "  --------------------------------------------------------------------------\n");
            strcat(frame_buffer, "  SELECT ROLE USING [UP/DOWN]:\n\n");
            for (int i = 0; i < EXPERIENCE_COUNT; i++) {
                if (i == sub_item_index) {
                    snprintf(temp, sizeof(temp), "   [*] %-24s | %s\n", experiences[i].position, experiences[i].duration);
                } else {
                    snprintf(temp, sizeof(temp), "   [ ] %-24s | %s\n", experiences[i].position, experiences[i].duration);
                }
                strcat(frame_buffer, temp);
            }
            strcat(frame_buffer, "\n  ROLE HIGHLIGHTS:\n");
            strcat(frame_buffer, "  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
            const ExperienceItem* exp = &experiences[sub_item_index];
            for (int j = 0; j < 6; j++) {
                if (exp->bullets[j] != NULL) {
                    snprintf(temp, sizeof(temp), "   -> %s\n", exp->bullets[j]);
                    strcat(frame_buffer, temp);
                }
            }
            strcat(frame_buffer, "  --------------------------------------------------------------------------\n");
            strcat(frame_buffer, "  [UP/DOWN] Switch Role  |  [ESC / LEFT] Return to Main Menu\n");
            break;
        }

        case SCREEN_PROJECTS: {
            strcat(frame_buffer, "  [03] PROJECTS DIRECTORY // REPOSITORIES & ENGINEERING WORK\n");
            strcat(frame_buffer, "  --------------------------------------------------------------------------\n");
            strcat(frame_buffer, "  SELECT PROJECT USING [UP/DOWN]:\n\n");
            for (int i = 0; i < PROJECT_COUNT; i++) {
                if (i == sub_item_index) {
                    snprintf(temp, sizeof(temp), "   [*] [%s] %s\n", projects[i].category, projects[i].title);
                } else {
                    snprintf(temp, sizeof(temp), "   [ ] [%s] %s\n", projects[i].category, projects[i].title);
                }
                strcat(frame_buffer, temp);
            }
            strcat(frame_buffer, "\n  PROJECT SPECIFICATION:\n");
            strcat(frame_buffer, "  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
            const ProjectItem* prj = &projects[sub_item_index];
            snprintf(temp, sizeof(temp), "   STACK       : %s\n   DESCRIPTION : %s\n   REPO LINK   : %s\n",
                     prj->stack, prj->description, prj->link);
            strcat(frame_buffer, temp);
            strcat(frame_buffer, "  --------------------------------------------------------------------------\n");
            strcat(frame_buffer, "  [UP/DOWN] Switch Project  |  [ESC / LEFT] Return to Main Menu\n");
            break;
        }

        case SCREEN_SKILLS: {
            strcat(frame_buffer, "  [04] SKILLS MATRIX & PROFICIENCY LEVELS\n");
            strcat(frame_buffer, "  --------------------------------------------------------------------------\n");
            strcat(frame_buffer, "  SELECT CATEGORY USING [UP/DOWN]:\n\n");
            for (int i = 0; i < SKILL_CATEGORY_COUNT; i++) {
                if (i == sub_item_index) {
                    snprintf(temp, sizeof(temp), "   [*] %s\n", skill_categories[i].category);
                } else {
                    snprintf(temp, sizeof(temp), "   [ ] %s\n", skill_categories[i].category);
                }
                strcat(frame_buffer, temp);
            }
            strcat(frame_buffer, "\n  SKILLS IN SELECTED DOMAIN:\n");
            strcat(frame_buffer, "  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
            const SkillCategory* cat = &skill_categories[sub_item_index];
            for (int j = 0; j < 8; j++) {
                if (cat->skills[j] != NULL) {
                    snprintf(temp, sizeof(temp), "   [OK] %s\n", cat->skills[j]);
                    strcat(frame_buffer, temp);
                }
            }
            strcat(frame_buffer, "  --------------------------------------------------------------------------\n");
            strcat(frame_buffer, "  [UP/DOWN] Switch Category  |  [ESC / LEFT] Return to Main Menu\n");
            break;
        }

        case SCREEN_EDUCATION: {
            strcat(frame_buffer, "  [05] EDUCATION & PROFESSIONAL CERTIFICATIONS\n");
            strcat(frame_buffer, "  --------------------------------------------------------------------------\n");
            strcat(frame_buffer, "  SELECT RECORD USING [UP/DOWN]:\n\n");
            for (int i = 0; i < EDUCATION_COUNT; i++) {
                if (i == sub_item_index) {
                    snprintf(temp, sizeof(temp), "   [*] %s\n", educations[i].degree);
                } else {
                    snprintf(temp, sizeof(temp), "   [ ] %s\n", educations[i].degree);
                }
                strcat(frame_buffer, temp);
            }
            strcat(frame_buffer, "\n  ACADEMIC DETAILS:\n");
            strcat(frame_buffer, "  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
            const EducationItem* edu = &educations[sub_item_index];
            snprintf(temp, sizeof(temp), "   INSTITUTION : %s\n   DURATION    : %s\n   DETAILS     : %s\n",
                     edu->institution, edu->duration, edu->detail);
            strcat(frame_buffer, temp);
            strcat(frame_buffer, "  --------------------------------------------------------------------------\n");
            strcat(frame_buffer, "  [UP/DOWN] Switch Record  |  [ESC / LEFT] Return to Main Menu\n");
            break;
        }

        case SCREEN_C_SOURCE: {
            strcat(frame_buffer, "  [06] 01OS C / WEBASSEMBLY KERNEL ARCHITECTURE\n");
            strcat(frame_buffer, "  --------------------------------------------------------------------------\n");
            strcat(frame_buffer, "  Source File  : src/c-os/resume_os.c\n");
            strcat(frame_buffer, "  Compilation  : emcc resume_os.c -s WASM=1 -O3 -o resume_os.wasm\n");
            strcat(frame_buffer, "  Interface    : os_init(), os_send_key(int key), os_get_frame()\n\n");
            strcat(frame_buffer, "  KERNEL CODE STRUCTURE:\n");
            strcat(frame_buffer, "  ------------------------------------------------------------------\n");
            strcat(frame_buffer, "  typedef enum { SCREEN_MAIN_MENU, SCREEN_EXPERIENCE, ... } OSScreen;\n");
            strcat(frame_buffer, "  void os_send_key(int key_code) {\n");
            strcat(frame_buffer, "      if (key_code == KEY_UP)   navigate_up();\n");
            strcat(frame_buffer, "      if (key_code == KEY_DOWN) navigate_down();\n");
            strcat(frame_buffer, "      if (key_code == KEY_ENTER) execute_selection();\n");
            strcat(frame_buffer, "  }\n");
            strcat(frame_buffer, "  const char* os_get_frame() {\n");
            strcat(frame_buffer, "      // Renders 80x25 character ASCII TUI frame buffer in C memory\n");
            strcat(frame_buffer, "      return frame_buffer;\n");
            strcat(frame_buffer, "  }\n");
            strcat(frame_buffer, "  --------------------------------------------------------------------------\n");
            strcat(frame_buffer, "  [ENTER / ESC / LEFT] Return to Main Menu\n");
            break;
        }

        case SCREEN_HELP: {
            strcat(frame_buffer, "  [HELP & CONTROLS] 01OS OPERATING SYSTEM GUIDE\n");
            strcat(frame_buffer, "  --------------------------------------------------------------------------\n");
            strcat(frame_buffer, "  KEYBOARD NAVIGATION (PHYSICAL & TOUCH D-PAD):\n\n");
            strcat(frame_buffer, "   * [ARROW UP]    : Move selection cursor up\n");
            strcat(frame_buffer, "   * [ARROW DOWN]  : Move selection cursor down\n");
            strcat(frame_buffer, "   * [ARROW LEFT]  : Go back to previous screen\n");
            strcat(frame_buffer, "   * [ENTER]       : Execute selected menu item or open details\n");
            strcat(frame_buffer, "   * [ESC]         : Return to Main Menu / Exit OS\n");
            strcat(frame_buffer, "   * [H]           : Show this help screen\n\n");
            strcat(frame_buffer, "  AUDIO & CONTROLS:\n");
            strcat(frame_buffer, "   * Press [M] to toggle retro keyboard sound synthesizer on/off.\n");
            strcat(frame_buffer, "  --------------------------------------------------------------------------\n");
            strcat(frame_buffer, "  [ENTER / ESC / LEFT] Return to Main Menu\n");
            break;
        }

        case SCREEN_SHUTDOWN: {
            strcat(frame_buffer, "  [07] SYSTEM SHUTDOWN // RETURN TO WEB INTERFACE\n");
            strcat(frame_buffer, "  --------------------------------------------------------------------------\n\n");
            strcat(frame_buffer, "   Are you sure you want to exit 01OS?\n\n");
            strcat(frame_buffer, "   >>> [ENTER] Confirm Shutdown and return to Standard Web Resume <<<\n");
            strcat(frame_buffer, "       [ESC]   Cancel and return to Main Menu\n\n");
            strcat(frame_buffer, "  --------------------------------------------------------------------------\n");
            strcat(frame_buffer, "  [ENTER] Confirm Exit  |  [ESC] Cancel\n");
            break;
        }

        default:
            break;
    }

    return frame_buffer;
}
