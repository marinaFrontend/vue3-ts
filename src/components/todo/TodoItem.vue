<template>
  <v-list-item>
    <v-list-item-title>{{ data.title }}</v-list-item-title>
    <v-list-item-subtitle>{{ data.descr }}</v-list-item-subtitle>
    <template #prepend>
      <v-checkbox-btn />
    </template>
    <template #append>
      <TodoDeleteButton />
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import TodoDeleteButton from "./buttons/TodoDeleteButton.vue";

type TodoItemType = {
  id: number,
  title: string,
  descr: string | null,
  isDone: boolean,
}
const props = defineProps<{
  data: TodoItemType
}>()
</script>
