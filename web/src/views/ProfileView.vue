<template>
  <ErrorMessage v-if="error" name="Erro ao buscar dados do usuário"></ErrorMessage>
  <main v-else>
    <LoadingComponent v-if="loading"></LoadingComponent>
    <div
      v-else
      class="flex items-center justify-center h-screen bg-gradient-to-br from-blue-600 to-indigo-700"
    >
      <div class="w-[30rem] bg-white rounded-xl shadow-xl p-10">
        <h1 class="text-4xl font-semibold text-gray-900 mb-8">Perfil do Usuário</h1>
        <Form @submit="onSubmit" class="flex flex-col gap-4">
          <div class="flex flex-col gap-1 animate-fadeIn">
            <Field
              name="name"
              type="text"
              v-model="name.value"
              placeholder="Nome"
              rules="required"
              class="w-full bg-gray-200 text-gray-900 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage class="text-sm text-red-500" name="name" />
          </div>

          <div class="flex flex-col gap-1 animate-fadeIn">
            <Field
              name="userEmail"
              type="email"
              v-model="userEmail.value"
              placeholder="E-mail"
              rules="required|email"
              class="w-full bg-gray-200 text-gray-900 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage class="text-sm text-red-500" name="userEmail" />
          </div>

          <div class="flex flex-col gap-1 animate-fadeIn">
            <Field
              name="phoneNumber"
              type="phonenumber"
              v-model="phoneNumber.value"
              placeholder="Telefone"
              rules="required|phone"
              class="w-full bg-gray-200 text-gray-900 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage class="text-sm text-red-500" name="phoneNumber" />
          </div>

          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg w-full transition duration-300 ease-in-out"
          >
            Criar conta
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { email, numeric, required } from '@vee-validate/rules';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { gql } from 'apollo-boost';
import { ErrorMessage, Field, Form, defineRule, useField } from 'vee-validate';
import { POSITION, useToast } from 'vue-toastification';

import LoadingComponent from '@/components/LoadingComponent.vue';

defineRule('required', (value: any) => {
  if (!required(value)) return 'Campo obrigatório'
  return true
})

defineRule('email', (value: any) => {
  if (!email(value)) return 'E-mail inválido'
  return true
})

defineRule('phone', (value: any) => {
  if (!numeric(value)) return 'Telefone inválido'
  return true
})

const name = useField( 'name')
const userEmail = useField('userEmail')
const phoneNumber = useField('phoneNumber')

const toast = useToast()

const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      email
      phonenumber
    }
  }
`;

const SAVE_MUTATION = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      name
      email
      phonenumber
    }
  }
`

const { mutate } = useMutation(SAVE_MUTATION)

const { result, loading, error, onResult } = useQuery(GET_USER)

onResult(() => {
  if (result.value) {
    name.setValue(result.value.user.name)
    userEmail.setValue(result.value.user.email)
    phoneNumber.setValue(result.value.user.phonenumber)
  }
})

async function onSubmit() {
  try {
    const result = await mutate({
      createUserInput: {
        name: name.value,
        email: userEmail.value,
        phonenumber: phoneNumber.value,
        roles: "student"
      }
    })

    if (!result?.data || result.errors) {
      return toast.error('Erro ao salvar dados. Tente novamente mais tarde.', {
        position: POSITION.BOTTOM_RIGHT
      })
    }

    toast.success('Dados salvos.', {
      position: POSITION.BOTTOM_RIGHT,
    })
  } catch (error) {
    console.log(error)
    return toast.error('Erro ao salvar dados. Tente novamente mais tarde.', {
      position: POSITION.BOTTOM_RIGHT
    })
  }
}

</script>
