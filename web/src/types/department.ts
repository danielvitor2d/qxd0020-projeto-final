import type { Course } from "./course"

export interface Department {
  id: string | null
  name: string
  courses: Array<Course>
}