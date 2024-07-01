export { type Course };

interface Course {
  _id?: string;
  courseID: string;
  courseName: string;
  publisher?: string;
  tier: string;
  description: string;
  isPublished?: boolean;
  createdAt?: string;
  modules?: { id: string }[];
  students?: { id: string }[];
}

export interface EditCourseForm {
  courseName?: string | null;
  courseID?: string | null;
  description?: string | null;
  tier?: string | null;
  isPublished?: boolean | null;
}
