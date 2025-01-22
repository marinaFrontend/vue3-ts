<template>
  <div>
    <v-skeleton-loader v-if="store.isFetching" :type="`sentences@${store.data.length || '3'}`" />
    <template v-else>
      <v-list v-if="store.isReady && store.data.length">
        <TodoItem v-for="item in store.data" :key="item.id" :data="item" />
      </v-list>
      <p v-else>{{ noDataMsg }}</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTodoStore } from '@/stores/todo'
import TodoItem from './TodoItem.vue'

const store = useTodoStore();

const noDataMsg = ref('Нет ни одного элемента');

async function getTodoList() {
  await store.getTodoList()
}

onMounted(() => {
  getTodoList();
});
</script>
