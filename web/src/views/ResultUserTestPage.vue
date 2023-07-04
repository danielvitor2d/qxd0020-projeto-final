<template>
  <LoadingComponentVue v-if="loading" />
  <div v-else class="bg-gradient-to-br from-[#00235B] via-[#003976] to-[#0F9B8E] h-[calc(100vh-4rem)] flex items-center justify-center">
    <div class="p-10 bg-white w-[34rem] h-[fit-content] flex flex-col items-center justify-center rounded-md shadow-lg">
      <div class="text-zinc-800 font-extrabold text-4xl mb-6">Resultado do Teste Vocacional</div>
      
      <div v-if="courses.length > 0" class="w-full flex flex-col items-center space-y-6">
        <div v-for="(course, index) of courses" :key="course.course" class="w-full flex flex-row justify-between gap-2">
          <div class="text-zinc-800 text-xl">{{ index + 1 }}º Lugar:</div>
          <div class="max-w-1/2 text-green-500 text-xl">{{ `${course.course} (${formatPercentage(course.percentage, 1)})` }}</div>
        </div>

        <router-link to="/tests" class="bg-green-500 text-white px-4 py-2 rounded-md text-xl mt-4 hover:bg-green-600 transition-all">Fazer outro teste</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useQuery } from '@vue/apollo-composable';
import { gql } from 'apollo-boost';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

  import type LoadingComponentVue from '@/components/LoadingComponent.vue';
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
            }
          }
        }
      }
    }
  `;

  const { currentRoute: { value: { params: { userId, testId, createdAt } } } } = useRouter()

  const { result, onResult, loading } = useQuery(GET_USER_RESPONSE, {
    userId,
    testId,
    createdAt: new Date(Number(createdAt)).toISOString()
  })

  const courses = ref<Array<{
    course: string,
    percentage: number,
  }>>([])

  onResult(() => {
    if (!result.value) return

    const userResponse = result.value.getUserResponseTest as UserResponse

    let allCourses = getCoursesAndPercentages(userResponse.responses.map(response => response.itemQuestion.course.name))
    const total = allCourses.reduce((prev, curr) => prev + curr.quantity, 0)

    // console.log(allCourses)

    courses.value = allCourses.slice(0, 3).map(c => ({ course: c.course, percentage: c.quantity / total }))

    // courseName.value = course
    // percentageValue.value = formatPercentage(percentage, 1)

    // numQuestions.value = userResponse.responses.length
    // numQuestionsCourse.value = userResponse.responses.reduce((prev: number, curr) => prev + (curr.itemQuestion.course.name === course ? 1 : 0), 0)
  })
</script>