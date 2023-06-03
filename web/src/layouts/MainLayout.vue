<script setup lang="ts">
import NavBar from '../components/Navbar.vue';
</script>

<template>
  <div className="">
    <header>
      <NavBar />
    </header>

    <main>
      <slot></slot>
    </main>

    <footer>

    </footer>
  </div>
</template>