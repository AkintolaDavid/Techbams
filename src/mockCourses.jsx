const coursesData = [
  {
    id: 1,
    title: "React Basics",
    description: "Learn the basics of React from scratch.",
    rating: 4.5,
    lecturer: "John Doe",
    img: "https://via.placeholder.com/150",
    category: "Web Development",
    sections: [
      {
        title: "Introduction",
        description: "Getting started with React.",
        videoUrl: "https://via.placeholder.com/640x360",
        timeline: [
          { time: "00:00", note: "Introduction to the section" },
          { time: "02:30", note: "React overview" },
          { time: "05:00", note: "Project setup" },
        ],
        resources: [
          {
            name: "React Cheat Sheet",
            link: "/resources/react-cheat-sheet.pdf",
          },
          {
            name: "Project Starter Files",
            link: "/resources/project-starter.zip",
          },
        ],
      },
      {
        title: "State and Props",
        description: "Understanding state management and props in React.",
        videoUrl: "https://via.placeholder.com/640x360",
        timeline: [
          { time: "00:00", note: "What are props and state?" },
          { time: "03:15", note: "Examples of props usage" },
        ],
        resources: [
          { name: "StateProps.pdf", link: "/resources/state-props.pdf" },
          { name: "StateProps.pdf", link: "/resources/state-props.pdf" },
          { name: "StateProps.pdf", link: "/resources/state-props.pdf" },
          { name: "StateProps.pdf", link: "/resources/state-props.pdf" },
        ],
      },
      {
        title: "React Hooks",
        description: "Introduction to using hooks in React.",
        videoUrl: "https://via.placeholder.com/640x360",
        timeline: [
          { time: "00:00", note: "What are React hooks?" },
          { time: "04:45", note: "Using useState and useEffect" },
        ],
        resources: [
          { name: "HooksGuide.pdf", link: "/resources/hooks-guide.pdf" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "JavaScript Essentials",
    description: "Master the fundamentals of JavaScript programming.",
    rating: 4.7,
    lecturer: "Jane Smith",
    img: "https://via.placeholder.com/150",
    category: "Programming",
    sections: [
      {
        title: "JavaScript Basics",
        description: "An introduction to JavaScript fundamentals.",
        videoUrl: "https://via.placeholder.com/640x360",
        timeline: [
          { time: "00:00", note: "Introduction to JavaScript" },
          { time: "04:00", note: "Variables and data types" },
        ],
        resources: [
          { name: "Basics.pdf", link: "/resources/javascript-basics.pdf" },
        ],
      },
      {
        title: "Working with Functions",
        description: "Learn how to define and use JavaScript functions.",
        videoUrl: "https://via.placeholder.com/640x360",
        timeline: [
          { time: "00:00", note: "Defining a function" },
          { time: "05:30", note: "Function arguments and return values" },
        ],
        resources: [
          { name: "Functions.pdf", link: "/resources/functions.pdf" },
          { name: "Examples.zip", link: "/resources/examples.zip" },
        ],
      },
      {
        title: "ES6 Features",
        description: "Exploring the new features introduced in ES6.",
        videoUrl: "https://via.placeholder.com/640x360",
        timeline: [
          { time: "00:00", note: "Introduction to ES6" },
          { time: "03:20", note: "Arrow functions and template literals" },
        ],
        resources: [{ name: "ES6Guide.pdf", link: "/resources/es6-guide.pdf" }],
      },
    ],
  },
  {
    id: 3,
    title: "Python for Data Science",
    description: "Learn Python with a focus on Data Science applications.",
    rating: 4.8,
    lecturer: "Alice Johnson",
    img: "https://via.placeholder.com/150",
    category: "Data Science",
    sections: [
      {
        title: "Introduction to Python",
        description: "Basic Python programming concepts.",
        videoUrl: "https://via.placeholder.com/640x360",
        timeline: [
          { time: "00:00", note: "Why learn Python?" },
          { time: "05:00", note: "Basic syntax and data types" },
        ],
        resources: [
          { name: "PythonIntro.pdf", link: "/resources/python-intro.pdf" },
        ],
      },
      {
        title: "Data Analysis with Pandas",
        description: "Using Pandas for data analysis tasks.",
        videoUrl: "https://via.placeholder.com/640x360",
        timeline: [
          { time: "00:00", note: "Setting up Pandas" },
          { time: "07:00", note: "Data manipulation basics" },
        ],
        resources: [
          { name: "PandasGuide.pdf", link: "/resources/pandas-guide.pdf" },
          { name: "Datasets.zip", link: "/resources/datasets.zip" },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    description: "Design user-friendly interfaces and experiences.",
    rating: 4.6,
    lecturer: "Emily Carter",
    img: "https://via.placeholder.com/150",
    category: "Design",
    sections: [
      {
        title: "Introduction to UI/UX",
        description: "Understanding the basics of UI/UX design.",
        videoUrl: "https://via.placeholder.com/640x360",
        timeline: [
          { time: "00:00", note: "What is UI/UX?" },
          { time: "04:20", note: "Design principles" },
        ],
        resources: [
          { name: "UIUXIntro.pdf", link: "/resources/uiux-intro.pdf" },
        ],
      },
      {
        title: "Wireframing Basics",
        description: "Learn how to create wireframes for designs.",
        videoUrl: "https://via.placeholder.com/640x360",
        timeline: [
          { time: "00:00", note: "Tools for wireframing" },
          { time: "03:10", note: "Best practices" },
        ],
        resources: [
          { name: "Wireframing.pdf", link: "/resources/wireframing.pdf" },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "HTML & CSS Fundamentals",
    description: "Build and style beautiful websites with HTML and CSS.",
    rating: 4.3,
    lecturer: "Chris Lee",
    img: "https://via.placeholder.com/150",
    category: "Web Development",
    sections: [
      {
        title: "Getting Started with HTML",
        videoUrl: "https://via.placeholder.com/640x360",
        resources: [{ name: "HTML Basics", link: "/resources/HTMLBasics.pdf" }],
      },
      {
        title: "CSS Styling Techniques",
        videoUrl: "https://via.placeholder.com/640x360",
        resources: [
          { name: "CSS Basics", link: "/resources/CSSBasics.pdf" },
          { name: "Styling Examples", link: "/resources/StylingExamples.zip" },
        ],
      },
      {
        title: "Responsive Design",
        videoUrl: "https://via.placeholder.com/640x360",
        resources: [],
      },
    ],
  },
  {
    id: 6,
    title: "Introduction to Cybersecurity",
    description: "Understand the fundamentals of cybersecurity.",
    rating: 4.9,
    lecturer: "Michael Brown",
    img: "https://via.placeholder.com/150",
    category: "IT & Security",
    sections: [
      {
        title: "Cybersecurity Basics",
        videoUrl: "https://via.placeholder.com/640x360",
        resources: [
          {
            name: "Cybersecurity Intro",
            link: "/resources/CybersecurityIntro.pdf",
          },
        ],
      },
      {
        title: "Threats and Vulnerabilities",
        videoUrl: "https://via.placeholder.com/640x360",
        resources: [
          { name: "Threats Guide", link: "/resources/ThreatsGuide.pdf" },
        ],
      },
      {
        title: "Best Practices for Security",
        videoUrl: "https://via.placeholder.com/640x360",
        resources: [
          {
            name: "Security Best Practices",
            link: "/resources/SecurityBestPractices.pdf",
          },
        ],
      },
    ],
  },
];

export default coursesData;
