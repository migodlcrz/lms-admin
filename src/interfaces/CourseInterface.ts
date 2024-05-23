export { type Course };

interface Topic {
  name: string;
  isComplete: boolean;
}

interface Quiz {
  name: string;
  isComplete: boolean;
}

interface Module {
  topics: Topic[];
  quiz: Quiz[];
}

interface Course {
  _id?: string;
  courseID: string;
  courseName: string;
  publisher?: string;
  tier: string;
  description: string;
  createdAt?: string;
  modules?: Module[];
  students?: { id: string }[];
}
