<script setup lang="ts">
import { onBeforeMount } from 'vue';

import { fetchUsers } from './api/queries';

onBeforeMount(async () => {
  console.log(await fetchUsers())
})

</script>

<template>
  <router-view class="min-h-[calc(100vh-4rem)] bg-[#F5F5F5]" />
</template>