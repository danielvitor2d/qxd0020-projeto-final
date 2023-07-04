import type { Department } from './department'
import type { Question } from './question'

export interface Test {
  id: string | null
  description: string
  department: Department
  questions: Question[]
}
