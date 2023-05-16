<template>
  <div class="content">
    <button id="btn-voltar" @click="goBack">Voltar</button>
    <div class="recuperacaoDeSenha w-fit">
      <h2 class="font-semibold text-xl text-center">Recuperação de senha</h2>
      <h5 class="font-normal text-md text-start mt-5 mb-2">Insira seu email para recuperar sua senha</h5>
      <input class="w-full" type="text" id="username" name="username" v-model="username" placeholder="Digite seu email aqui">
      <button id="redefinir" class="w-full" @click.prevent="recuperacaoDeSenha">Redefinir senha</button>
    </div>
  </div>
</template>
  
<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { ref } from 'vue';

  // const route = useRoute()
  const router = useRouter()

  const username = ref('')

  const goBack = () => {
    router.go(-1)
  }

  const recuperacaoDeSenha = () => {

  }

</script>
  
<style scoped>
.content {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  background-color: #fff;
}

.recuperacaoDeSenha {
  background-color: #fff;
  padding: 5%;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.recuperacaoDeSenha label {
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
}

.recuperacaoDeSenha input[type="text"] {
  padding: 8px;
  border: 2px solid #ccc;
  border-radius: 4px;
  margin-bottom: 15px;
}

.recuperacaoDeSenha #redefinir {
  background-color: #007AC2;
  color: #fff;
  border: none;
  border: 3px;
  padding: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 15px;
}

.recuperacaoDeSenha #redefinir:hover {
  background-color: #0062a3;
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
}</style>