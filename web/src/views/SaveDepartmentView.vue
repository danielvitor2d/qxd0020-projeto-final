<template>
  <div class="w-full flex flex-col items-center py-8">
    <h1 class="text-3xl font-semibold mb-8">
      Criar departamento
    </h1>
    <form class="w-3/5" @submit.prevent.stop="saveDepartment">
      <div class="mb-4 animate-fadeIn">
        <label for="title" class="block text-gray-700 font-semibold mb-2">Nome do Departamento:</label>
        <input
          v-model="department.description"
          type="text"
          id="title"
          class="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div class="animate-fadeIn">
        <div v-for="(course, index) in department.courses" :key="index" class="mb-4">
          <h2 class="mb-2 font-bold">Curso {{ index + 1 }}</h2>
          <div class="flex items-center mb-4">
            <input
              v-model="course.name"
              type="text"
              class="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              @click.prevent.stop="removeCourse(index)"
              class="text-red-500 hover:text-red-600 ml-2"
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
        <button
          @click.prevent.stop="addCourse"
          class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
        >
          Adicionar Curso
        </button>
      </div>
      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-8 animate-fadeIn">
        {{ isEdit ? 'Salvar alterações' : 'Criar Departamento' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
  import DeleteIcon from '@/components/DeleteIcon.vue';
import { ref } from 'vue';
import { POSITION, useToast } from 'vue-toastification';

  const toast = useToast()

  const isEdit = false

  const department = ref({
    description: "",
    courses: [
      {
        name: ""
      },
      {
        name: ""
      },
    ]
  })

  async function saveDepartment() {
    if (department.value.description.length < 3) {
      return toast.error('O nome do departamento deve ter no mínimo 3 caracteres.', {
        position: POSITION.BOTTOM_RIGHT
      })
    }

    if (department.value.courses.length === 0) {
      return toast.error('O departamento deve ter no mínimo 1 curso.', {
        position: POSITION.BOTTOM_RIGHT
      })
    }

    if (department.value.courses.some((course) => course.name.length < 3)) {
      return toast.error('O nome dos cursos deve ter no mínimo 3 caracteres.', {
        position: POSITION.BOTTOM_RIGHT
      })
    }

    toast.info('Salvando departamento...', {
      position: POSITION.BOTTOM_RIGHT
    })

    createDepartment()
  }

  async function createDepartment() {
    
  }

  function addCourse() {
    department.value.courses.push({
      name: ""
    })
  }

  function removeCourse(index: number) {
    department.value.courses.splice(index, 1)
  }
</script>