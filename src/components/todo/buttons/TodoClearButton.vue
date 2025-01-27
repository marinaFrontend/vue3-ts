<template>
  <v-btn
    v-if="store.data.length"
    :disabled="store.isFetching || store.isLoading"
    prepend-icon="mdi-delete-outline"
    flat
  >Очистить список</v-btn>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todo'

const store = useTodoStore();
</script>
