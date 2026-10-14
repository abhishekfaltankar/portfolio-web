/**
 * Skills & Technologies Inventory
 * Honest, evidence-backed capabilities based on verified project repositories.
 * No arbitrary percentages, expert claims, or progress bars.
 */

export const skillCategories = [
  {
    id: "languages",
    title: "Programming Languages",
    description: "Core languages used across machine learning models, data queries, and web applications.",
    skills: [
      { name: "Python", context: "PyTorch, FastAPI, data pipelines, model training" },
      { name: "SQL", context: "PostgreSQL queries, schema normalization, analytical joins" },
      { name: "JavaScript (ES6+)", context: "Modern DOM APIs, component state, asynchronous fetch" },
      { name: "HTML5 & CSS3", context: "Semantic layout, responsive design, CSS Grid & Flexbox" },
      { name: "Java", context: "Object-oriented programming, data structures & algorithms" }
    ]
  },
  {
    id: "data-ai",
    title: "Data, Machine Learning & AI",
    description: "Libraries and frameworks applied in computer vision and predictive maintenance projects.",
    skills: [
      { name: "PyTorch", context: "ResNet18 fine-tuning, loss functions, custom training loops" },
      { name: "OpenCV", context: "Video frame extraction, image preprocessing, facial ROI crops" },
      { name: "YOLOv8", context: "Object & face detection pipelines (ultralytics)" },
      { name: "Scikit-Learn", context: "Balanced Random Forest, evaluation metrics (ROC-AUC, F1)" },
      { name: "Pandas & NumPy", context: "Feature engineering, data cleaning, matrix transformations" },
      { name: "Transformers (Hugging Face)", context: "Wav2Vec2 exploration for audio forensics" }
    ]
  },
  {
    id: "web-backend",
    title: "Web & Backend Development",
    description: "Frameworks for building interactive user interfaces and serving predictive models.",
    skills: [
      { name: "React", context: "Component architecture, hooks, state management" },
      { name: "FastAPI", context: "RESTful endpoints, asynchronous handlers, Pydantic schemas" },
      { name: "Streamlit", context: "Rapid analytical dashboards and forensic reporting web tools" },
      { name: "Tailwind CSS", context: "Design token implementation, responsive styling, dark mode" },
      { name: "SQLAlchemy", context: "Relational database ORM modeling and migrations" }
    ]
  },
  {
    id: "tools",
    title: "Developer Tools & Workflow",
    description: "Tooling for version control, automated testing, containerization, and deployment.",
    skills: [
      { name: "Git & GitHub", context: "Version control, branch management, collaborative workflows" },
      { name: "VS Code", context: "Primary development environment and debugging" },
      { name: "Vercel", context: "Continuous deployment for web applications" },
      { name: "Postman", context: "API endpoint testing and payload inspection" },
      { name: "Jupyter Notebooks", context: "Exploratory data analysis and model prototyping" }
    ]
  }
];
