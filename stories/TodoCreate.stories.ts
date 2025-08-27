import type { Meta, StoryObj } from "@storybook/vue3";
import TodoCreate from "@/components/molecules/TodoCreate.vue";

const meta: Meta<typeof TodoCreate> = {
  title: "Components/Molecules/TodoCreate",
  component: TodoCreate,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onCreate: {
      action: "create",
      description: "Emitted when a new todo is created",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TodoCreate>;

export const Default: Story = {};

export const WithPrefilledText: Story = {
  render: (args ) => ({
    components: { TodoCreate },
    setup() {
      return { args };
    },
    template: `<TodoCreate v-bind="args" @create="args.create" />`,
  }),
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector<HTMLInputElement>("input");
    if (input) input.value = "Buy groceries 🛒";
    input?.dispatchEvent(new Event("input", { bubbles: true }));
  },
};
