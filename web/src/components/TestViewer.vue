<template>
  <LoadingComponent v-if="loading">Carregando...</LoadingComponent>
  <div v-else class="container mx-auto py-8">
    <h1 class="text-3xl font-semibold mb-8">Visualizar Testes</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <TestCard v-for="test in tests" :key="test.id as string" :test="test" />
    </div>
    <button
      class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-8"
      @click="registerNewTest"
    >
      Registrar novo teste
    </button>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'apollo-boost'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import type { Test } from '@/types/test'
import LoadingComponent from './LoadingComponent.vue'
import TestCard from './TestCard.vue'

const router = useRouter()

const registerNewTest = () =>
  router.push({
    name: 'CreateTestPage'
  })

const GET_TESTS_QUERY = gql`
  query {
    getAllTests {
      id
      description
    }
  }
`

const { result, loading } = useQuery<{
  getAllTests: Array<Test>
}>(GET_TESTS_QUERY)

const tests = computed(() => result.value?.getAllTests)
</script>
