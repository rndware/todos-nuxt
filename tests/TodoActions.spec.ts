import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import TodoActions from "../components/molecules/TodoActions.vue";
import IconButton from "../components/atoms/IconButton.vue";
import { TodoAction } from "../enums";

describe("TodoActions", () => {
  it('emits "todoActionClick" event with correct action type when buttons are clicked', async () => {
    const wrapper = mount(TodoActions);

    await wrapper.findComponent(IconButton).trigger("click");

    // Simulate clicking the "Delete" button
    await wrapper
      .find(".todo-actions__panel button:nth-child(1)")
      .trigger("click");
    expect(wrapper.emitted("todoActionClick")).toBeTruthy();
    expect(wrapper.emitted("todoActionClick")![0][0]).toBe(TodoAction.Delete);

    // Simulate clicking the "Archive" button
    await wrapper
      .find(".todo-actions__panel button:nth-child(2)")
      .trigger("click");
    expect(wrapper.emitted("todoActionClick")![1][0]).toBe(TodoAction.Archive);
  });
});
