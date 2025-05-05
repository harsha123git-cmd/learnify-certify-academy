
export type Course = {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  enrolled: number;
  image: string;
  progress?: number;
};

export type Student = {
  id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
  attendance: Record<string, AttendanceRecord[]>;
  certificates: Certificate[];
};

export type Certificate = {
  id: string;
  courseId: string;
  courseName: string;
  studentId: string;
  studentName: string;
  issueDate: string;
  expiryDate?: string;
  achievements: string[];
};

export type AttendanceRecord = {
  date: string;
  status: 'present' | 'absent' | 'late';
};

// Mock data for courses
export const courses: Course[] = [
  {
    id: "course-1",
    title: "Introduction to Computer Science",
    description: "Learn the basics of computer science, algorithms, and data structures.",
    instructor: "Dr. Jane Smith",
    duration: "12 weeks",
    enrolled: 245,
    image: "photo-1488590528505-98d2b5aba04b",
    progress: 45
  },
  {
    id: "course-2",
    title: "Web Development Bootcamp",
    description: "Master HTML, CSS, and JavaScript to build modern web applications.",
    instructor: "Prof. John Doe",
    duration: "8 weeks",
    enrolled: 189,
    image: "photo-1461749280684-dccba630e2f6",
    progress: 75
  },
  {
    id: "course-3",
    title: "Data Science Fundamentals",
    description: "Explore data analysis, visualization, and machine learning concepts.",
    instructor: "Dr. Sarah Johnson",
    duration: "10 weeks",
    enrolled: 156,
    image: "photo-1486312338219-ce68d2c6f44d"
  },
  {
    id: "course-4",
    title: "Advanced Mathematics",
    description: "Deep dive into calculus, linear algebra, and statistics.",
    instructor: "Prof. Michael Chen",
    duration: "15 weeks",
    enrolled: 120,
    image: "photo-1519389950473-47ba0277781c"
  },
  {
    id: "course-5",
    title: "Business Analytics",
    description: "Learn to make data-driven business decisions using analytics tools.",
    instructor: "Dr. Emily Williams",
    duration: "6 weeks",
    enrolled: 210,
    image: "photo-1498050108023-c5249f4df085"
  },
  {
    id: "course-6",
    title: "UI/UX Design Principles",
    description: "Master the art of creating intuitive and beautiful user interfaces.",
    instructor: "Prof. Alex Turner",
    duration: "9 weeks",
    enrolled: 178,
    image: "photo-1605810230434-7631ac76ec81"
  }
];

// Mock data for the current student
export const currentStudent: Student = {
  id: "student-1",
  name: "Sam Wilson",
  email: "sam.wilson@example.com",
  enrolledCourses: ["course-1", "course-2"],
  attendance: {
    "course-1": [
      { date: "2025-05-01", status: "present" },
      { date: "2025-05-02", status: "present" },
      { date: "2025-05-03", status: "absent" },
      { date: "2025-05-04", status: "present" },
      { date: "2025-05-05", status: "present" }
    ],
    "course-2": [
      { date: "2025-05-01", status: "present" },
      { date: "2025-05-02", status: "late" },
      { date: "2025-05-03", status: "present" },
      { date: "2025-05-04", status: "present" },
      { date: "2025-05-05", status: "present" }
    ]
  },
  certificates: [
    {
      id: "cert-1",
      courseId: "course-5",
      courseName: "Business Analytics",
      studentId: "student-1",
      studentName: "Sam Wilson",
      issueDate: "2025-04-15",
      achievements: ["Top performer", "Perfect attendance"]
    }
  ]
};

export const allStudents: Student[] = [
  currentStudent,
  {
    id: "student-2",
    name: "Emma Johnson",
    email: "emma.j@example.com",
    enrolledCourses: ["course-1", "course-3", "course-4"],
    attendance: {
      "course-1": [
        { date: "2025-05-01", status: "present" },
        { date: "2025-05-02", status: "present" },
        { date: "2025-05-03", status: "present" },
        { date: "2025-05-04", status: "absent" },
        { date: "2025-05-05", status: "present" }
      ]
    },
    certificates: []
  },
  {
    id: "student-3",
    name: "Marcus Chen",
    email: "marcus.c@example.com",
    enrolledCourses: ["course-2", "course-6"],
    attendance: {
      "course-2": [
        { date: "2025-05-01", status: "absent" },
        { date: "2025-05-02", status: "present" },
        { date: "2025-05-03", status: "present" },
        { date: "2025-05-04", status: "present" },
        { date: "2025-05-05", status: "present" }
      ]
    },
    certificates: []
  }
];

// Helper functions
export function getEnrolledCourses(studentId: string): Course[] {
  const student = allStudents.find(s => s.id === studentId);
  if (!student) return [];
  
  return courses.filter(course => 
    student.enrolledCourses.includes(course.id)
  );
}

export function getAvailableCourses(studentId: string): Course[] {
  const student = allStudents.find(s => s.id === studentId);
  if (!student) return courses;
  
  return courses.filter(course => 
    !student.enrolledCourses.includes(course.id)
  );
}

export function enrollInCourse(studentId: string, courseId: string): boolean {
  const studentIndex = allStudents.findIndex(s => s.id === studentId);
  if (studentIndex === -1) return false;
  
  if (!allStudents[studentIndex].enrolledCourses.includes(courseId)) {
    allStudents[studentIndex].enrolledCourses.push(courseId);
    return true;
  }
  
  return false;
}

export function recordAttendance(
  studentId: string, 
  courseId: string, 
  date: string, 
  status: 'present' | 'absent' | 'late'
): boolean {
  const studentIndex = allStudents.findIndex(s => s.id === studentId);
  if (studentIndex === -1) return false;
  
  const student = allStudents[studentIndex];
  
  if (!student.attendance[courseId]) {
    student.attendance[courseId] = [];
  }
  
  const existingRecord = student.attendance[courseId].findIndex(
    record => record.date === date
  );
  
  if (existingRecord >= 0) {
    student.attendance[courseId][existingRecord].status = status;
  } else {
    student.attendance[courseId].push({ date, status });
  }
  
  return true;
}

export function generateCertificate(
  studentId: string, 
  courseId: string,
  achievements: string[] = []
): Certificate | null {
  const student = allStudents.find(s => s.id === studentId);
  const course = courses.find(c => c.id === courseId);
  
  if (!student || !course) return null;
  
  const certificate: Certificate = {
    id: `cert-${Date.now()}`,
    courseId,
    courseName: course.title,
    studentId,
    studentName: student.name,
    issueDate: new Date().toISOString().split('T')[0],
    achievements
  };
  
  student.certificates.push(certificate);
  
  return certificate;
}
