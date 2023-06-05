<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-semibold mb-8">Criar Teste Vocacional</h1>
    <form class="max-w-5xl mx-auto" @submit.prevent="createTest">
      <div class="mb-4">
        <label for="title" class="block text-gray-700 font-semibold mb-2">Título do Teste:</label>
        <input v-model="test.description" type="text" id="title" class="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      <div>
        <div v-for="(question, index) in test.questions" :key="index" class="mb-4">
          <div class="bg-gray-100 rounded-lg shadow-lg p-6">
            <h2 class="mb-2 font-bold">Pergunta {{ index+1 }}</h2>
            <div class="flex items-center mb-4">
              <input v-model="question.description" type="text" class="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <button @click.prevent.stop="removeQuestion(index)" class="text-red-500 hover:text-red-600 ml-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div v-for="(item, itemIndex) in question.items" :key="itemIndex" class="flex items-center mb-2">
              <input v-model="item.description" type="text" class="w-3/4 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <div v-if="loadingCourses" class="relative w-1/4 ml-2">Carregando cursos...</div>
              <div v-else class="relative w-1/4 ml-2">
                <select v-model="item.courseId" class="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="" disabled selected>Selecione um curso</option>
                  <option v-for="course in courseOptions" :key="course.id" :value="course.id">{{ course.name }}</option>
                </select>
              </div>
              <button @click.prevent.stop="removeItem(index, itemIndex)" class="text-red-500 hover:text-red-600 ml-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <button @click.prevent.stop="addItem(index)" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-2">
              Adicionar item
            </button>
          </div>
        </div>
        <button @click.prevent.stop="addQuestion" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4">
          Adicionar Pergunta
        </button>
      </div>
      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-8">
        Criar Teste
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { gql } from 'apollo-boost';
import { computed, ref } from 'vue';
import { POSITION, useToast } from "vue-toastification";

// interfaces
interface Course {
  id: string;
  name: string;
}

interface Item {
  description: string;
  courseId: string | null;
}

interface Question {
  description: string;
  items: Item[];
}

interface Test {
  description: string;
  questions: Question[];
}

const toast = useToast()

// queries
const GET_COURSES_QUERY = gql`
  query {
    getAllCourses {
      id
      name
    }
  }
`;

// mutations
const REGISTER_TEST_MUTATION = gql`
  mutation CreateTest($description: String!) {
    createTest(input: {
      description: $description
    }) {
      id
    }
  }
`;

const REGISTER_QUESTION_MUTATION = gql`
  mutation CreateQuestion($input: CreateQuestionDto!) {
    createQuestion(input: $input) {
      id
    }
  }
`;

const REGISTER_ITEM_QUESTION_MUTATION = gql`
  mutation CreateItemQuestion($input: CreateItemQuestionDto!) {
    createItemQuestion(input: $input) {
      id
    }
  }
`;

// getAllCourses
const { result, loading: loadingCourses } = useQuery<{
  getAllCourses: Array<Course>
}>(GET_COURSES_QUERY)

// registerTest
const { mutate: createTestMutate } = useMutation(REGISTER_TEST_MUTATION)

// registerQuestion
const { mutate: createQuestionMutate } = useMutation(REGISTER_QUESTION_MUTATION)

// registerItemQuestion
const { mutate: createItemQuestionMutate } = useMutation(REGISTER_ITEM_QUESTION_MUTATION)

const courseOptions = computed(() => result.value?.getAllCourses || [])

// current test
const test = ref<Test>({
  description: '',
  questions: [
    {
      description: '',
      items: [
        { description: '', courseId: null },
      ],
    },
  ],
});

// functions
const createTest = async () => {
  if (test.value.description.length < 3) {
    toast.error("A descrição do teste deve ter no mínimo 3 caracteres.", {
      position: POSITION.BOTTOM_RIGHT,
    })

    return
  }

  // test.value.questions.map(question => {
  //   question.items.map(item => {
  //     console.log(item.description +  ' ' + item.courseId)
  //   })
  // })

  if (!test.value.questions.every(question => question.items.every(item => item.courseId !== null))) {
    toast.error("Todos os items devem estar vinculados a um curso.", {
      position: POSITION.BOTTOM_RIGHT,
    })

    return
  }

  // console.log(test.value);

  let someError: boolean = false

  const resultCreateTest = await createTestMutate({
    description: test.value.description
  })

  if (!resultCreateTest?.data) {
    someError = true

    toast.error("Erro inesperado ao salvar teste", {
      position: POSITION.BOTTOM_RIGHT,
    })

    return
  }

  const { id } = resultCreateTest.data.createTest

  toast.success(`Teste criado com sucesso: id = ${id}`)

  for (const question of test.value.questions) {
    const resultCreateQuestion = await createQuestionMutate({
      input: {
        description: question.description,
        testId: id
      }
    })

    if (!resultCreateQuestion?.data) {
      someError = true

      toast.error("Erro inesperado ao salvar questões do teste", {
        position: POSITION.BOTTOM_RIGHT,
      })

      return
    }

    const { id: questionId } = resultCreateQuestion.data.createQuestion

    console.log(`Created question: ${questionId}`)

    for (const item of question.items) {
      const resultCreateItemQuestion = await createItemQuestionMutate({
        input: {
          courseId: item.courseId,
          description: item.description,
          questionId
        }
      })

      if (!resultCreateItemQuestion?.data) {
        someError = true

        toast.error("Erro inesperado ao salvar questões do teste", {
          position: POSITION.BOTTOM_RIGHT,
        })

        return
      }

      const { id: questionItemId } = resultCreateItemQuestion.data.createItemQuestion

      console.log(`Created item question: ${questionItemId}`)
    }
  }

  if (someError) {
    toast.error('Erro inesperado aconteceu. Tente novamente mais tarde', {
      position: POSITION.BOTTOM_RIGHT,
    })

    return
  }

  toast.success('Teste cadastrado com sucesso. Redirecionando para página de testes', {
    position: POSITION.BOTTOM_RIGHT,
  })

  router.go(-1)
};

const addQuestion = (): void => {
  test.value.questions.push({
    description: '',
    items: [
      { description: '', courseId: null },
    ],
  });
};

const addItem = (questionIndex: number): void => {
  test.value.questions[questionIndex].items.push({ description: '', courseId: null });
};

const removeItem = (questionIndex: number, itemIndex: number): void => {
  test.value.questions[questionIndex].items.splice(itemIndex, 1);
};

const removeQuestion = (questionIndex: number): void => {
  test.value.questions.splice(questionIndex, 1);
};
</script>
