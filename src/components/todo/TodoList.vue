<template>
  <div>
    <v-list v-if="data.length">
      <TodoItem v-for="item in data" :key="item.id" :data="item" />
    </v-list>
    <p v-else>{{ noDataMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TodoItem from "./TodoItem.vue";

type TodoItemType = {
  id: number,
  title: string,
  descr: string | null,
  isDone: boolean,
}

const data: TodoItemType[] = ref([{
  id: 0,
  title: '1 задача',
  descr: 'описание задачи',
  isDone: false,
}]);

const noDataMsg = ref('Нет ни одного элемента');
</script>
