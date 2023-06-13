<template>
  <div
    class="flex items-center justify-center h-screen bg-gradient-to-br from-blue-600 to-indigo-700"
  >
    <div class="w-[30rem] bg-white rounded-xl shadow-xl p-10">
      <h1 class="text-4xl font-semibold text-gray-900 mb-8">Cadastrar</h1>
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
<!-- 
        <input
          v-model="values.birthDate"
          type="date"
          placeholder="Data de Nascimento"
          class="bg-gray-200 text-gray-900 w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': errors['birthDate'] }"
          v-validate="'required'"
        />
        <ErrorMessage class="text-red-500" name="birthDate" /> -->

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

        <div class="flex flex-col gap-1 animate-fadeIn">
          <Field
            name="password"
            type="password"
            v-model="password.value"
            placeholder="Senha"
            rules="required"
            class="w-full bg-gray-200 text-gray-900 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage class="text-sm text-red-500" name="password" />
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
</template>

<script setup lang="ts">
import { email, numeric, required } from '@vee-validate/rules';
import { useMutation } from '@vue/apollo-composable';
import { gql } from 'apollo-boost';
import { ErrorMessage, Field, Form, defineRule, useField } from 'vee-validate';
import { useRouter } from 'vue-router';
import { POSITION, useToast } from 'vue-toastification';

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
const password = useField('password')

const router = useRouter()
const toast = useToast()

const REGISTER_MUTATION = gql`
  mutation Register($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      name
    }
  }
`

const { mutate } = useMutation(REGISTER_MUTATION)

async function onSubmit() {
  try {
    const result = await mutate({
      createUserInput: {
        name: name.value,
        email: userEmail.value,
        phonenumber: phoneNumber.value,
        password: password.value,
        roles: "student"
      }
    })

    if (!result?.data || result.errors) {
      return toast.error('Erro ao se cadastrar. Tente novamente mais tarde.', {
        position: POSITION.BOTTOM_RIGHT
      })
    }

    toast.success('Cadastrado. Redirecionando para tela de login.', {
      position: POSITION.BOTTOM_RIGHT,
    })

    setTimeout(() => router.replace('/auth/login'), 1000)
  } catch (error) {
    console.log(error)
    return toast.error('Erro ao se cadastrar. Tente novamente mais tarde.', {
      position: POSITION.BOTTOM_RIGHT
    })
  }
}

</script>
