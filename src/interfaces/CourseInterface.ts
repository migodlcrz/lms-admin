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
  isPublished?: boolean;
  createdAt?: string;
  modules?: Module[];
  students?: { id: string }[];
}

export interface EditCourseForm {
  courseName?: string | null;
  courseID?: string | null;
  description?: string | null;
  tier?: string | null;
  isPublished?: boolean | null;
}
