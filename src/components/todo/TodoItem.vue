<template>
  <v-list-item :value="data">
    <template #title>
      <span :class="{'text-decoration-line-through text-grey': data.isDone}">{{ data.title }}</span>
    </template>
    <template #subtitle>
      <span :class="{'text-decoration-line-through': data.isDone}">{{ data.subtitle }}</span>
    </template>
    <template #prepend>
      <v-checkbox-btn v-model="doneModel" :disabled="store.isLoading" @click="toggleItem(data)" />
    </template>
    <template #append>
      <TodoDeleteButton @click="$emit('delete')" />
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import { ref, onMounted  } from 'vue'
import { useTodoStore } from '@/stores/todo'
import type {TodoItemType} from '@/types/todoTypes';
import TodoDeleteButton from "./buttons/TodoDeleteButton.vue";

const store = useTodoStore();

const props = defineProps<{
  data: TodoItemType
}>()

const doneModel = ref<boolean>(false);

async function toggleItem(item: TodoItemType) {
  await store.toggleTodoItem(item);
  doneModel.value = item.isDone;
}

onMounted(() => {
  if (props.data) {
    doneModel.value = props.data.isDone;
  }
})
</script>
