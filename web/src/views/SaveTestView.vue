<template>
  <LoadingComponent v-if="getTestLoading" />
  <div v-else class="w-full flex flex-col items-center py-8">
    <h1 class="text-3xl font-semibold mb-8">
      {{ isEdit ? 'Editar Teste Vocacional' : 'Criar Teste Vocacional' }}
    </h1>
    <form class="w-3/5" @submit.prevent.stop="saveTest">
      <div class="flex flex-col">
        <div class="mb-4 animate-fadeIn">
          <label for="title" class="block text-gray-800 font-semibold mb-2">Título do Teste:</label>
          <input
            v-model="test.description"
            type="text"
            id="title"
            class="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div class="flex flex-col">
        <div class="mb-4 animate-fadeIn">
          <label for="title" class="block text-gray-800 font-semibold mb-2">Departamento:</label>
          <div v-if="getDepartmentsLoading" class="relative w-1/4 ml-2">Carregando departamentos...</div>
          <div v-else class="relative w-1/2 ml-2">
            <select
              v-model="test.department"
              class="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled selected>Selecione um departamento</option>
              <option v-for="department in departments" :key="department.name" :value="department">
                {{ department.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div v-if="test.department.id && test.department.id.length > 0" class="animate-fadeIn">
        <div v-for="(question, index) in test.questions" :key="index" class="mb-4">
          <div class="bg-gray-100 rounded-lg shadow-lg p-6">
            <h2 class="mb-2 font-bold">Pergunta {{ index + 1 }}</h2>
            <div class="flex items-center mb-4">
              <input
                v-model="question.description"
                type="text"
                class="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                @click.prevent.stop="removeQuestion(index)"
                class="text-red-500 hover:text-red-600 ml-2"
              >
                <DeleteIcon />
              </button>
            </div>
            <div
              v-for="(item, itemIndex) in question.questionItems"
              :key="itemIndex"
              class="flex items-center mb-2"
            >
              <input
                v-model="item.description"
                type="text"
                class="w-3/4 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div class="relative w-1/4 ml-2">
                <select
                  v-model="item.courseId"
                  class="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled selected>Selecione um curso</option>
                  <option v-for="course in courseOptions" :key="course.id" :value="course.id">
                    {{ course.name }}
                  </option>
                </select>
              </div>
              <button
                @click.prevent.stop="removeItem(index, itemIndex)"
                class="text-red-500 hover:text-red-600 ml-2"
              >
                <DeleteIcon />
              </button>
            </div>
            <button
              @click.prevent.stop="addItem(index)"
              class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-2"
            >
              Adicionar item
            </button>
          </div>
        </div>
        <button
          @click.prevent.stop="addQuestion"
          class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
        >
          Adicionar Pergunta
        </button>
      </div>
      <button v-if="saving" disabled="true" class="cursor-wait bg-blue-500 opacity-75 hover:bg-blue-600 text-white py-2 px-4 rounded mt-8">
        <svg
          class="animate-spin h-6 w-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647z"
          ></path>
        </svg>
      </button>
      <button v-else type="submit" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-8 animate-fadeIn">
        {{ isEdit ? 'Salvar alterações' : 'Criar Teste' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useMutation, useQuery } from '@vue/apollo-composable'
import { gql } from 'apollo-boost'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { POSITION, useToast } from 'vue-toastification'

import DeleteIcon from '@/components/DeleteIcon.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import type { Course } from '@/types/course'
import type { Department } from '@/types/department'
import type { Test } from '@/types/test.js'

interface QueryResult {
  getTestById: Test
}

interface GetDepartmentsQueryResult {
  getAllDepartments: Array<Department>
}

const router = useRouter()

const toast = useToast()

const isEdit = !!router.currentRoute.value.params.id

const departments = ref<Array<Department>>([])

const saving = ref(false)

const GET_TEST_QUERY = gql`
  query GetTestById($id: String!) {
    getTestById(id: $id) {
      id
      description
      department {
        id
        name
        courses {
          id
          name
        }
      }
      questions {
        id
        description
        questionItems {
          id
          description
          courseId
          course {
            id
            name
          }
        }
      }
    }
  }
`

const GET_DEPARTMENTS_QUERY = gql`
  query {
    getAllDepartments {
      id
      name
      courses {
        id
        name
      }
    }
  }
`

// mutations
const REGISTER_TEST_MUTATION = gql`
  mutation CreateTest($input: CreateTestDto!) {
    createTest(input: $input) {
      id
    }
  }
`

const REGISTER_QUESTION_MUTATION = gql`
  mutation CreateQuestion($input: CreateQuestionDto!) {
    createQuestion(input: $input) {
      id
    }
  }
`

const REGISTER_ITEM_QUESTION_MUTATION = gql`
  mutation CreateItemQuestion($input: CreateItemQuestionDto!) {
    createItemQuestion(input: $input) {
      id
    }
  }
`

const UPDATE_TEST_MUTATION = gql`
  mutation UpdateTest($id: String!, $input: UpdateTestDto!) {
    updateTest(id: $id, input: $input) {
      id
    }
  }
`

const UPDATE_QUESTION_MUTATION = gql`
  mutation UpdateQuestion($id: String!, $input: UpdateQuestionDto!) {
    updateQuestion(id: $id, input: $input) {
      id
    }
  }
`

const UPDATE_ITEM_QUESTION_MUTATION = gql`
  mutation UpdateItemQuestion($id: String!, $input: UpdateItemQuestionDto!) {
    updateItemQuestion(id: $id, input: $input) {
      id
    }
  }
`

// getAllDepartments
const {
  result: getDepartmentsResult,
  loading: getDepartmentsLoading,
  onResult: getDepartmentsOnResult,
} = useQuery<GetDepartmentsQueryResult>(GET_DEPARTMENTS_QUERY)

getDepartmentsOnResult(() => {
  if (!getDepartmentsResult.value?.getAllDepartments) return

  departments.value = getDepartmentsResult.value?.getAllDepartments.map((department) => ({
    id: department.id,
    name: department.name,
    courses: [ ...department.courses ],
  }))
})

// getTestByid
const {
  result: getTestResult,
  loading: getTestLoading,
  onResult
} = useQuery<QueryResult>(GET_TEST_QUERY, {
  id: router.currentRoute.value.params.id
})

onResult(() => {
  if (!getTestResult.value?.getTestById) return

  test.value = {
    id: getTestResult.value?.getTestById.id,
    department: getTestResult.value?.getTestById.department,
    description: getTestResult.value?.getTestById.description,
    questions: [
      // eslint-disable-next-line no-unsafe-optional-chaining
      ...getTestResult.value?.getTestById.questions.map((question) => ({
        id: question.id,
        questionItems: [
          ...question.questionItems.map((item) => ({
            id: item.id,
            description: item.description,
            course: { ...(item.course as Course) },
            courseId: item.courseId
          }))
        ],
        description: question.description
      }))
    ]
  }
})

// registerTest
const { mutate: createTestMutate } = useMutation(REGISTER_TEST_MUTATION)

// registerQuestion
const { mutate: createQuestionMutate } = useMutation(REGISTER_QUESTION_MUTATION)

// registerItemQuestion
const { mutate: createItemQuestionMutate } = useMutation(REGISTER_ITEM_QUESTION_MUTATION)

// updateTestMutation
const { mutate: updateTestMutation } = useMutation(UPDATE_TEST_MUTATION)

// updateQuestionMutation
const { mutate: updateQuestionMutation } = useMutation(UPDATE_QUESTION_MUTATION)

// updateItemQuestionMutation
const { mutate: updateItemQuestionMutation } = useMutation(UPDATE_ITEM_QUESTION_MUTATION)

const courseOptions = computed(() => !test.value.department.id ? [] : test.value.department.courses)

const test = ref<Test>({
  id: null,
  department: {
    id: null,
    name: '',
    courses: [],
  },
  description: '',
  questions: [
    {
      id: '',
      description: '',
      questionItems: [{ id: '', description: '', course: null, courseId: null }]
    }
  ]
})

const saveTest = async () => {
  try {
    saving.value = true

    if (test.value.description.length < 3) {
      return toast.error('A descrição do teste deve ter no mínimo 3 caracteres.', {
        position: POSITION.BOTTOM_RIGHT
      })
    }

    if (test.value.questions.some((question) => question.description.length < 3)) {
      return toast.error('A descrição das perguntas deve ter no mínimo 3 caracteres.', {
        position: POSITION.BOTTOM_RIGHT
      })
    }

    if (
      test.value.questions.some((question) =>
        question.questionItems.some((item) => item.description.length < 3)
      )
    ) {
      return toast.error('A descrição dos items deve ter no mínimo 3 caracteres.', {
        position: POSITION.BOTTOM_RIGHT
      })
    }

    if (
      test.value.questions.some((question) =>
        question.questionItems.some((item) => item.courseId === null)
      )
    ) {
      return toast.error('Todo item deve estar vinculado a um curso.', {
        position: POSITION.BOTTOM_RIGHT
      })
    }

    toast.info('Salvando informações do teste...', {
      position: POSITION.BOTTOM_RIGHT
    })

    isEdit ? updateTest() : createTest()
  } catch (err) {
    console.error(err)
    toast.error('Erro ao salvar teste. Tente novamente mais tarde.', {
      position: POSITION.BOTTOM_RIGHT
    })
  } finally {
    saving.value = false
  }
}

const createTest = async () => {
  const resultCreateTest = await createTestMutate({
    input: {
      description: test.value.description,
      departmentId: test.value.department.id,
    }
  })

  if (!resultCreateTest?.data || resultCreateTest?.errors) {
    console.error(resultCreateTest?.errors?.map((error) => error.message))

    return toast.error('Erro inesperado ao salvar teste.', {
      position: POSITION.BOTTOM_RIGHT
    })
  }

  const { id: testId } = resultCreateTest.data.createTest

  for await (const question of test.value.questions) {
    const resultCreateQuestion = await createQuestionMutate({
      input: {
        description: question.description,
        testId
      }
    })

    if (!resultCreateQuestion?.data || resultCreateQuestion?.errors) {
      console.error(resultCreateQuestion?.errors?.map((error) => error.message))

      return toast.error('Erro inesperado ao salvar questões do teste.', {
        position: POSITION.BOTTOM_RIGHT
      })
    }

    const { id: questionId } = resultCreateQuestion.data.createQuestion

    for await (const item of question.questionItems) {
      const resultCreateItemQuestion = await createItemQuestionMutate({
        input: {
          courseId: item.courseId,
          description: item.description,
          questionId
        }
      })

      if (!resultCreateItemQuestion?.data || resultCreateItemQuestion?.errors) {
        console.error(resultCreateQuestion?.errors?.map((error) => error.message))

        return toast.error('Erro inesperado ao salvar items das questões.', {
          position: POSITION.BOTTOM_RIGHT
        })
      }
    }
  }

  toast.success('Teste cadastrado! Redirecionando para a listagem de testes.', {
    position: POSITION.BOTTOM_RIGHT
  })

  setTimeout(() => router.go(-1), 1000)
}

const updateTest = async () => {
  const resultUpdateTest = await updateTestMutation({
    id: test.value.id,
    input: {
      description: test.value.description,
      departmentId: test.value.department.id,
    }
  })

  if (!resultUpdateTest?.data || resultUpdateTest?.errors) {
    console.error(resultUpdateTest?.errors?.map((error) => error.message))

    return toast.error('Erro ao atualizar descrição do teste.', {
      position: POSITION.BOTTOM_RIGHT
    })
  }

  for await (const question of test.value.questions) {
    let questionId: string

    if (question.id) {
      questionId = question.id

      const resultUpdateQuestion = await updateQuestionMutation({
        id: question.id,
        input: {
          description: question.description
        }
      })

      if (!resultUpdateQuestion?.data || resultUpdateQuestion?.errors) {
        console.error(resultUpdateQuestion?.errors?.map((error) => error.message))

        return toast.error('Erro ao atualizar descrição das questões.', {
          position: POSITION.BOTTOM_RIGHT
        })
      }
    } else {
      const resultCreateQuestion = await createQuestionMutate({
        input: {
          description: question.description,
          testId: test.value.id
        }
      })

      if (!resultCreateQuestion?.data || resultCreateQuestion?.errors) {
        console.error(resultCreateQuestion?.errors?.map((error) => error.message))

        return toast.error('Erro inesperado ao salvar questões do teste.', {
          position: POSITION.BOTTOM_RIGHT
        })
      }

      const { id } = resultCreateQuestion.data.createQuestion

      questionId = id
    }

    for await (const item of question.questionItems) {
      if (!item.id) {
        const resultCreateItemQuestion = await createItemQuestionMutate({
          input: {
            courseId: item.courseId,
            description: item.description,
            questionId
          }
        })

        if (!resultCreateItemQuestion?.data || resultCreateItemQuestion?.errors) {
          console.error(resultCreateItemQuestion?.errors?.map((error) => error.message))

          return toast.error('Erro inesperado ao salvar items das questões.', {
            position: POSITION.BOTTOM_RIGHT
          })
        }
      } else {
        const resultUpdateItemQuestion = await updateItemQuestionMutation({
          id: item.id,
          input: {
            description: item.description
          }
        })

        if (!resultUpdateItemQuestion?.data || resultUpdateItemQuestion?.errors) {
          console.error(resultUpdateItemQuestion?.errors?.map((error) => error.message))

          return toast.error('Erro inesperado ao salvar items das questões.', {
            position: POSITION.BOTTOM_RIGHT
          })
        }
      }
    }
  }

  toast.success('Teste atualizado! Redirecionando para a listagem de testes.', {
    position: POSITION.BOTTOM_RIGHT
  })

  setTimeout(() => router.replace('/admin/tests'), 1000)
}

const addQuestion = (): void => {
  test.value.questions.push({
    id: '',
    description: '',
    questionItems: [{ id: '', description: '', course: null, courseId: null }]
  })
}

const addItem = (questionIndex: number): void => {
  test.value.questions[questionIndex].questionItems.push({
    id: '',
    description: '',
    course: null,
    courseId: null
  })
}

const removeItem = (questionIndex: number, itemIndex: number): void => {
  test.value.questions[questionIndex].questionItems.splice(itemIndex, 1)
}

const removeQuestion = (questionIndex: number): void => {
  test.value.questions.splice(questionIndex, 1)
}
</script>
