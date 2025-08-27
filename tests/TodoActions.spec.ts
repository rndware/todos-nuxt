import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import { IconButton } from "@/components/atoms";
import { TodoActions } from "@/components/molecules";
import { TodoAction } from "@/types";

describe("Molecules / TodoActions.vue", () => {
  it("should toggle showActionPanel on IconButton click", async () => {
    const wrapper = mount(TodoActions);

    const toggleButton = wrapper.find(".todo-actions__toggle");

    // Check if button exists
    expect(toggleButton.exists()).toBe(true);

    await toggleButton.trigger("click");

    // Check action panel is open
    expect(wrapper.find(".todo-actions__panel").classes()).toContain("open");

    await toggleButton.trigger("click");

    // Check action panel is closed
    expect(wrapper.find(".todo-actions__panel").classes()).not.toContain(
      "open"
    );
  });
  it('emits "todoActionClick" event with correct action type when buttons are clicked', async () => {
    const wrapper = mount(TodoActions);

    await wrapper.findComponent(IconButton).trigger("click");

    // Simulate clicking the "Delete" button
    await wrapper
      .find(".todo-actions__panel .action-button:nth-child(1)")
      .trigger("click");
    expect(wrapper.emitted("todoActionClick")).toBeTruthy();
    expect(wrapper.emitted("todoActionClick")![0][0]).toBe(TodoAction.Delete);

    // Simulate clicking the "Archive" button
    await wrapper
      .find(".todo-actions__panel .action-button:nth-child(2)")
      .trigger("click");
    expect(wrapper.emitted("todoActionClick")![1][0]).toBe(TodoAction.Archive);
  });
});
