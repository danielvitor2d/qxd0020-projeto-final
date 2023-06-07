<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div className="">
    <header>
      <NavBar />
    </header>

    <main>
      <router-view></router-view>
    </main>

    <footer></footer>
  </div>
</template>
