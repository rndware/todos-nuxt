import EditableText from '~/components/molecules/EditableText.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof EditableText> = {
  title: 'Components/Molecules/EditableText',
  component: EditableText,
  argTypes: {
    modelValue: { control: 'text', description: 'The text value to edit' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof EditableText>;

export const Default: Story = {
  args: {
    modelValue: 'Hover and click the pencil to edit me!',
  },
};

export const Playground: Story = {
  args: {
    modelValue: 'Edit this text in the playground',
  },
};
