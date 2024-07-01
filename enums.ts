export enum TodoAction {
  Edit,
  Delete,
  Star,
  Archive
}

export interface TodoItemData {
  text: string;
  id: TodoId;
  starred: boolean;
  archived: boolean;
}

export type TodoId = string;