<template>
  <LoadingComponent v-if="loading">Carregando...</LoadingComponent>
  <div v-else class="container mx-auto py-8">
    <h1 class="text-3xl font-semibold mb-8">Visualizar Cursos</h1>
    <EmptyData v-if="tests?.length === 0" :primary=true></EmptyData>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <AdminTestCard v-for="test in tests" :key="test.id as string" :test="test" class="animate-fadeIn"></AdminTestCard>
    </div>
    <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-8 animate-fadeIn">
      Novo departamento
    </button>
  </div>
</template>

<script setup lang="ts">
import EmptyData from '@/components/EmptyData.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import type { Course } from '@/types/course';
import { useQuery } from '@vue/apollo-composable';
import { gql } from 'apollo-boost';
import { computed, onBeforeMount } from 'vue';

const GET_COURSES_QUERY = gql`
  query {
    getAllCourses {
      id
      name
      university
    }
  }
`

const { result, loading, refetch } = useQuery<{
  getAllCourses: Array<Course>
}>(GET_COURSES_QUERY)

const tests = computed(() => result.value?.getAllCourses)

onBeforeMount(() => {
  refetch()
})
</script>