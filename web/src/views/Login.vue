<template>
  <div class="w-full h-full pt-20 flex items-start justify-center">
    <button id="btn-voltar" @click="goBack">Voltar</button>
    <div class="login w-2/12">
      <p class="mb-5 font-semibold text-center text-xl">Entre com sua conta</p>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <label class="font-lg text-left font-normal" for="username">Email:</label>
          <input type="text" id="username" name="username" v-model="username" placeholder="Digite seu email aqui">
        </div>
        <div class="flex flex-col gap-1">
          <label class="font-lg text-left font-normal" for="password">Senha:</label>
          <input type="password" id="password" name="password" v-model="password" placeholder="Digite sua senha aqui">
        </div>
        <button type="submit" @click="login">Entrar</button>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { ref } from 'vue';
import SaveDialog from '@/components/dialogs/SaveDialog.vue';

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
  
<style scoped>
.login button[type="submit"] {
  background-color: #007AC2;
  color: #fff;
  border: none;
  border: 3px;
  padding: 8px;
  font-weight: bold;
  cursor: pointer;
}

.login button[type="submit"]:hover {
  background-color: #0062a3;
}

.login input[type="text"] {
  padding: 8px;
  border: 2px solid #ccc;
  border-radius: 4px;
}

.login input[type="password"] {
  padding: 8px;
  border: 2px solid #ccc;
  border-radius: 4px;
}

#btn-voltar {
  background-color: #007AC2;
  color: #fff;
  border: none;
  border: 3px;
  padding: 8px;
  cursor: pointer;
  font-weight: bold;
  width: 10rem;
  position: fixed;
  left: 1rem;
  top: 5rem;
}

#btn-voltar:hover {
  background-color: #0062a3;
}
</style>