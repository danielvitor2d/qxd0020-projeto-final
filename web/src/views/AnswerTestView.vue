<template>
  <ErrorPage v-if="error" error-message="Erro ao buscar teste. Volte para a tela inicial e tente novamente."></ErrorPage>
  <main v-else>
    <LoadingComponent v-if="loading">Carregando...</LoadingComponent>
    <div v-else class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div class="w-3/4 px-8 py-8 bg-white shadow-lg rounded-lg">
        <h2 class="text-3xl font-bold mb-6 text-gray-900">{{ result?.getTestById.description }}</h2>
        <div class="flex flex-col gap-12">
          <div class="h-min flex">
            <div
              v-for="(question, index) in questions"
              :key="index"
              :class="`px-4 py-2 cursor-pointer ${
                activeQuestionIndex === index ? 'bg-blue-500 text-white' : !question.answered ? 'bg-gray-300' :'bg-green-500 text-white'
              } rounded-t-lg mr-2 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white`"
              @click="setActiveQuestion(index)"
              @keydown.arrow-down="handleArrowDown(index)"
              @keydown.arrow-up="handleArrowUp(index)"
              tabindex="0"
            >
              {{ index + 1 }}
            </div>
          </div>
          <Transition name="slide-left" mode="out-in">
            <div v-if="activeQuestion" :key="activeQuestionIndex" class="mb-8">
              <h3 class="text-lg font-semibold mb-4 text-gray-900">{{ activeQuestion.description }}</h3>
              <div v-for="(item, itemIndex) in activeQuestion.questionItems" :key="itemIndex" class="flex items-center mb-4">
                <input
                  type="radio"
                  class="hidden"
                  :id="`item-${activeQuestionIndex}-${itemIndex}`"
                  :name="`question-${activeQuestionIndex}`"
                  :value="item"
                  v-model="activeQuestion.selectedOption"
                  @click="() => handleSelectItem(item)"
                />
                <label :for="`item-${activeQuestionIndex}-${itemIndex}`" class="text-gray-700 flex items-center cursor-pointer">
                  <div v-if="activeQuestion.selectedOption && activeQuestion.selectedOption.id === item.id" class="w-7 h-7 rounded-full border border-gray-300 mr-2 bg-blue-500 flex items-center justify-center">
                    <font-awesome-icon
                      icon="fa-check"
                      class="text-white"
                    />
                  </div>
                  <div v-else class="w-6 h-6 rounded-full border border-gray-300 mr-2"></div>
                  <span class="text-lg text-gray-700">{{ item.description }}</span>
                </label>
              </div>
            </div>
          </Transition>
        </div>
        <button
          v-if="!isLastQuestion"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          @click="handleNext"
        >
          Próximo
        </button>
        <button
          v-else
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          @click="finishTest"
        >
          Finalizar teste
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useMutation, useQuery } from '@vue/apollo-composable';
import { gql } from 'apollo-boost';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { POSITION, useToast } from 'vue-toastification';

import ErrorPage from '@/components/ErrorPage.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/authStore';

const activeIndex = ref(0);

function handleArrowDown(this: any, index: number) {
  activeIndex.value = (index + 1) % questions.value.length;
  (this.$refs.activeItem as HTMLElement).focus(); // Manter o elemento focado após a navegação
}

function handleArrowUp(this: any, index: number) {
  activeIndex.value = (index - 1 + questions.value.length) % questions.value.length;
  (this.$refs.activeItem as HTMLElement).focus(); // Manter o elemento focado após a navegação
}

interface Course {
  name: string
}

interface QueryResult {
  getTestById: Test
}

interface Item {
  id: string
  description: string
  course: Course
}

interface Question {
  id: string
  description: string
  questionItems: Item[]
  selectedOption: Item | null
  answered: boolean // Nova propriedade
}

interface Test {
  description: string
  questions: Question[]
}

const toast = useToast()

const GET_TEST_QUERY = gql`
  query GetTestById($id: String!) {
    getTestById(id: $id) {
      description
      questions {
        id
        description
        questionItems {
          id
          description
          course {
            name
          }
        }
      }
    }
  }
`

const REGISTER_USER_RESPONSE_TEST_MUTATION = gql`
  mutation CreateUserResponseTest($data: CreateUserResponseTestInput!) {
    createUserResponseTest(data: $data) {
      testId
      userId
      createdAt
      responses {
        id
        itemQuestionId
      }
    }
  }
`

const authStore = useAuthStore()

const {
  currentRoute: {
    value: {
      params: { id }
    }
  },
} = useRouter()

const { mutate } = useMutation(REGISTER_USER_RESPONSE_TEST_MUTATION)

const { result, loading, error, onResult } = useQuery<QueryResult>(GET_TEST_QUERY, {
  id: id as string
})

const questions = ref<Array<Question>>([])

onResult(() => {
  if (result.value) {
    questions.value = result.value?.getTestById.questions?.map(question => {
      return ({ ...question, selectedOption: null, answered: false }) // Atualiza para definir 'answered' como false para todas as perguntas
    })
  } else {
    questions.value = []
  }
})

const activeQuestionIndex = ref(0);

const activeQuestion = computed(() => questions.value[activeQuestionIndex.value]);

function setActiveQuestion(index: number) {
  activeQuestionIndex.value = index;
}

function handleSelectItem(option: Item) {
  questions.value[activeQuestionIndex.value].selectedOption = option
  questions.value[activeQuestionIndex.value].answered = true // Marca a pergunta como respondida
}

function checkAnswers() {
  if (questions.value.some(question => !question.selectedOption)) {
    return false
  }

  return true
}

async function finishTest() {
  if (!checkAnswers()) {
    return toast.error('Por favor, responda todas as questões.', {
      position: POSITION.BOTTOM_RIGHT
    })
  }

  const userId = authStore.getUserId()
  const testId = id
  const responses: Array<{
    itemQuestionId: string
  }> = []

  for (const question of questions.value) {
    const itemQuestionId = question.selectedOption?.id as string
    responses.push({
      itemQuestionId
    })
  }

  toast.info('Salvando informações da prova...', {
    position: POSITION.BOTTOM_RIGHT
  })

  const saveResponseUserTestResult = await mutate({
    data: {
      userId,
      testId,
      responses
    }
  })

  if (!saveResponseUserTestResult?.data || saveResponseUserTestResult.errors) {
    return toast.error('Erro ao salvar resposta. Tente novamente mais tarde.', {
      position: POSITION.BOTTOM_RIGHT,
    })
  }

  toast.success('Resposta salva. Redirecionando para página do resultado...', {
    position: POSITION.BOTTOM_RIGHT,
  })

  const userIdEncoded = encodeURIComponent(userId ?? '')
  const testIdEncoded = encodeURIComponent(testId as string)
  const createdAt = new Date(saveResponseUserTestResult?.data.createUserResponseTest.createdAt).getTime()

  setTimeout(() => router.push(`/result/${userIdEncoded}/${testIdEncoded}/${createdAt}`), 1000)
}

function handleNext() {
  if (activeQuestionIndex.value < questions.value.length - 1) {
    activeQuestionIndex.value++
  }
}

const isLastQuestion = computed(() => activeQuestionIndex.value === questions.value.length - 1)

</script>

<style>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.25s ease-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
