import type { Meta, StoryObj } from '@storybook/vue3';
import TodoInfo from '@/components/molecules/TodoInfo.vue';

const meta: Meta<typeof TodoInfo> = {
  title: "Components/Molecules/TodoInfo",
  component: TodoInfo,
  argTypes: {
    starredCount: { control: { type: 'number' } },
    archivedCount: { control: { type: 'number' } },
    totalCount: { control: { type: 'number' } },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof TodoInfo>;

export const Default: Story = {
  args: {
    starredCount: 2,
    archivedCount: 1,
    totalCount: 5,
  },
};

export const Empty: Story = {
  args: {
    starredCount: 0,
    archivedCount: 0,
    totalCount: 0,
  },
};

export const LargeNumbers: Story = {
  args: {
    starredCount: 123,
    archivedCount: 45,
    totalCount: 999,
  },
};
