<template>
  <div class="w-screen h-[calc(100vh-4rem)] flex items-center justify-center">
    <div class="w-fit h-fit p-5 rounded-md bg-[#00235B] flex flex-col items-center justify-center">
      <div class="text-white text-4xl mb-6">Histórico de Respostas</div>
      
      <div class="w-96">
        <div v-for="answer in answers" :key="answer.id" class="bg-white rounded-md p-4 mb-4 shadow-md flex items-center space-x-4">
          <div class="flex flex-col">
            <div class="text-xl">{{ answer.testName }}</div>
            <div class="text-gray-500">{{ answer.date }}</div>
            <div class="text-green-500">{{ answer.course }}</div>
          </div>
          
          <div class="flex-1 text-right">
            <div class="text-4xl text-green-500">{{ answer.percentage }}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const answers = [
    {
      id: 1,
      testName: 'Teste 1',
      date: '13 de Junho, 2023',
      course: 'Ciência da Computação',
      percentage: 85,
      gif: 'link-do-gif',
    },
    {
      id: 2,
      testName: 'Teste 2',
      date: '15 de Junho, 2023',
      course: 'Engenharia Civil',
      percentage: 72,
      gif: 'link-do-gif',
    },
    // Adicione mais respostas conforme necessário
  ]
</script>