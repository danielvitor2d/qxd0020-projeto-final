<script setup lang="ts">
import { RouterView } from 'vue-router';

import MainLayout from './layouts/MainLayout.vue';
</script>

<template>
  <MainLayout>
    <RouterView class="min-h-[calc(100vh-4rem)] bg-[#F5F5F5]" />
  </MainLayout>
</template>