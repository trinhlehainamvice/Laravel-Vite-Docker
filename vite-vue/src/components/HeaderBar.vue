<script setup lang="ts">
//import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Toolbar from 'primevue/toolbar'
import { computed } from 'vue'
import useAuthStore from '@stores/auth.store'
import { useRouter } from 'vue-router'

const _router = useRouter()
const _auth = useAuthStore()
const _is_logged_in = computed(() => _auth.user != null)

function goToLoginPage() {
  _router.push({ name: 'Login' })
}
</script>

<template>
  <Toolbar>
    <template #start>
      <div class="flex flex-row gap-x-2">
        <Button aria-label="Side Menu" icon="pi pi-bars" class="p-button-text" />
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />
      </div>
    </template>
    <template #end>
      <!-- <Avatar v-show="_is_logged_in" icon="pi pi-user" /> -->
      <Button
        v-show="_is_logged_in"
        :label="$t('logout')"
        icon="pi pi-sign-out"
        @click="_auth.logout"
      />
      <Button
        v-show="!_is_logged_in"
        :label="$t('login')"
        icon="pi pi-user"
        @click="goToLoginPage"
      />
    </template>
  </Toolbar>
</template>
