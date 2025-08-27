import type { Meta, StoryObj } from '@storybook/vue3';
import type { TodoItemData } from '@/types';
import TodoList from '~/components/organisms/TodoList.vue';

const meta: Meta<typeof TodoList> = {
  title: 'Components/Organisms/TodoList',
  component: TodoList,
  argTypes: {
    onTodoActionClick: { action: 'todoActionClick' },
    onTodoSelectClick: { action: 'todoSelectClick' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof TodoList>;

const sampleTodos: TodoItemData[] = [
  { id: '1', text: 'Learn Vue 3', starred: false, archived: false },
  { id: '2', text: 'Write Storybook stories', starred: true, archived: false },
  { id: '3', text: 'Refactor components', starred: false, archived: true },
];

export const Default: Story = {
  args: {
    todoData: sampleTodos,
    showPlaceholder: false,
    loading: false,
  },
};

export const LoadingState: Story = {
  args: {
    todoData: [],
    showPlaceholder: false,
    loading: true,
  },
};

export const EmptyState: Story = {
  args: {
    todoData: [],
    showPlaceholder: true,
    loading: false,
  },
};

export const WithInteraction: Story = {
  args: {
    todoData: sampleTodos,
    showPlaceholder: false,
    loading: false,
  },
};
