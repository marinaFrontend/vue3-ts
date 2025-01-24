<template>
  <v-dialog
    v-model="modelValue"
    width="500"
  >
    <v-card
      prepend-icon="mdi-delete-outline"
      :title="props.title"
    >
      <template #actions>
        <v-btn
          :disabled="store.isFetching || store.isLoading"
          :text="props.button"
          @click="$emit('confirm')"
        ></v-btn>
        <v-btn
          :disabled="store.isFetching || store.isLoading"
          text="Отмена"
          @click="onClose"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {ref} from "vue";
import { useTodoStore } from '@/stores/todo'

const store = useTodoStore();

interface Props {
  title?: String,
  button?: String,
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Вы уверены?',
  button: 'Да',
})

const emits = defineEmits(['confirm'])

const modelValue = defineModel<boolean>({ required: true });

const onClose = () => {
  modelValue.value = false;
};
</script>
