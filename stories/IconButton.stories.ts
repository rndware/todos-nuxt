import type { Meta, StoryObj } from '@storybook/vue3';
import IconButton from '~/components/atoms/IconButton.vue';

const meta: Meta<typeof IconButton> = {
  title: 'Components/Atoms/IconButton',
  component: IconButton,
  argTypes: {
    iconName: {
      control: { type: 'select' },
      options: ['check', 'trash', 'pencil', 'plus', 'times'], // example icons
      description: 'Choose the icon to display on the button',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    iconName: 'check', 
  },
};

export const Delete: Story = {
  args: {
    iconName: 'trash',
  },
};

export const MultipleIcons: Story = {
  args: {
    iconName: 'pencil',
  },
};
