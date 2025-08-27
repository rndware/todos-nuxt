import { type TodoItemData } from "@/types";
import type { Meta, StoryObj } from '@storybook/vue3';
import TodoItem from "@/components/organisms/TodoItem.vue";

const meta: Meta<typeof TodoItem> = {
  title: "Components/Organisms/TodoItem",
  component: TodoItem,
  argTypes: {
    onTodoActionClick: { action: "todoActionClick" },
    onTodoSelectClick: { action: "todoSelectClick" },
    todoData: {
      control: "object",
    },
    highlighted: {
      control: "boolean",
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof TodoItem>;

const sampleTodo: TodoItemData = {
  id: "1",
  text: "Sample Todo Item",
  starred: false,
  archived: false,
};

export const Default: Story = {
  args: {
    todoData: sampleTodo,
    highlighted: false,
  },
};

export const Highlighted: Story = {
  args: {
    todoData: sampleTodo,
    highlighted: true,
  },
};

export const StarredTodo: Story = {
  args: {
    todoData: { ...sampleTodo, starred: true },
    highlighted: false,
  },
};
