<template>
  <v-btn :disabled="store.isFetching || store.isLoading" size="small" icon="mdi-delete-outline" flat/>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todo'

const store = useTodoStore();
</script>
