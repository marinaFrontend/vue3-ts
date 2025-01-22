<template>
  <v-btn :disabled="store.isFetching || store.isLoading" prepend-icon="mdi-plus" flat @click="onCreateItem">Добавить задачу</v-btn>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todo'

const store = useTodoStore();

async function onCreateItem() {
  await store.createTodoItem({
    id: Math.random(),
    title: `${Math.random()} задача`,
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id massa enim.',
    isDone: false,
  });
}
</script>
