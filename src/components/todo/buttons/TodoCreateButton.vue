<template>
  <v-btn :disabled="store.isFetching || store.isLoading" prepend-icon="mdi-plus" flat>Добавить задачу</v-btn>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todo'

const store = useTodoStore();
</script>
