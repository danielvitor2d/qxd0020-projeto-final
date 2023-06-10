<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'apollo-boost'
import { computed, onBeforeMount } from 'vue'

import LoadingComponent from '@/components/LoadingComponent.vue'
import TestCard from '@/components/TestCard.vue'
import type { Test } from '@/types/test'

const GET_TESTS_QUERY = gql`
  query {
    getAllTests {
      id
      description
    }
  }
`

const { result, loading, refetch } = useQuery<{
  getAllTests: Array<Test>
}>(GET_TESTS_QUERY)

const tests = computed(() => result.value?.getAllTests)

onBeforeMount(() => {
  refetch()
})
</script>

<template>
  <LoadingComponent v-if="loading">Carregando...</LoadingComponent>
  <article v-else class="container mx-auto py-8">
    <h1 class="text-3xl font-semibold mb-8">Testes Vocacionais</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <TestCard
        v-for="test in tests"
        :key="test.id as string"
        :test="test"
        class="animate-fadeIn"
      ></TestCard>
    </div>
  </article>
</template>