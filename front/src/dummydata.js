import course1Image from "./img/course1.jpg";
import course2Image from "./img/course2.jpg";
import course3Image from "./img/course3.jpg";
import course4Image from "./img/course4.jpg";
import course5Image from "./img/course5.jpg";
import { FaListAlt, FaUsers, FaAlignLeft, FaBook } from "react-icons/fa";
export const FeedBacks = [
  {
    note: "The session provided a comprehensive overview of the subject matter. The content was well-organized and easy to follow. I particularly enjoyed the hands-on exercises that helped solidify my understanding. The instructor was highly knowledgeable and approachable. I would highly recommend this session!",
    author: "John",
    upvotes: 7,
    profileImage:
      "https://images.squarespace-cdn.com/content/v1/631ba8eed2196a6795698665/70ee74c1-4bd3-4410-88fd-75bae72b4bfd/2021-08-16-Alicia-Huntsman-44234-JPEG+sRGB+Web+Folder.jpg?format=750w",
      isUpvoted:false
    },
  {
    note: "I found the session to be extremely helpful in bridging my knowledge gap. The instructor explained complex concepts in a simplified manner, making it easier to grasp. The practical examples and case studies were particularly enlightening. Overall, it was a valuable learning experience.",
    author: "Sarah",
    upvotes: 5,
    profileImage:
      "https://cdn-uploads-frankfurt.starofservice.com/uploads/pj/thumbs-medium/starofservice_11510avatarduplaix.jpg",
    isUpvoted:true

  },
  {
    note: "Attending this session was a game-changer for me. The instructors expertise and teaching style were outstanding. I appreciated the interactive approach, encouraging discussions and questions. The session exceeded my expectations and left me inspired to explore the subject further.",
    author: "David",
    upvotes: 10,
    profileImage:
      "https://images.squarespace-cdn.com/content/v1/631ba8eed2196a6795698665/b488239b-f181-4333-8662-45ba36335d7f/2022-02-11-Trinet-Geena-0319-OneDrive+-+Social+Media.jpg?format=750w",
    isUpvoted:false

  },
  {
    note: "I highly recommend this session to anyone interested in the topic. The content was delivered in a clear and concise manner, making it accessible to learners of all levels. The practical exercises and real-world examples added great value to the learning experience. Kudos to the instructor for a job well done!",
    author: "Emily",
    upvotes: 9,
    profileImage:
      "https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?s=612x612&w=0&k=20&c=8ssXDNTp1XAPan8Bg6mJRwG7EXHshFO5o0v9SIj96nY=",
    isUpvoted:false

  },
  {
    note: "The session was truly eye-opening. The instructors passion and expertise were evident throughout. The session provided valuable insights and practical tips that I can immediately apply in my work. Im grateful for the opportunity to participate and would eagerly attend future sessions by this instructor.",
    author: "Michael",
    upvotes: 6,
    profileImage:
      "https://media.istockphoto.com/id/1280113805/photo/smiling-young-woman-beauty-close-up-portrait.jpg?s=612x612&w=0&k=20&c=11GhfzV2ZdNaikNwncxvGQARw4MoT22DDfzqs4UpqL0=",
    isUpvoted:false

  },
];

export const iconsT = [
  {
    id: 1,
    cover: "https://img.icons8.com/dotty/80/000000/storytelling.png",
    title: "Online Courses",
    desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
  },
  {
    id: 1,
    cover: "https://img.icons8.com/ios/80/000000/diploma.png",
    title: "Earn A Certificates",
    desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
  },
  {
    id: 1,
    cover: "https://img.icons8.com/ios/80/000000/athlete.png",
    title: "Learn with Expert",
    desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
  },
];
export const awrapper = [
  {
    cover:
      "https://img.icons8.com/external-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto/80/ffffff/external-graduation-education-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto.png",
    data: "250",
    title: "SUCCESS STORIES",
  },

  {
    cover: "https://img.icons8.com/ios/80/ffffff/athlete.png",
    data: "12",
    title: "TRUSTED MENTORS",
  },
  {
    cover:
      "https://img.icons8.com/external-outline-icons-maxicons/80/ffffff/external-calender-insurance-outline-outline-icons-maxicons.png",
    data: "3",
    title: "SCHEDULES",
  },
  {
    cover: "https://img.icons8.com/ios/80/ffffff/macbook-idea--v3.png",
    data: "7",
    title: "COURSES",
  },
];

export const awrapperMentor = [
  {
    data: "77K",
    title: "Students",
  },

  {
    data: "75+",
    title: "Customers",
  },
  {
    data: "20+",
    title: "Countries",
  },
  {
    data: "3+",
    title: "Languages",
  },
];

export const courses = [
  {
    id: 0,
    cover: course1Image,
    title: "Introduction to Python",
    description: "Learn the basics of Python programming language.",
    duration: "2 hours",
    category: "Programming",
    startTime: "2023-06-15 09:00:00",
    endTime: "2023-06-15 11:00:00",
    type: "Live",
    numberOfLectures: 1,
    numberOfStudents: 50,
    coaches: [
      {
        name: "John Doe",
        avatar:
          "https://cdn-uploads-frankfurt.starofservice.com/uploads/pj/thumbs-medium/starofservice_11510avatarduplaix.jpg",
      },
      {
        name: "Jane Smith",
        avatar:
          "https://images.squarespace-cdn.com/content/v1/631ba8eed2196a6795698665/70ee74c1-4bd3-4410-88fd-75bae72b4bfd/2021-08-16-Alicia-Huntsman-44234-JPEG+sRGB+Web+Folder.jpg?format=750w",
      },
    ],
  },
  {
    id: 1,
    cover: course2Image,
    title: "Web Development Fundamentals",
    description:
      "Explore the essentials of web development using HTML, CSS, and JavaScript.",
    duration: "3 hours",
    category: "Web Development",
    startTime: "2023-06-17 14:00:00",
    endTime: "2023-06-17 17:00:00",
    type: "Recorded",
    numberOfLectures: 1,
    numberOfStudents: 75,
    coaches: [
      {
        name: "Alex Johnson",
        avatar:
          "https://images.squarespace-cdn.com/content/v1/631ba8eed2196a6795698665/b488239b-f181-4333-8662-45ba36335d7f/2022-02-11-Trinet-Geena-0319-OneDrive+-+Social+Media.jpg?format=750w",
      },
    ],
  },
  {
    id: 2,
    cover: course3Image,
    title: "Introduction to Data Science",
    description: "Discover the basics of data science and its applications.",
    duration: "2.5 hours",
    category: "Data Science",
    startTime: "2023-06-20 10:30:00",
    endTime: "2023-06-20 13:00:00",
    type: "Live",
    numberOfLectures: 1,
    numberOfStudents: 40,
    coaches: [
      {
        name: "Sarah Thompson",
        avatar:
          "https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?s=612x612&w=0&k=20&c=8ssXDNTp1XAPan8Bg6mJRwG7EXHshFO5o0v9SIj96nY=",
      },
      {
        name: "David Wilson",
        avatar:
          "https://media.istockphoto.com/id/1280113805/photo/smiling-young-woman-beauty-close-up-portrait.jpg?s=612x612&w=0&k=20&c=11GhfzV2ZdNaikNwncxvGQARw4MoT22DDfzqs4UpqL0=",
      },
    ],
  },
  {
    id: 3,
    cover: course4Image,
    title: "Graphic Design Workshop",
    description: "Learn various techniques and principles of graphic design.",
    duration: "2 hours",
    category: "Design",
    startTime: "2023-06-22 18:00:00",
    endTime: "2023-06-22 20:00:00",
    type: "Live",
    numberOfLectures: 1,
    numberOfStudents: 30,
    coaches: [
      {
        name: "Emily Anderson",
        avatar:
          "https://media.licdn.com/dms/image/C4E03AQEG_lZQT3STbg/profile-displayphoto-shrink_800_800/0/1654324442718?e=2147483647&v=beta&t=BKW8PpuZXxQBUz10Grb6xHtN1-4DXKUMSUUsUXG9MBI",
      },
    ],
  },
  {
    id: 4,
    cover: course5Image,
    title: "Introduction to Machine Learning",
    description:
      "Explore the fundamentals of machine learning algorithms and concepts.",
    duration: "2.5 hours",
    category: "Machine Learning",
    startTime: "2023-06-25 15:00:00",
    endTime: "2023-06-25 17:30:00",
    type: "Recorded",
    numberOfLectures: 1,
    numberOfStudents: 60,
    coaches: [
      {
        name: "Michael Johnson",
        avatar:
          "https://i.pinimg.com/564x/2f/30/5e/2f305eb98bf63ddedb556d383443c7ad.jpg",
      },
    ],
  },
];

export const price = [
  {
    name: "Basics",
    price: "49",
    features: [
      { label: "morem ipsum dolor sit amet", isAvailable: true },
      { label: "morem ipsum dolor sit amet", isAvailable: false },
      { label: "morem ipsum dolor sit amet", isAvailable: false },
      { label: "morem ipsum dolor sit amet", isAvailable: false },
    ],
  },
  {
    name: "Pro",
    price: "90",
    features: [
      { label: "morem ipsum dolor sit amet", isAvailable: true },
      { label: "morem ipsum dolor sit amet", isAvailable: true },
      { label: "morem ipsum dolor sit amet", isAvailable: false },
      { label: "morem ipsum dolor sit amet", isAvailable: false },
    ],
  },
  {
    name: "Companies",
    price: "150",
    features: [
      { label: "morem ipsum dolor sit amet", isAvailable: true },
      { label: "morem ipsum dolor sit amet", isAvailable: true },
      { label: "morem ipsum dolor sit amet", isAvailable: true },
      { label: "morem ipsum dolor sit amet", isAvailable: true },
    ],
  },
];
export const testimonal = [
  {
    id: 1,
    name: "MEHDI JAOUADI",
    post: "MARKETING MANAGER",
    desc: "I had a fantastic experience as a mentor in the Jalysscom training program. It was incredibly rewarding to guide and support aspiring professionals in their marketing journey.",
    cover:
      "https://cdn-uploads-frankfurt.starofservice.com/uploads/pj/thumbs-medium/starofservice_11510avatarduplaix.jpg",
  },
  {
    id: 2,
    name: "HIND BOUJEMAA",
    post: "SCRIPTWRITER",
    desc: "Being a student at Jalysscom has been a transformative experience. The program equipped me with valuable skills and knowledge, allowing me to pursue my passion for storytelling and scriptwriting.",
    cover:
      "https://images.squarespace-cdn.com/content/v1/631ba8eed2196a6795698665/70ee74c1-4bd3-4410-88fd-75bae72b4bfd/2021-08-16-Alicia-Huntsman-44234-JPEG+sRGB+Web+Folder.jpg?format=750w",
  },
  {
    id: 3,
    name: "ERNESTO GUEVARA",
    post: "DATA SCIENTIST",
    desc: "As a mentor at Jalysscom, I had the privilege of helping students unlock the power of data science. The training program fostered a supportive and collaborative learning environment, empowering students to excel in this rapidly growing field.",
    cover:
      "https://images.squarespace-cdn.com/content/v1/631ba8eed2196a6795698665/b488239b-f181-4333-8662-45ba36335d7f/2022-02-11-Trinet-Geena-0319-OneDrive+-+Social+Media.jpg?format=750w",
  },
  {
    id: 4,
    name: "RANIA",
    post: "UI/UX DESIGNER",
    desc: "Jalysscom provided me with the essential design principles and tools needed to create intuitive and user-friendly interfaces. The hands-on projects and expert guidance gave me the confidence to pursue a successful career as a UI/UX designer.",
    cover:
      "https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?s=612x612&w=0&k=20&c=8ssXDNTp1XAPan8Bg6mJRwG7EXHshFO5o0v9SIj96nY=",
  },

  {
    id: 5,
    name: "MEHDI JAOUADI",
    post: "MARKETING MANAGER",
    desc: "I had a fantastic experience as a mentor in the Jalysscom training program. It was incredibly rewarding to guide and support aspiring professionals in their marketing journey.",
    cover:
      "https://media.istockphoto.com/id/1280113805/photo/smiling-young-woman-beauty-close-up-portrait.jpg?s=612x612&w=0&k=20&c=11GhfzV2ZdNaikNwncxvGQARw4MoT22DDfzqs4UpqL0=",
  },
  {
    id: 6,
    name: "HIND BOUJEMAA",
    post: "SCRIPTWRITER",
    desc: "Being a student at Jalysscom has been a transformative experience. The program equipped me with valuable skills and knowledge, allowing me to pursue my passion for storytelling and scriptwriting.",
    cover:
      "https://media.istockphoto.com/id/1089633230/photo/glasses-girl-in-white.jpg?s=170667a&w=0&k=20&c=ZhhkfB2n9fWtvpIAubXKZ3rwEcIDAbJT8U4JKjd_6VA=",
  },
  {
    id: 7,
    name: "MEHDI JAOUADI",
    post: "MARKETING MANAGER",
    desc: "The Jalysscom training program exceeded my expectations. It provided me with a solid foundation in marketing strategies and helped me develop valuable industry connections. I highly recommend it to anyone looking to advance their career in marketing.",
    cover:
      "https://media.licdn.com/dms/image/C4E03AQEG_lZQT3STbg/profile-displayphoto-shrink_800_800/0/1654324442718?e=2147483647&v=beta&t=BKW8PpuZXxQBUz10Grb6xHtN1-4DXKUMSUUsUXG9MBI",
  },
  {
    id: 8,
    name: "HIND BOUJEMAA",
    post: "SCRIPTWRITER",
    desc: "Joining the Jalysscom training program was the best decision I made for my scriptwriting career. The instructors were knowledgeable and supportive, and the practical assignments helped me refine my storytelling skills. I'm grateful for the opportunities it has opened up for me.",
    cover:
      "https://i.pinimg.com/564x/2f/30/5e/2f305eb98bf63ddedb556d383443c7ad.jpg",
  },
  {
    id: 9,
    name: "ERNESTO GUEVARA",
    post: "DATA SCIENTIST",
    desc: "The Jalysscom training program provided me with a comprehensive understanding of data science concepts and hands-on experience with real-world projects. The curriculum was up-to-date, and the mentors were highly experienced professionals. It laid a strong foundation for my career in data science.",
    cover:
      "https://media.istockphoto.com/id/1208414307/photo/happy-male-executive-in-office.jpg?s=612x612&w=0&k=20&c=3krD8gIdPmHFVwbcHGyQDXUGlcyzmcWQNyRMRp_93P8=",
  },
];
export const learningTopics = [
  "Goal Setting",
  "Time Management",
  "Self-Awareness",
  "Emotional Intelligence",
  "Communication Skills",
  "Decision Making",
  "Mindfulness and Meditation",
  "Positive Thinking",
  "Stress Management",
  "Self-Motivation",
  "Leadership Skills",
  "Creative Problem Solving",
  "Effective Learning Strategies",
  "Critical Thinking",
  "Building Resilience",
  "Effective Communication",
  "Building Healthy Habits",
  "Conflict Resolution",
  "Personal Finance Management",
  "Public Speaking",
  "Networking and Relationship Building",
  "Building Self-Confidence",
  "Setting Boundaries",
  "Time Blocking and Productivity",
  "Career Planning and Development",
  "Emotional Well-being",
  "Assertiveness Skills",
  "Cultivating Empathy",
  "Adaptability and Flexibility",
  "Self-Reflection and Growth",
  "Positive Psychology",
  "Building Strong Relationships",
  "Work-Life Balance",
  "Mindset Shifts",
  "Building Motivation",
  "Gratitude Practices",
  "Developing a Growth Mindset",
  "Overcoming Procrastination",
  "Personal Branding",
  "Visualization and Manifestation",
  "Lifelong Learning Strategies",
  "Managing Change and Uncertainty",
  "Building Resilient Relationships",
  "Conflict Management",
  "Building Emotional Resilience",
  "Setting SMART Goals",
  "Health and Well-being",
  "Self-Care Practices",
  "Building Empathy and Compassion",
  "Building Effective Teams",
];

export const additionalInformation = [
  "No prior knowledge is required",
  "You can use a Windows PC or a Mac",
  "All software used is free",
  "You can take this course with just 2 hours of weekly commitment",
];

export const lectures = [
  {
    id: 0,
    title: "Introduction to React",
    content:
      "Learn the basics of React and how to build interactive UI components.",
    coaches: [
      {
        name: "John Doe",
        avatar:
          "https://cdn-uploads-frankfurt.starofservice.com/uploads/pj/thumbs-medium/starofservice_11510avatarduplaix.jpg",
      },
      {
        name: "Jane Smith",
        avatar:
          "https://images.squarespace-cdn.com/content/v1/631ba8eed2196a6795698665/70ee74c1-4bd3-4410-88fd-75bae72b4bfd/2021-08-16-Alicia-Huntsman-44234-JPEG+sRGB+Web+Folder.jpg?format=750w",
      },
    ],
    whatYouWillLearn: [
      "Understanding React's component-based architecture",
      "Working with JSX syntax",
      "Managing state and props",
      "Handling events in React",
      "Building reusable UI components",
    ],
    startAt: "9:00 AM",
    endAt: "11:00 AM",
    date: "2023-06-20",
  },
  {
    id: 1,
    title: "Data Structures and Algorithms",
    content:
      "Explore various data structures and algorithms used in programming.",
    coaches: [
      {
        name: "Alex Johnson",
        avatar:
          "https://images.squarespace-cdn.com/content/v1/631ba8eed2196a6795698665/b488239b-f181-4333-8662-45ba36335d7f/2022-02-11-Trinet-Geena-0319-OneDrive+-+Social+Media.jpg?format=750w",
      },
    ],
    whatYouWillLearn: [
      "Understanding different data structures",
      "Implementing common algorithms",
      "Analyzing time and space complexity",
      "Solving coding problems efficiently",
    ],
    startAt: "1:00 PM",
    endAt: "3:00 PM",
    date: "2023-06-21",
  },
  {
    id: 2,
    title: "Digital Marketing Strategies",
    content:
      "Discover effective digital marketing strategies for promoting businesses online.",
    coaches: [
      {
        name: "Sarah Thompson",
        avatar:
          "https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?s=612x612&w=0&k=20&c=8ssXDNTp1XAPan8Bg6mJRwG7EXHshFO5o0v9SIj96nY=",
      },
      {
        name: "David Wilson",
        avatar:
          "https://media.istockphoto.com/id/1280113805/photo/smiling-young-woman-beauty-close-up-portrait.jpg?s=612x612&w=0&k=20&c=11GhfzV2ZdNaikNwncxvGQARw4MoT22DDfzqs4UpqL0=",
      },
    ],
    whatYouWillLearn: [
      "Creating compelling content for online platforms",
      "Optimizing SEO strategies",
      "Running successful social media campaigns",
      "Analyzing marketing metrics",
    ],
    startAt: "10:00 AM",
    endAt: "12:00 PM",
    date: "2023-06-22",
  },
  {
    id: 3,
    title: "Public Speaking Mastery",
    content:
      "Master the art of public speaking and deliver impactful presentations.",
    coaches: [
      {
        name: "Emily Anderson",
        avatar:
          "https://media.licdn.com/dms/image/C4E03AQEG_lZQT3STbg/profile-displayphoto-shrink_800_800/0/1654324442718?e=2147483647&v=beta&t=BKW8PpuZXxQBUz10Grb6xHtN1-4DXKUMSUUsUXG9MBI",
      },
    ],
    whatYouWillLearn: [
      "Overcoming stage fright and building confidence",
      "Crafting engaging presentations",
      "Developing effective body language and vocal techniques",
      "Engaging with the audience and handling Q&A sessions",
    ],
    startAt: "2:00 PM",
    endAt: "4:00 PM",
    date: "2023-06-23",
  },
  {
    id: 4,
    title: "Time Management Techniques",
    content:
      "Learn time management strategies to enhance productivity and achieve goals.",
    coaches: [
      {
        name: "Michael Johnson",
        avatar:
          "https://i.pinimg.com/564x/2f/30/5e/2f305eb98bf63ddedb556d383443c7ad.jpg",
      },
    ],
    whatYouWillLearn: [
      "Setting clear goals and priorities",
      "Planning and organizing tasks effectively",
      "Delegating and outsourcing when necessary",
      "Managing distractions and staying focused",
    ],
    startAt: "11:00 AM",
    endAt: "1:00 PM",
    date: "2023-06-24",
  },
];

export const navData = [
  {
    nameEn: "Description",
    nameAr: "",
    path: "/",
    icon: <FaAlignLeft />,
  },
  {
    nameEn: "Sections",
    nameAr: "",
    path: "/sections",
    icon: <FaListAlt />,
  },
  {
    nameEn: "Coatch/cotchs",
    nameAr: "",
    path: "/coatchs",
    icon: <FaUsers />,
  },
  {
    nameEn: "what you will learn",
    nameAr: "",
    path: "/what-you-will-learn",
    icon: <FaBook />,
  },
];
export const faq = [
  {
    title: "How to Enroll This Online Courses?",
    desc: "This is the first item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow.",
  },
  {
    title: "Where It is hidden by default, until the collapse?",
    desc: "It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow.",
  },
  {
    title: "How It is hidden by default, until the collapse?",
    desc: "It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow.",
  },
  {
    title: "How to Enroll This Online Courses?",
    desc: "This is the first item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow.",
  },
  {
    title: "Where It is hidden by default, until the collapse?",
    desc: "It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow.",
  },
  {
    title: "How It is hidden by default, until the collapse?",
    desc: "It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow.",
  },
];
