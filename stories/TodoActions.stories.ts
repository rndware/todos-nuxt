import TodoActions from '~/components/molecules/TodoActions.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof TodoActions> = {
  title: "Components/Molecules/TodoActions",
  component: TodoActions,
  argTypes: {
    onTodoActionClick: { action: "todoActionClick" },
    onActionPanelToggle: { action: "actionPanelToggle" },
  },
};

export default meta;

type Story = StoryObj<typeof TodoActions>;

export const Default: Story = {
  args: {},
};

export const PanelOpen: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    // Automatically simulate clicking the toggle button to open panel
    const toggle = canvasElement.querySelector(
      ".todo-actions__toggle"
    ) as HTMLElement;
    toggle?.click();
  },
};
