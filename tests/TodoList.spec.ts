import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import TodoList from "@/components/organism/TodoList.vue";
import TodoItem from "@/components/organism/TodoItem.vue";
import { TodoAction, type TodoItemData } from "@/types";

// Mock the composable
vi.mock("@/composables/useHighlightNewTodo", () => ({
  default: () => ({ isHighlighted: vi.fn(() => false) }),
}));

describe("Organism / TodoList.vue", () => {
  const todoData: TodoItemData[] = [
    { id: "1", text: "Todo 1", archived: false, starred: false },
    { id: "2", text: "Todo 2", archived: false, starred: false },
    { id: "3", text: "Todo 3", archived: true, starred: false },
  ];

  it("renders the correct number of TodoItem subcomponents", () => {
    const wrapper = mount(TodoList, {
      props: {
        todoData,
        showPlaceholder: false,
        loading: false,
      },
    });

    const todoItems = wrapper.findAllComponents(TodoItem);
    expect(todoItems[0].isVisible()).toBeTruthy();
    expect(todoItems[1].isVisible()).toBeTruthy();
    expect(todoItems[2].isVisible()).toBeFalsy(); // only non-archived items should be rendered
  });

  it("shows loading spinner when loading is true", () => {
    const wrapper = mount(TodoList, {
      props: {
        todoData: [],
        showPlaceholder: false,
        loading: true,
      },
    });

    const spinner = wrapper.find(".loading-spinner");
    expect(spinner.isVisible()).toBe(true);
  });

  it("shows placeholder when there is no todoData and not loading", () => {
    const wrapper = mount(TodoList, {
      props: {
        todoData: [],
        showPlaceholder: true,
        loading: false,
      },
    });

    const placeholder = wrapper.find(".todo-list-placeholder");
    expect(placeholder.isVisible()).toBe(true);
  });

  it("emits todoActionClick when a TodoItem triggers todoActionClick", async () => {
    const wrapper = mount(TodoList, {
      props: {
        todoData,
        showPlaceholder: false,
        loading: false,
      },
    });

    await wrapper
      .findComponent(TodoItem)
      .vm.$emit("todoActionClick", TodoAction.Edit, 1);

    expect(wrapper.emitted().todoActionClick).toBeTruthy();
    expect(wrapper.emitted().todoActionClick[0]).toEqual([TodoAction.Edit, 1]);
  });

  it("emits todoSelectClick when a TodoItem triggers todoSelectClick", async () => {
    const wrapper = mount(TodoList, {
      props: {
        todoData,
        showPlaceholder: false,
        loading: false,
      },
    });

    await wrapper.findComponent(TodoItem).vm.$emit("todoSelectClick", 1);

    expect(wrapper.emitted().todoSelectClick).toBeTruthy();
    expect(wrapper.emitted().todoSelectClick[0]).toEqual([1]);
  });
});
