export type TodoItemType = {
  id: number;
  title: string;
  subtitle: string | null;
  file: Blob | null;
  isDone: boolean;
};
