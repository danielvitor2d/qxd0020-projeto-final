<template>
  <ErrorPage v-if="error" error-message="Erro ao buscar teste. Volte para a tela inicial e tente novamente."></ErrorPage>
  <main>
    <LoadingComponent v-if="loading">Carregando...</LoadingComponent>
    <div v-else>
      <router-link to="/" v-if="error" class="text-blue-500 hover:underline">Erro! Volte para a Home</router-link>
      <div v-else class="min-h-[calc(100vh-4rem)] bg-[#F5F5F5] flex items-center justify-center py-4">
        <div class="bg-white rounded-lg shadow-lg p-6 w-full sm:w-1/2">
          <h2 class="text-2xl font-semibold mb-4">Detalhes do Teste</h2>

          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Descrição:</h3>
            <p class="text-gray-800">{{ test?.description }}</p>
          </div>

          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Perguntas:</h3>
            <ul class="list-disc pl-6">
              <li v-for="questao in test?.questions" :key="questao.id">
                <h4 class="text-base font-semibold mb-2">{{ questao.description }}</h4>
                <ul class="list-disc pl-6">
                  <li v-for="item in questao.questionItems" :key="item.id">
                    <h5 class="text-sm font-semibold mb-1">{{ item.description }}</h5>
                    <p class="text-gray-600">{{ item.course.name }}</p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <button
            @click="onEdit"
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition-colors duration-300"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { gql } from 'apollo-boost';
import { computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

import ErrorPage from '@/components/ErrorPage.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';

const GET_TEST_QUERY = gql`
  query GetTestById($id: String!) {
    getTestById(id: $id) {
      description
      questions {
        id
        description
        questionItems {
          description
          course {
            name
          }
        }
      }
    }
  }
`

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
}

interface Test {
  description: string
  questions: Question[]
}

const {
  currentRoute: {
    value: {
      params: { id }
    }
  },
  push
} = useRouter()

const { result, loading, error, refetch } = useQuery<QueryResult>(GET_TEST_QUERY, {
  id: id as string
})

const test = computed(() => result.value?.getTestById)

function onEdit() {
  push({
    name: 'EditTestSingle',
    params: {
      id
    }
  })
}

onBeforeMount(() => {
  refetch()
})
</script>

<style>
button:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}
</style>