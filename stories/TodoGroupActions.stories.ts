import type { Meta, StoryObj } from '@storybook/vue3';
import TodoGroupActions from '@/components/molecules/TodoGroupActions.vue';

const meta: Meta<typeof TodoGroupActions> = {
  title: "Components/Molecules/TodoGroupActions",
  component: TodoGroupActions,
  argTypes: {
    onDeleteSelectedClick: { action: "deleteSelectedClick" },
    onDeleteAllClick: { action: "deleteAllClick" },
    loading: { control: "boolean" },
    selectedTodosLength: { control: "number" },
    allTodosLength: { control: "number" },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof TodoGroupActions>;

export const Default: Story = {
  args: {
    loading: false,
    selectedTodosLength: 0,
    allTodosLength: 3,
  },
};

export const WithSelected: Story = {
  args: {
    loading: false,
    selectedTodosLength: 2,
    allTodosLength: 3,
  },
};

export const LoadingState: Story = {
  args: {
    loading: true,
    selectedTodosLength: 2,
    allTodosLength: 3,
  },
};

export const AllDeletedDisabled: Story = {
  args: {
    loading: false,
    selectedTodosLength: 0,
    allTodosLength: 0,
  },
};
