import type { Meta, StoryObj } from '@storybook/vue3';
import ToggleStar from '@/components/molecules/ToggleStar.vue';

const meta: Meta<typeof ToggleStar> = {
  title: 'Components/Molecules/ToggleStar',
  component: ToggleStar,
  argTypes: {
    starred: { control: 'boolean' },
    onToggle: { action: 'toggled' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ToggleStar>;

export const Default: Story = {
  args: {},
};

export const Toggled: Story = {
  args: {
    starred: true,
  },
};
 