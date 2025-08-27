export type TodoId = string;

export interface TodoItemData {
  text: string;
  id: TodoId;
  starred: boolean;
  archived: boolean;
}
