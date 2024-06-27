export enum TodoAction {
  Edit,
  Delete,
  Star,
  Archive
}

export interface TodoItemData {
  text: string;
  id: string;
  starred: boolean;
  archived: boolean;
}