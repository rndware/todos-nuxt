export enum TodoAction {
  Edit,
  Delete,
  Star,
  Archive
}

export enum TodoGroupAction {
  DeleteAll,
  DeleteRange,
}

export interface TodoItemData {
  text: string;
  id: TodoId;
  starred: boolean;
  archived: boolean;
}

export type TodoId = string;