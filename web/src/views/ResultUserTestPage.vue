<template>
  <div class="bg-[#FEFEFE] h-[calc(100vh-4rem)] w-screen flex items-center justify-center">
    <div class="p-10 bg-[#00235B] w-fit h-fit flex flex-col items-center justify-center rounded-md">
      <div class="text-white text-4xl mb-6">Resultado do Teste Vocacional</div>
      
      <div class="flex flex-col items-center space-y-4">
        <div class="flex flex-col items-center space-y-2">
          <!-- <img class="w-32 h-32 rounded-full object-cover" :src="`https://cataas.com/cat`" :alt="course.name" /> -->
          <div class="text-white text-2xl">{{ 'Engenharia de Software' }}</div>
          <div class="text-white text-2xl">{{ 'Universidade Federal do Ceará - Campus Quixadá' }}</div>
        </div>
        
        <div class="text-white text-lg">{{ course.percentage + '%' }}</div>
        
        <div class="flex space-x-4">
          <div class="flex flex-col items-center">
            <div class="text-white text-xl">Compatibilidade</div>
            <div class="text-green-500 text-2xl">{{ 'Alta' }}</div>
          </div>
          
          <div class="flex flex-col items-center">
            <div class="text-white text-xl">Nº de Perguntas</div>
            <div class="text-green-500 text-2xl">{{ '8/12' }}</div>
          </div>
        </div>
        
        <router-link to="/tests" class="bg-green-500 text-white px-4 py-2 rounded-md text-xl mt-4 hover:bg-green-600">Fazer outro teste</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const course = {
    name: "Curso",
    percentage: 75,
  }
</script>