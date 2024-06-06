<script setup lang="ts">
import useAuthStore from '@/stores/auth.store'
import Button from 'primevue/button'

const _auth = useAuthStore()
</script>

<template>
  <div class="flex fixed top-0 left-0 z-50 justify-center items-center w-full min-h-screen">
    <!-- background layer -->
    <div class="fixed top-0 left-0 w-full min-h-screen opacity-80 bg-surface-500 blur-md" />
    <!-- login form -->
    <main
      class="flex z-10 flex-col gap-y-2 justify-center items-center p-4 w-1/3 h-1/3 bg-surface-0"
    >
      <!-- Google Login Button -->
      <Button label="Google" icon="pi pi-google" class="w-2/3" @click="_auth.loginWithGoogle()" />
      <!-- Twitter Login Button -->
      <Button label="Twitter" icon="pi pi-twitter" class="w-2/3" @click="_auth.loginWithGoogle()" />
      <!-- Facebook Login Button -->
      <Button
        label="Facebook"
        icon="pi pi-facebook"
        class="w-2/3"
        @click="_auth.loginWithGoogle()"
      />
    </main>
  </div>
</template>
