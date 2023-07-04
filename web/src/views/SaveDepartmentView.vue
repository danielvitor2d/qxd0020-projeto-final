<template>
  <LoadingComponent v-if="getDepartmentLoading" />
  <div v-else class="w-full flex flex-col items-center py-8">
    <h1 class="text-3xl font-semibold mb-8">
      {{ isEdit ? 'Editar departamento' : 'Criar departamento' }}
    </h1>
    <form class="w-3/5" @submit.prevent.stop="saveDepartment">
      <div class="mb-4 animate-fadeIn">
        <label for="title" class="block text-gray-700 font-semibold mb-2">Nome do Departamento:</label>
        <input
          v-model="department.name"
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
              placeholder="Nome do curso"
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
  import { useMutation, useQuery } from '@vue/apollo-composable';
import { gql } from 'apollo-boost';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { POSITION, useToast } from 'vue-toastification';

  import DeleteIcon from '@/components/DeleteIcon.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import type { Department } from '@/types/department';

  const router = useRouter()

  const isEdit = router.currentRoute.value.params.id ? true : false

  interface QueryResult {
    getDepartmentById: Department
  }

  const GET_DEPARTMENT_QUERY = gql`
    query GetDepartmentById($id: String!) {
      getDepartmentById(id: $id) {
        id
        name
        courses {
          id
          name
        }
      }
    }
  `

  const REGISTER_DEPARTMENT_MUTATION = gql`
    mutation CreateDepartment($input: CreateDepartmentDto!) {
      createDepartment(input: $input) {
        id
        name
      }
    }
  `

  const REGISTER_COURSE_MUTATION = gql`
    mutation CreateCourse($input: CreateCourseDto!) {
      createCourse(input: $input) {
        id
        name
      }
    }
  `

  const UPDATE_DEPARTMENT_MUTATION = gql`
    mutation UpdateDepartment($id: String!, $input: UpdateDepartmentDto!) {
      updateDepartment(id: $id, input: $input) {
        id
      }
    }
  `

  const UPDATE_COURSE_MUTATION = gql`
    mutation UpdateCourse($id: String!, $input: UpdateCourseDto!) {
      updateCourse(id: $id, input: $input) {
        id
      }
    }
  `

  const DELETE_COURSE_MUTATION = gql`
    mutation DeleteCourse($id: String!) {
      deleteCourse(id: $id) {
        id
      }
    }
  `

  // getDepartmentByid
  const {
    result: getDepartmentResult,
    loading: getDepartmentLoading,
    onResult
  } = useQuery<QueryResult>(GET_DEPARTMENT_QUERY, {
    id: router.currentRoute.value.params.id
  })

  onResult(() => {
  if (!getDepartmentResult.value?.getDepartmentById) return

  department.value = {
    id: getDepartmentResult.value?.getDepartmentById.id,
    name: getDepartmentResult.value?.getDepartmentById.name,
    courses: [
      // eslint-disable-next-line no-unsafe-optional-chaining
      ...getDepartmentResult.value?.getDepartmentById.courses.map((course) => ({
        id: course.id,
        name: course.name
      }))
    ]
  }
  })

  // registerDepartment
  const { mutate: createDepartmentMutate } = useMutation(REGISTER_DEPARTMENT_MUTATION)
  
  // registerCourse
  const { mutate: createCourseMutate } = useMutation(REGISTER_COURSE_MUTATION)

  // updateDepartment
  const { mutate: updateDepartmentMutate } = useMutation(UPDATE_DEPARTMENT_MUTATION)

  // updateCourse
  const { mutate: updateCourseMutate } = useMutation(UPDATE_COURSE_MUTATION)

  const { mutate: deleteCourseMutate } = useMutation(DELETE_COURSE_MUTATION)

  const toast = useToast()

  const removedCoursesId = ref<Array<string>>([])

  const department = ref<Department>({
    id: null,
    name: "",
    courses: [
      {
        id: '',
        name: "",
      },
    ]
  })

  async function saveDepartment() {
    if (department.value.name.length < 3) {
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

    isEdit ? updateDepartment() : createDepartment()
  }

  async function createDepartment() {
    const resultCreateDepartment = await createDepartmentMutate({
      input: {
        name: department.value.name,
      }
    })

    if (!resultCreateDepartment?.data || resultCreateDepartment.errors) {
      console.error(resultCreateDepartment?.errors?.map((error) => error.message))

      return toast.error('Erro inesperado ao salvar departamento.', {
        position: POSITION.BOTTOM_RIGHT
      })
    }

    const { id: departmentId } = resultCreateDepartment.data.createDepartment

    for await (const course of department.value.courses) {
      const resultCreateCourse = await createCourseMutate({
        input: {
          name: course.name,
          departmentId
        }
      })

      if (!resultCreateCourse?.data || resultCreateCourse?.errors) {
        console.error(resultCreateCourse?.errors?.map((error) => error.message))

        return toast.error('Erro inesperado ao salvar cursos desse departamento.', {
          position: POSITION.BOTTOM_RIGHT
        })
      }
    }

    toast.success('Departamento salvo! Redirecionando para a listagem de departamentos.', {
      position: POSITION.BOTTOM_RIGHT
    })

    setTimeout(() => router.go(-1), 1000)
  }

  async function updateDepartment() {
    const resultUpdateDepartment = await updateDepartmentMutate({
      id: department.value.id,
      input: {
        name: department.value.name
      }
    })

    if (!resultUpdateDepartment?.data || resultUpdateDepartment?.errors) {
      console.error(resultUpdateDepartment?.errors?.map((error) => error.message))

      return toast.error('Erro ao atualizar departamento.', {
        position: POSITION.BOTTOM_RIGHT
      })
    }

    for await (const course of department.value.courses) {
      if (course.id) {
        const resultUpdateCourse = await updateCourseMutate({
          id: course.id,
          input: {
            name: course.name,
            departmentId: department.value.id,
          }
        })

        if (!resultUpdateCourse?.data || resultUpdateCourse?.errors) {
          console.error(resultUpdateCourse?.errors?.map((error) => error.message))

          return toast.error('Erro ao atualizar cursos.', {
            position: POSITION.BOTTOM_RIGHT
          })
        }
      } else {
        const resultCreateCourse = await createCourseMutate({
          input: {
            name: course.name,
            departmentId: department.value.id,
          }
        })

        if (!resultCreateCourse?.data || resultCreateCourse?.errors) {
          console.error(resultCreateCourse?.errors?.map((error) => error.message))

          return toast.error('Erro inesperado ao salvar cursos.', {
            position: POSITION.BOTTOM_RIGHT
          })
        }
      }
    }

    for await (const courseId of removedCoursesId.value) if (courseId) {
      const resultDeleteCourse = await deleteCourseMutate({
        id: courseId
      })

      if (!resultDeleteCourse?.data || resultDeleteCourse?.errors) {
        console.error(resultDeleteCourse?.errors?.map((error) => error.message))
      }
    }

    toast.success('Departamento atualizado! Redirecionando para a listagem de departamentos.', {
      position: POSITION.BOTTOM_RIGHT
    })

    setTimeout(() => router.replace({ name: 'AdminCoursesPage' }), 1000)
  }

  function addCourse() {
    department.value.courses.push({
      id: '',
      name: "",
    })
  }

  function removeCourse(index: number) {
    if (department.value.courses[index].id) {
      removedCoursesId.value.push(department.value.courses[index].id)
    }
    department.value.courses.splice(index, 1)
  }
</script>