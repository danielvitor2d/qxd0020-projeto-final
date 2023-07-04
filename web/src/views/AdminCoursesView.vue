<template>
  <LoadingComponent v-if="loading">Carregando...</LoadingComponent>
  <div v-else class="container mx-auto py-8">
    <h1 class="text-4xl font-bold text-zinc-700 mb-8">Cursos</h1>
    <EmptyData v-if="departments?.length === 0" :primary=true></EmptyData>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
      <div v-for="department in departments" :key="department.name" class="w-full bg-gray-200 rounded-lg shadow-md hover:shadow-xl transition">
        <div class="w-full pr-4 flex flex-row justify-between items-center">
          <h2 class="text-lg font-semibold text-zinc-700 p-4">{{ department.name }}</h2>
          <button @click="() => router.push({ name: 'EditDepartmentPage', params: { id: department.id } })" class="h-fit bg-blue-600 hover:bg-blue-700 px-3 py-2 text-white rounded-lg animate-fadeIn shadow-md hover:shadow-lg transition">
            Editar
          </button>
        </div>
        <div class="grid grid-cols-1 gap-4 p-4">
          <div v-for="course in department.courses" :key="course.id" class="bg-white p-2 rounded-md shadow-sm hover:shadow-lg transition">
            <p class="text-sm text-gray-600">{{ course.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <button @click="() => router.push({ name: 'CreateDepartmentPage' })" class="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg mt-8 animate-fadeIn shadow-md hover:shadow-lg transition">
      Novo departamento
    </button>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { gql } from 'apollo-boost';
import { computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

import EmptyData from '@/components/EmptyData.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import type { Course } from '../types/course';

const router = useRouter()

const GET_DEPARTMENTS_QUERY = gql`
  query {
    getAllDepartments {
      id
      name
      courses {
        name
      }
    }
  }
`

const { result, loading, refetch } = useQuery<{
  getAllDepartments: Array<{
    id: string
    name: string
    courses: Array<Course>
  }>
}>(GET_DEPARTMENTS_QUERY)

const departments = computed(() => result.value?.getAllDepartments)

onBeforeMount(() => {
  refetch()
})
</script>