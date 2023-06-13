<template>
  <div class="bg-[#FEFEFE] h-[calc(100vh-4rem)] w-screen flex items-center justify-center">
    <div class="p-10 bg-[#00235B] w-fit h-fit flex flex-col items-center justify-center rounded-md">
      <div class="text-white text-4xl mb-6">Resultado do Teste Vocacional</div>
      
      <div class="flex flex-col items-center space-y-4">
        <div class="flex flex-col items-center space-y-2">
          <!-- <img class="w-32 h-32 rounded-full object-cover" :src="`https://cataas.com/cat`" :alt="course.name" /> -->
          <div class="text-white text-2xl">{{ courseName }}</div>
          <div class="text-white text-2xl">{{ university }}</div>
        </div>
        
        <div class="text-white text-lg">{{ percentageValue }}</div>
        
        <div class="flex space-x-4">
          <div class="flex flex-col items-center">
            <div class="text-white text-xl">Compatibilidade</div>
            <div class="text-green-500 text-2xl">{{ 'Alta' }}</div>
          </div>
          
          <div class="flex flex-col items-center">
            <div class="text-white text-xl">Nº de Perguntas</div>
            <div class="text-green-500 text-2xl">{{ numQuestionsCourse + '/' + numQuestions }}</div>
          </div>
        </div>
        
        <router-link to="/tests" class="bg-green-500 text-white px-4 py-2 rounded-md text-xl mt-4 hover:bg-green-600">Fazer outro teste</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { gql } from 'apollo-boost';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { formatPercentage } from '@/utils/formatPercentage';
import { getCoursesAndPercentages } from '@/utils/getCoursesAndPercentages';

  interface UserResponse {
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
          university: string
        }
      }
    }>
  }

  const GET_USER_RESPONSE = gql`
    query GetUserResponseTest($testId: String!, $userId: String!, $createdAt: String!) {
      getUserResponseTest(
        userId: $userId,
        testId: $testId,
        createdAt: $createdAt
    ) {
        testId
        userId
        createdAt
        responses {
          id
          itemQuestion {
            course {
              name
              university
            }
          }
        }
      }
    }
  `;

  const { currentRoute: { value: { params: { userId, testId, createdAt } } } } = useRouter()

  const { result, onResult } = useQuery(GET_USER_RESPONSE, {
    userId,
    testId,
    createdAt: new Date(Number(createdAt)).toISOString()
  })

  const university = ref('')
  const courseName = ref('')
  const numQuestions = ref(0)
  const numQuestionsCourse = ref(0)
  const percentageValue = ref('')

  onResult(() => {
    if (!result.value) return

    const userResponse = result.value.getUserResponseTest as UserResponse

    const [course, percentage] = getCoursesAndPercentages(userResponse.responses.map(response => response.itemQuestion.course.name))

    courseName.value = course
    percentageValue.value = formatPercentage(percentage, 1)

    numQuestions.value = userResponse.responses.length
    numQuestionsCourse.value = userResponse.responses.reduce((prev: number, curr) => prev + (curr.itemQuestion.course.name === course ? 1 : 0), 0)

    userResponse.responses.forEach(response => {
      if (response.itemQuestion.course.name === course) {
        university.value = response.itemQuestion.course.university
      }
    })
  })
</script>