import type { QuestionItem } from './question-item'

export interface Question {
  id: string | null
  description: string
  questionItems: QuestionItem[]
}
