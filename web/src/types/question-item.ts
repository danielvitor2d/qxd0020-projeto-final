import type { Course } from './course'

export interface QuestionItem {
  id: string | null
  description: string
  course: Course | null
  courseId: string | null
}
