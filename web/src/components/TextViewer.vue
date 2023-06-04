<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-semibold mb-8">Visualizar Testes</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <TestCard
        v-for="test in tests"
        :key="test.id"
        :test="test"
        @remove="removeTest(test.id)"
      />
    </div>
    <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-8" @click="registerNewTest">
      Registrar novo teste
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TestCard from './TestCard.vue';

const router = useRouter()

const tests = ref([
  {
    id: 1,
    title: 'Teste 1',
    description: 'Descrição do Teste 1',
    numResponses: 10,
  },
  {
    id: 2,
    title: 'Teste 2',
    description: 'Descrição do Teste 2',
    numResponses: 15,
  },
  // ...
]);

const registerNewTest = () => {
  // const newTest = {
  //   id: tests.value.length + 1,
  //   title: `Teste ${tests.value.length + 1}`,
  //   description: `Descrição do Teste ${tests.value.length + 1}`,
  //   numResponses: 0,
  // };
  // tests.value.push(newTest);

  router.push('/admin/create-test')
};

const removeTest = (testId: any) => {
  tests.value = tests.value.filter((test) => test.id !== testId);
};
</script>
