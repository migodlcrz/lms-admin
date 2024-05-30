export { type User };

interface Course {
  id: string;
}

interface Todo {
  title: string;
  date: string;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
  courses: Course[];
  todos: Todo[];
}
