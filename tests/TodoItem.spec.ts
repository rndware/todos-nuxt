import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { TodoAction, type TodoItemData } from "@/types";
import TodoItem from "~/components/organisms/TodoItem.vue";

describe("Organisms / TodoItem.vue", () => {
  const todoData = {
    id: "1",
    text: "Test todo",
    starred: false,
  } as TodoItemData;

  it("emits doneClick event with correct payload when EditableText is edit", async () => {
    const wrapper = mount(TodoItem, {
      props: { todoData },
    });

    const editableText = wrapper.findComponent({ name: "EditableText" });
    await editableText.vm.$emit("edit");

    expect(wrapper.emitted("todoActionClick")).toBeTruthy();
    expect(wrapper.emitted("todoActionClick")![0]).toEqual([
      TodoAction.Edit,
      todoData.id,
      todoData.text,
    ]);
  });

  it("emits todoActionClick event with correct payload for different action types", async () => {
    const wrapper = mount(TodoItem, {
      props: { todoData },
    });

    const todoActions = wrapper.findComponent({ name: "TodoActions" });
    await todoActions.vm.$emit("todoActionClick", TodoAction.Delete);

    expect(wrapper.emitted("todoActionClick")).toBeTruthy();
    expect(wrapper.emitted("todoActionClick")![0]).toEqual([
      TodoAction.Delete,
      todoData.id,
    ]);
  });

  it("emits todoSelectClick event when checkbox is clicked", async () => {
    const wrapper = mount(TodoItem, {
      props: { todoData },
    });

    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.trigger("click");

    expect(wrapper.emitted("todoSelectClick")).toBeTruthy();
    expect(wrapper.emitted("todoSelectClick")![0]).toEqual([todoData.id]);
  });
});
