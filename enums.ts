export enum TodoAction {
  Edit,
  Delete,
  Star,
  Archive
}

export interface TodoItemData {
  text: string;
  id: number;
  starred: boolean;
  archived: boolean;
}