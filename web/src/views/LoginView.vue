<template>
  <div class="w-full flex items-center justify-center h-screen bg-gradient-to-br from-blue-600 to-indigo-700">

    <div class="w-[30rem] bg-white rounded-xl shadow-xl p-10">

      <h1 class="text-4xl font-semibold text-gray-900 mb-8">Login</h1>

      <form class="space-y-6">
        <input
          type="text"
          placeholder="Email"
          class="w-full bg-gray-200 text-gray-900 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Senha"
          class="w-full bg-gray-200 text-gray-900 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
import { useRouter } from 'vue-router';

  // const route = useRoute()
  const router = useRouter()

  const username = ref('')
  const password = ref('')

  const login = () => {
    
  }

  const goBack = () => {
    router.go(-1)
  }
</script>
 