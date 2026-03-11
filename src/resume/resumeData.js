// Resume content — EN / UA
const resumeData = {
  header: {
    name: { en: "Anastasia Hnylytska", ua: "Анастасія Гнилицька" },
    title: { en: "DevOps / Platform Engineer", ua: "DevOps / Platform інженер" },
    email: "agnilickaya5@gmail.com",
    telegram: "@anastasi_coco",
    linkedin: "linkedin.com/in/ahnylytska",
    github: "github.com/meisnastia",
    website: "smartbee.me",
    location: { en: "Ukraine", ua: "Україна" },
  },

  summary: {
    en: "DevOps / Platform Engineer with 2+ years of hands-on experience building cloud infrastructure on GCP and Azure. Structured learning (8 GCP badges, 35+ labs) combined with real project work under mentorship — from Terraform modules and CI/CD pipelines to monitoring stacks and AI infrastructure. Focused on understanding systems deeply, not just tools. Interested in AI/ML infrastructure and platform engineering.",
    ua: "DevOps / Platform інженер з 2+ роками практичного досвіду побудови хмарної інфраструктури на GCP та Azure. Структуроване навчання (8 GCP бейджів, 35+ лаб) у поєднанні з реальною проєктною роботою під менторством — від Terraform модулів та CI/CD пайплайнів до моніторинг-стеків та AI-інфраструктури. Фокус на глибокому розумінні систем, а не лише інструментів.",
  },

  experience: [
    {
      title: { en: "DevOps Engineer (Mentorship)", ua: "DevOps інженер (менторство)" },
      company: { en: "Under guidance of a Senior Platform Engineer", ua: "Під керівництвом Senior Platform Engineer" },
      period: { en: "2024 — 2025", ua: "2024 — 2025" },
      bullets: {
        en: [
          "Built CI/CD pipeline for a production AI platform: unit tests → lint → type check → build → native tests (~3 min, fail-fast)",
          "Maintained 900+ test suite across 48 suites with per-module coverage thresholds and regression gates",
          "Conducted 4 rounds of security audits, reducing false positive rate from 36% to under 5%",
          "Set up monitoring: watchdog liveness checks, per-provider latency tracking (TTFT), connection health metrics",
          "Automated multi-stage build pipeline: frontend → native compile → code signing → packaging",
          "Participated in architecture discussions, code reviews, and security audits",
        ],
        ua: [
          "Побудувала CI/CD пайплайн для production AI платформи: тести → lint → type check → build → native tests (~3 хв, fail-fast)",
          "Підтримувала 900+ тестів у 48 suites з coverage thresholds по модулях та regression gates",
          "Провела 4 раунди security audit, знизивши false positive rate з 36% до менше 5%",
          "Налаштувала моніторинг: watchdog liveness checks, per-provider latency tracking (TTFT), метрики з'єднань",
          "Автоматизувала multi-stage build pipeline: frontend → native compile → code signing → packaging",
          "Брала участь в архітектурних обговореннях, код-рев'ю та security аудитах",
        ],
      },
    },
    {
      title: { en: "Cloud Skills Boost Student", ua: "Студент Cloud Skills Boost" },
      company: { en: "Google Cloud Platform", ua: "Google Cloud Platform" },
      period: { en: "Oct 2022 — Present", ua: "Жовт 2022 — теперішній час" },
      bullets: {
        en: [
          "Completed 35+ hands-on labs covering Compute, Networking, GKE, Terraform, CI/CD, Observability",
          "Earned 8 skill badges including Terraform, Kubernetes, DevOps Workflows, Load Balancing",
          "Progressed from basic VM creation to multi-service Kubernetes deployments",
        ],
        ua: [
          "Пройшла 35+ практичних лабораторних: Compute, Networking, GKE, Terraform, CI/CD, Observability",
          "Отримала 8 бейджів: Terraform, Kubernetes, DevOps Workflows, Load Balancing та інші",
          "Прогресувала від створення базових VM до мульти-сервісних Kubernetes деплойментів",
        ],
      },
    },
    {
      title: { en: "Self-Directed Learning", ua: "Самостійне навчання" },
      company: { en: "Microsoft Azure", ua: "Microsoft Azure" },
      period: { en: "Mid 2024 — Present", ua: "Сер 2024 — теперішній час" },
      bullets: {
        en: [
          "Studying Azure fundamentals: VMs, App Service, AKS, Azure DevOps",
          "Exploring Terraform with Azure provider",
          "Preparing for AZ-900 Azure Fundamentals certification",
        ],
        ua: [
          "Вивчаю основи Azure: VMs, App Service, AKS, Azure DevOps",
          "Досліджую Terraform з Azure провайдером",
          "Готуюсь до сертифікації AZ-900 Azure Fundamentals",
        ],
      },
    },
  ],

  education: {
    degree: { en: "Master's Degree in International Relations", ua: "Магістр міжнародних відносин" },
    institution: { en: "Mariupol State University (mu.edu.ua)", ua: "Маріупольський державний університет (mu.edu.ua)" },
    period: "2021 — Feb 2026",
    note: {
      en: "Pivoted to DevOps/Cloud engineering during studies, combining analytical thinking from IR with technical skills",
      ua: "Під час навчання перейшла до DevOps/Cloud інженерії, поєднуючи аналітичне мислення з IR та технічні навички",
    },
  },

  skills: [
    { category: "Cloud", items: "GCP (Compute, GKE, Cloud SQL, IAM, Cloud Run, Firebase), Azure (basics), AWS (concepts)" },
    { category: "IaC", items: "Terraform (modules, remote state, workspaces), Helm (basics), Ansible (basics)" },
    { category: "Containers", items: "Docker (Compose, multi-stage builds), Kubernetes (concepts, kubectl, GKE labs)" },
    { category: "CI/CD", items: "GitHub Actions (workflows, secrets, environments), GitLab CI (basics), ArgoCD (concepts)" },
    { category: "Monitoring", items: "Prometheus, Grafana, Loki, Alertmanager, Cloud Monitoring" },
    { category: "Scripting", items: "Bash, Python (automation), YAML, HCL" },
    { category: "OS & Net", items: "Linux (Ubuntu/Debian), Nginx, DNS/TCP-IP fundamentals" },
  ],

  badges: [
    "Create and Manage Cloud Resources (Oct 2022)",
    "Implement Load Balancing on Compute Engine (May 2023)",
    "Set Up an App Dev Environment on GCP (May 2023)",
    "Build Infrastructure with Terraform on Google Cloud (Jun 2023)",
    "Deploy Kubernetes Applications on Google Cloud (May 2023)",
    "Manage Kubernetes in Google Cloud (Oct 2024)",
    "Get Started with Dataplex (Oct 2024)",
    "Implement DevOps Workflows in Google Cloud (Oct 2024)",
  ],

  languages: {
    en: [
      { name: "Ukrainian", level: "Native" },
      { name: "English", level: "B2 (Upper-Intermediate)" },
    ],
    ua: [
      { name: "Українська", level: "Рідна" },
      { name: "Англійська", level: "B2 (Upper-Intermediate)" },
    ],
  },

  sectionLabels: {
    experience: { en: "Experience", ua: "Досвід" },
    education: { en: "Education", ua: "Освіта" },
    skills: { en: "Technical Skills", ua: "Технічні навички" },
    badges: { en: "GCP Cloud Skills Boost Badges", ua: "GCP Cloud Skills Boost бейджі" },
    languages: { en: "Languages", ua: "Мови" },
  },
};

module.exports = resumeData;
