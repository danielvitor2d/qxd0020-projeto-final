<template>
  <ErrorPage v-if="error" error-message="Erro ao buscar histórico. Volte para a tela inicial e tente novamente."></ErrorPage>
  <main>
    <LoadingComponent v-if="loading">Carregando...</LoadingComponent>
    <div v-else class="w-screen h-[calc(100vh-4rem)] flex items-center justify-center">
      <div class="w-fit p-5 rounded-md bg-[#385898] flex flex-col items-center justify-center">
        <div class="text-white text-4xl mb-6">Histórico de Respostas</div>
        
        <EmptyData v-if="answers.length === 0" :primary="false"></EmptyData>
        <div v-else class="w-fit grid grid-cols-3 gap-4">
          <div v-for="answer in answers" :key="answer.id" class="w-96 bg-white rounded-md p-4 mb-4 shadow-md flex items-center space-x-4">
            <div class="flex flex-col">
              <div class="text-xl">{{ answer.testName }}</div>
              <div class="text-gray-500">{{ formatDate(new Date(answer.date)) }}</div>
              <div class="text-green-500">{{ answer.course }}</div>
            </div>
            
            <div class="flex-1 text-right">
              <div class="text-4xl text-green-500">{{ answer.percentage }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import ErrorPage from '@/components/ErrorPage.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import { useAuthStore } from '@/stores/authStore';
import { useQuery } from '@vue/apollo-composable';
import { gql } from 'apollo-boost';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import EmptyData from '@/components/EmptyData.vue';
import { getCoursesAndPercentages } from '@/utils/getCoursesAndPercentages';
import { formatDate } from '../utils/formatDate';
import { formatPercentage } from '../utils/formatPercentage';

const GET_USER_RESPONSE_BY_USER_AND_TEST = gql`
  query GetUserResponseTestsByUserIdAndTestId($userId: String!, $testId: String!) {
    getUserResponseTestsByUserIdAndTestId(userId: $userId, testId: $testId) {
      testId
      test {
        description
      }
      userId
      createdAt
      responses {
        itemQuestion {
          course {
            name
          }
        }
    }
    }
  }
`;

type UserResponses = Array<{
  testId: string,
  test: {
    description: string
  },
  userId: string,
  createdAt: string,
  responses: Array<{
    itemQuestion: {
      course: {
        name: string
      }
    }
  }>
}>

interface AnswerResume {
  id: string;
  testName: string;
  date: string;
  course: string;
  percentage: string;
}

const authStore = useAuthStore()
const { currentRoute: { value: { params: { id } } } } = useRouter()

const userId = authStore.getUserId()

const { result, loading, error, onResult } = useQuery(GET_USER_RESPONSE_BY_USER_AND_TEST, {
  userId,
  testId: id
});

const answers = ref<Array<AnswerResume>>([])

onResult(() => {
  if (!result.value) return

  const userResponses = result.value.getUserResponseTestsByUserIdAndTestId as UserResponses

  for (const userResponse of userResponses) {
    const allCourses = getCoursesAndPercentages(userResponse.responses.map(response => response.itemQuestion.course.name))
    const total = allCourses.reduce((prev, curr) => prev + curr.quantity, 0)

    answers.value.push({
      id: `${userResponse.testId}-${userResponse.userId}-${userResponse.createdAt}`,
      testName: userResponse.test.description,
      date: userResponse.createdAt,
      course: allCourses[0].course,
      percentage: formatPercentage(allCourses[0].quantity / total, 1)
    })
  }

})
</script>