<template>
  <div
    class="w-full flex items-center justify-center h-screen bg-gradient-to-br from-blue-600 to-indigo-700"
  >
    <div class="w-[30rem] bg-white rounded-xl shadow-xl p-10">
      <h1 class="text-4xl font-semibold text-gray-900 mb-8">Login</h1>

      <Form @submit="onSubmit" class="flex flex-col gap-4">
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
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Entrar
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { email, required } from '@vee-validate/rules'
import { ErrorMessage, Field, Form, defineRule, useField } from 'vee-validate'
import { useRouter } from 'vue-router'
import { POSITION, useToast } from 'vue-toastification'

import { login } from '@/api/mutations'
import { useAuthStore } from '@/stores/authStore'

const toast = useToast()

defineRule('required', (value: any) => {
  if (!required(value)) return 'Campo obrigatório'
  return true
})

defineRule('email', (value: any) => {
  if (!email(value)) return 'E-mail inválido'
  return true
})

const router = useRouter()

const userEmail = useField('userEmail')
const password = useField('password')

const onSubmit = async () => {
  try {
    const email = userEmail.value as unknown as string
    const pwd = password.value as unknown as string

    const access_token = await login(email, pwd)
    // console.log(access_token)

    if (!access_token) {
      return toast.error('E-mail ou senha inválidos', {
        position: POSITION.BOTTOM_RIGHT
      })
    }

    toast.success('Autorizado. Redirecionando para tela inicial.', {
      position: POSITION.BOTTOM_RIGHT,
    })

    const authStore = useAuthStore()

    authStore.setToken(access_token)

    setTimeout(() => router.replace('/'), 1000)
  } catch (error) {
    console.log(error)
    return toast.error('E-mail ou senha inválidos', {
      position: POSITION.BOTTOM_RIGHT
    })
  }
}
</script>
