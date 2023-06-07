<template>
  <div
    class="flex items-center justify-center h-screen bg-gradient-to-br from-blue-600 to-indigo-700"
  >
    <div class="bg-white rounded-xl shadow-xl p-10">
      <h1 class="text-4xl font-semibold text-gray-900 mb-8">Recuperação de Senha</h1>
      <form class="space-y-6">
        <h5 class="font-normal text-md text-gray-900 text-start mt-5 mb-2">
          Insira seu e-mail para recuperar sua senha
        </h5>
        <input
          class="bg-gray-200 text-gray-900 w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          id="username"
          name="username"
          v-model="username"
          placeholder="Digite seu e-mail aqui"
        />
        <button
          id="redefinir"
          class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg w-full transition duration-300 ease-in-out"
          @click.prevent="recuperacaoDeSenha"
        >
          Redefinir senha
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { useRouter } from 'vue-router';

// const route = useRoute()
// const router = useRouter()

const username = ref('')

const recuperacaoDeSenha = () => {}
</script>
