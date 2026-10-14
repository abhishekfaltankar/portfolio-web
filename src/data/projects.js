/**
 * Featured Projects Configuration
 * Exactly 3 verified primary projects based on authentic repository evidence.
 * No fabricated metrics, testimonials, or inflated claims.
 */

export const featuredProjects = [
  {
    id: "multimodal-deepfake-detection",
    title: "Multimodal Deepfake Detection System",
    tagline: "Explainable multi-class video forensic framework with frame-level and audio analysis",
    category: "Computer Vision & Applied AI",
    year: "2026",
    statusBadge: "Visual Pipeline Evaluated • Streamlit Deployed",
    githubUrl: "https://github.com/abhishekfaltankar/Multimodal-Deepfake-Detection",
    liveUrl: null, // Headless CLI & Local Streamlit dashboard
    technologies: [
      "PyTorch",
      "YOLOv8",
      "ResNet18",
      "Wav2Vec2",
      "OpenCV",
      "Streamlit",
      "Scikit-learn"
    ],
    summary:
      "A forensic video classification pipeline that categorizes video media into 6 granular categories (real, AI-generated video, faceswap, Face2Face facial editing, voiceclone, and audio-video fake). Provides an explainable forensic report with confidence tiers and forensic evidence breakdown.",
    implementationHighlights: [
      "Face localization and margin-expanded bounding cropping via ultralytics YOLOv8 (yolov8n-face)",
      "Fine-tuned 6-class ResNet18 classifier with class-imbalance mitigated by WeightedRandomSampler",
      "Dual interface: headless batch CLI tool (detect_social_video.py) and interactive Streamlit web dashboard (app/streamlit_app.py)",
      "Explainable forensic report generation summarizing category probabilities, risk levels, and visual markers"
    ],
    caseStudy: {
      problem:
        "Modern deepfakes encompass distinct modalities — subtle face swaps, synthetic voices, and full video generation. Standard binary 'real vs fake' detectors output a single probability score that gives security analysts zero insight into which modality was manipulated or why a video was flagged.",
      whatWasBuilt:
        "An end-to-end multi-class forensic architecture. The system ingests social-media video, extracts key frames, crops faces with YOLOv8, routes facial crops into a fine-tuned ResNet18 classifier, and prepares audio tracks for spectral feature extraction. An automated report generator synthesizes confidence levels into a downloadable forensic brief.",
      architecture: [
        "Ingestion: OpenCV extracts video frames at uniform intervals.",
        "Face Detection: YOLOv8 face detector localizes face regions with bounding box padding to capture edge artifacts.",
        "Visual Model: ResNet18 backbones trained on FaceForensics++ benchmark data with WeightedRandomSampler to prevent majority-class bias.",
        "Audio Branch (In Progress): Wav2Vec2 audio feature extractor trained on synthetic voice datasets.",
        "Interface: Streamlit web dashboard providing visual frame playback, confidence breakdown charts, and forensic PDF summaries."
      ],
      technicalDecisions: [
        "Chose ResNet18 over larger ViT architectures for the primary inference engine to maintain real-time throughput on standard consumer GPUs without sacrificing baseline accuracy.",
        "Implemented WeightedRandomSampler rather than standard oversampling to prevent overfitting on manipulated face-swap samples.",
        "Separated the inference core from the UI so batch processing can be run directly via CLI."
      ],
      challenges: [
        "Cross-dataset generalization gap: The model achieves 95% validation accuracy on benchmark datasets (FaceForensics++), but faces reduced confidence on highly compressed, in-the-wild mobile video formats.",
        "Class imbalance across different synthetic generation methods necessitated careful loss weighting and sampling adjustments."
      ],
      nextSteps: [
        "Incorporate Deepfake Detection Challenge (DFDC) and in-the-wild mobile datasets to improve real-world compression resilience.",
        "Complete production wiring of the Wav2Vec2 audio-visual fusion head into the active Streamlit inference loop."
      ]
    }
  },
  {
    id: "factory-pulse",
    title: "FactoryPulse: Industrial Telemetry & Predictive Maintenance",
    tagline: "Real-time IIoT telemetry streaming, physics-derived feature engineering, and dual-head failure forecasting",
    category: "Industrial IoT & Machine Learning",
    year: "2026",
    statusBadge: "FastAPI REST Core • Held-Out Test Set Verified",
    githubUrl: "https://github.com/abhishekfaltankar/FactoryPulse",
    liveUrl: null, // Backend API & Local Dashboard
    technologies: [
      "Python",
      "FastAPI",
      "Scikit-learn",
      "SQLAlchemy",
      "PostgreSQL",
      "Chart.js",
      "Physics Feature Engineering"
    ],
    summary:
      "An industrial predictive maintenance platform engineered to prevent catastrophic factory equipment failure. Features physics-based anomaly detection, a dual-head Balanced Random Forest classification pipeline, real-time alert triage, and high-performance FastAPI endpoints.",
    implementationHighlights: [
      "Dual-head ML pipeline: Binary failure probability alongside multi-class classification for specific failure modes (HDF, PWF, OSF, TWF, RNF)",
      "Physics-derived feature transformations (thermal gradients, power curves, torque-wear products)",
      "Strict data ingestion engine enforcing physical bounds and flagging sensor inversion anomalies",
      "RESTful API with dynamic machine health scoring (0-100%) and automated work-order dispatch triggers"
    ],
    caseStudy: {
      problem:
        "Unplanned equipment downtime costs industrial manufacturing plants tens of thousands of dollars per hour. Traditional preventative maintenance relies on arbitrary calendar schedules or noisy single-sensor alarms that produce false positives and fail to identify root causes.",
      whatWasBuilt:
        "A full-stack predictive maintenance system built on the industry-standard AI4I 2020 Predictive Maintenance Dataset. The platform validates raw telemetry in real-time, extracts physical relationships, predicts both failure likelihood and specific failure mode, and provides plant operators with live telemetry charts and work order logs.",
      architecture: [
        "Data Layer: Normalized SQLAlchemy relational schema managing machine registry, telemetry logs, ML inference history, and alert states.",
        "Validation Engine: Rigorous boundary checks detecting out-of-range thermal sensors and inverted temperature differentials.",
        "ML Engine: Balanced Random Forest pipeline with joblib serialization, scoring 93.7% accuracy and 0.9884 ROC-AUC on held-out test splits.",
        "API Layer: FastAPI endpoints with CORS, asynchronous endpoints, and threshold-based alert triggers (Warning ≥ 0.40, Critical ≥ 0.70).",
        "Frontend: Dark-mode telemetry dashboard rendering live charts with Chart.js."
      ],
      technicalDecisions: [
        "Engineered physics-based interaction terms (P = torque × angular velocity; Delta_T = air temp - process temp) which significantly improved multi-class recall compared to raw sensor values.",
        "Used Balanced Random Forest to directly counter the severe real-world class imbalance of industrial machine failures (typically <4% of samples)."
      ],
      challenges: [
        "Handling multi-label and rare failure modes such as Random Failure (RNF) and Tool Wear Failure (TWF) where historical occurrences are minimal.",
        "Balancing real-time API latency requirements against complex feature calculation pipelines."
      ],
      nextSteps: [
        "Simulate live MQTT/Kafka streaming queues for high-frequency sensor streams from multiple factory lines.",
        "Deploy containerized microservices via Docker."
      ]
    }
  },
  {
    id: "age-calculator-app",
    title: "Interactive Date Validation & Age Calculator",
    tagline: "Precise client-side calendar mathematics and accessible form controls",
    category: "Frontend Web Engineering",
    year: "2026",
    statusBadge: "Live on Vercel • Deployed",
    githubUrl: "https://github.com/abhishekfaltankar/age-calculator-app",
    liveUrl: "https://age-calculator-app-nu-lilac.vercel.app",
    technologies: [
      "JavaScript (ES6+)",
      "Semantic HTML5",
      "CSS3 (Flexbox/Grid)",
      "Vercel Deployment",
      "Accessible Forms"
    ],
    summary:
      "A client-side web application handling edge-case calendar mathematics (leap years, month length variations, and future date boundaries). Built with zero runtime external libraries, featuring fluid responsive design, accessible field feedback, and smooth animated numerical readouts.",
    implementationHighlights: [
      "Custom calendar algorithm correctly computing exact years, months, and days without external date libraries",
      "Granular input validation for non-existent dates (e.g., February 31, April 31) with field-level ARIA error messaging",
      "Smooth animated numerical transitions when calculating output values",
      "Responsive layout tested across mobile (320px) to ultra-wide desktop displays"
    ],
    caseStudy: {
      problem:
        "Calculating elapsed human age accurately in days, months, and years requires navigating calendar quirks: variable month lengths (28, 29, 30, 31 days), leap-year calculations, and varying days in preceding months. Most naive solutions introduce off-by-one errors or crash on boundary conditions.",
      whatWasBuilt:
        "A lightweight, dependency-free interactive application created as a Frontend Mentor challenge. The app validates day, month, and year inputs in real-time, displays explicit error messages for empty fields, impossible calendar days, or dates in the future, and outputs the exact duration with an animated transition.",
      architecture: [
        "Input Handler: Validates numerical ranges, handles keydown restrictions, and prevents submission of blank or future dates.",
        "Date Engine: Computes exact delta by borrowing days according to the specific month of the previous cycle.",
        "DOM & Accessibility: Uses semantic <form>, <fieldset>, <label>, and aria-live announcements for screen readers.",
        "Deployment: Continuous deployment workflow configured via Vercel."
      ],
      technicalDecisions: [
        "Avoided heavyweight libraries like Moment.js or date-fns in favor of pure vanilla JavaScript date calculations to keep the bundle footprint below 15KB.",
        "Structured validation logic as pure functions to allow straightforward unit testing of edge cases."
      ],
      challenges: [
        "Correctly borrowing days when the preceding month has 28 vs 31 days during year/month transitions.",
        "Ensuring mobile touch targets remain comfortable on compact mobile screens."
      ],
      nextSteps: [
        "Add a date-difference mode (calculating duration between any two arbitrary historical dates).",
        "Refactor into a reusable React component package."
      ]
    }
  }
];

/**
 * Optional project inventory for easy swapping or expansion
 */
export const secondaryProjects = [
  {
    id: "enterprise-retail-intelligence-platform",
    title: "Enterprise Retail Intelligence Platform",
    tagline: "End-to-end retail sales analytics, customer churn prediction, and business intelligence",
    category: "Data Engineering & Analytics",
    year: "2026",
    githubUrl: "https://github.com/abhishekfaltankar/enterprise-retail-intelligence-platform",
    technologies: ["Python", "SQL", "PostgreSQL", "Power BI", "FastAPI", "Streamlit"],
    summary: "AI-driven retail intelligence system covering SQL queries, sales forecasting, customer segmentation, and Power BI dashboards."
  },
  {
    id: "gdp-project-india",
    title: "India GDP Trends & Economic Analysis",
    tagline: "Exploratory data analysis of macroeconomic indicators in India",
    category: "Data Science & Analysis",
    year: "2026",
    githubUrl: "https://github.com/abhishekfaltankar/gdp-project-india",
    liveUrl: "https://gdp-project-india.vercel.app",
    technologies: ["Python", "Jupyter Notebook", "Pandas", "Matplotlib", "Vercel"],
    summary: "Data-driven investigation of GDP growth, sector contributions, and macroeconomic indicators with interactive visualizations."
  }
];
