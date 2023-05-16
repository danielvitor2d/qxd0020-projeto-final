<template>
  <div class="left pt-20">
    <button id="btn-voltar" @click="goBack">Voltar</button>
    <div class="cadastro">
      <p class="font-semibold text-xl text-center">Cadastro</p>
      <div>
        <label for="name">Nome:</label>
        <input type="text" id="name" name="name" v-model="name" placeholder="Digite seu nome aqui">
        <label for="username">Email:</label>
        <input type="text" id="username" name="username" v-model="username" placeholder="Digite seu email aqui">
        <label for="birthdate">Data de nascimento:</label>
        <input type="date" id="birthdate" name="birthdate" v-model="birthdate">
        <label for="password">Senha:</label>
        <input type="password" id="password" name="password" v-model="password" placeholder="Digite sua senha aqui">
        <label for="password-confirm">Confirmação de senha:</label>
        <input type="password" id="password-confirm" name="password-confirm" v-model="passwordConfirm"
          placeholder="Confirme sua senha">
        <button type="submit" @click="register">Entrar</button>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { ref } from 'vue';

  // const route = useRoute()
  const router = useRouter()

  const name = ref('')
  const username = ref('')
  const birthdate = ref('')
  const password = ref('')
  const passwordConfirm = ref('')

  const register = () => {
    // Lógica de autenticação aqui
  }

  const goBack = () => {
    router.go(-1)
  }
</script>
  
<style scoped>
.left {
  display: flex;
  justify-content: center;
  align-items: start;
  background-color: #F5F5F5;
}

.cadastro {
  width: 35rem;
  background-color: #F5F5F5;
  border-radius: 0px;
}

.cadastro label {
  display: block;
  font-weight: bold;
  margin-bottom: 1rem;
}

.cadastro input[type="text"],
.cadastro input[type="password"],
.cadastro input[type="date"] {
  width: 100%;
  padding: 8px;
  border: 2px solid #ccc;
  border-radius: 4px;
  margin-bottom: 15px;
}

.cadastro button[type="submit"] {
  background-color: #007AC2;
  color: #fff;
  border: none;
  border: 3px;
  padding: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 15px;
  width: 100%;
}

.cadastro button[type="submit"]:hover {
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
}
</style>