<template>
  <div class="bg-[#FEFEFE] min-h-screen flex flex-col items-center justify-center">
    <div class="text-black text-4xl mb-6">
      <font-awesome-icon
        icon="fa-lock"
      /> Acesso não autorizado
    </div>
    <div class="text-black text-lg text-center">
      Desculpe, mas você não está autorizado a acessar esta página. Entre em contato com o administrador para obter mais assistência.
    </div>
    <div class="text-black text-lg text-center">
      Retornar para a <b><router-link to="/">Página Inicial</router-link></b>
    </div>
  </div>
</template>