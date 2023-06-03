<script setup lang="ts">
  import { useAuthStore } from '../stores/authStore';

  const authStore = useAuthStore();


</script>

<template>
  <nav
    class="
      w-full
      h-[4rem]
      px-6
      py-8
      mx-auto
      md:flex md:justify-between md:items-center
      bg-[#007AC2]
    "
  >
    <div class="flex items-center justify-between">
      <router-link
        to="/"
        class="
          text-xl
          font-bold
          text-white
          md:text-2xl
          hover:text-blue-400
        "
      >
        <img class="w-48 h-14" src="../assets/logo.png" alt="Logo UFC" />
      </router-link>
    </div>


    <ul
      class="
        flex
        flex-col
        mt-8
        space-y-4
        md:flex
        md:space-y-0
        md:flex-row
        md:items-center
        md:space-x-10
        md:mt-0
      "
    >
      <li class="text-sm font-bold text-white hover:text-blue-400">
        <router-link
          to="/"
        >
          Home
        </router-link>
      </li>
      <li class="text-sm font-bold text-white hover:text-blue-400">
        <router-link
          to="/courses"
        >
          Cursos
        </router-link>
      </li>
      <li class="px-3 py-2 rounded-sm bg-white text-sm font-bold text-[#007AC2] hover:text-blue-400">
        <router-link
          to="/auth/login"
          v-if="!authStore.isLogged"
        >
          Log in
        </router-link>
        <router-link
          to="/admin/edit-test"
          v-else
        >
          Admin
        </router-link>
      </li>
    </ul>
  </nav>
</template>
