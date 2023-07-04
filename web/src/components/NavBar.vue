<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore()
const router = useRouter()

const dropdown = ref(null)
const isDropdownOpen = ref(false)

function logout() {
  authStore.clearToken()

  router.replace({
    name: 'LoginPage'
  })
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const handleClickOutside = (event: any) => {
  // @ts-ignore
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    isDropdownOpen.value = false
  }
}

watchEffect((onInvalidate) => {
  document.addEventListener('click', handleClickOutside)
  onInvalidate(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Variável reativa para controlar a exibição do botão
const showButton = ref(false);

// Função para rolar para o topo da página
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

// Função que será executada quando o componente for montado
onMounted(() => {
  // Adiciona um ouvinte de evento para verificar a posição da janela
  window.addEventListener('scroll', handleScroll);
});

// Função que será executada antes do componente ser desmontado
onBeforeUnmount(() => {
  // Remove o ouvinte de evento quando o componente for desmontado
  window.removeEventListener('scroll', handleScroll);
});

// Função para verificar a posição da janela e controlar a exibição do botão
function handleScroll() {
  showButton.value = window.scrollY > 200;
}
</script>

<template>
  <nav
    class="w-full h-[4rem] px-6 py-8 mx-auto md:flex md:justify-between md:items-center bg-[#007AC2]"
  >
    <div class="flex items-center justify-between">
      <router-link to="/" class="text-xl font-bold text-white md:text-2xl hover:text-blue-400">
        <img class="w-48 h-14" src="../assets/logo.png" alt="Logo UFC" />
      </router-link>
    </div>

    <ul
      class="flex flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
    >
      <li class="text-sm font-bold text-white hover:text-blue-400">
        <router-link to="/" class="block">Home</router-link>
      </li>
      <li class="text-sm font-bold text-white hover:text-blue-400">
        <router-link to="/courses" class="block">Cursos</router-link>
      </li>
      <li>
        <div v-if="!authStore.isLogged" class="bg-white rounded-md shadow-lg">
          <button
            @click="() => router.push({ name: 'LoginPage' })"
            class="bg-white px-4 py-2 rounded focus:outline-none"
          >
            <p class="text-sm font-bold text-[#007AC2] hover:text-[#007AC2]">Login</p>
          </button>
        </div>
        <div v-else-if="authStore.getRoles() === 'admin'" class="relative" ref="dropdown">
          <button @click="toggleDropdown" class="bg-white px-4 py-2 rounded focus:outline-none">
            <p class="text-sm font-bold text-[#007AC2] hover:text-[#007AC2]">Admin</p>
          </button>

          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg"
          >
            <!-- <router-link
              to="/profile"
              class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Perfil do Usuário
            </router-link> -->
            <router-link to="/admin/tests" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">
              Testes
            </router-link>
            <router-link to="/admin/courses" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">
              Cursos
            </router-link>
            <router-link
              to="/tests/history"
              class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Histórico
            </router-link>
            <button
              @click="logout"
              class="w-full block px-4 py-2 text-gray-800 hover:bg-gray-100 text-left"
            >
              Logout
            </button>
          </div>
        </div>
        <div v-else class="relative" ref="dropdown">
          <button @click="toggleDropdown" class="bg-white px-4 py-2 rounded focus:outline-none">
            <p class="text-sm font-bold text-[#007AC2] hover:text-[#007AC2]">Aluno</p>
          </button>

          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg"
          >
            <!-- <router-link
              to="/profile"
              class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Perfil do Usuário
            </router-link> -->
            <router-link
              to="/tests/history"
              class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Histórico
            </router-link>
            <button
              @click="logout"
              class="w-full block px-4 py-2 text-gray-800 hover:bg-gray-100 text-left"
            >
              Logout
            </button>
          </div>
        </div>
      </li>
    </ul>
    <button
      v-show="showButton"
      @click="scrollToTop"
      aria-label="back to top"
      title="Voltar para o topo"
      class="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
    >
      <font-awesome-icon
        icon="fa-arrow-up"
      />
    </button>
  </nav>
</template>
