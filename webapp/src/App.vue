<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderBar from '@ui/HeaderBar.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const _route = useRoute()
const _isStandaloneView = computed(() => _route.meta.standalone)
</script>

<template>
  <HeaderBar v-if="!_isStandaloneView" class="sticky top-0 z-10 w-full" />
  <main class="flex flex-col p-8 w-full"></main>
  <RouterView />
</template>

<style scoped></style>
