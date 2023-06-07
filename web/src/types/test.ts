import type { Question } from './question'

export interface Test {
  id: string | null
  description: string
  questions: Question[]
}
