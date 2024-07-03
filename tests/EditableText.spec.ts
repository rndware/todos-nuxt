import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import { IconButton } from "@/components/atoms";
import { EditableText } from "@/components/molecules";

describe("EditableText", () => {
  it("renders text and input fields correctly including toggling via button", async () => {
    const wrapper = mount(EditableText);

    // Initial state: should not be editing
    expect(wrapper.find(".editable-text__text").exists()).toBe(true);
    expect(wrapper.find(".editable-text__input").exists()).toBe(false);

    // Simulate clicking on pencil icon to edit
    await wrapper.findComponent(IconButton).trigger("click");
    expect(wrapper.find(".editable-text__text").exists()).toBe(false);
    expect(wrapper.find(".editable-text__input").exists()).toBe(true);

    // Simulate clicking on check icon to finish editing
    await wrapper.find(".editable-text__done").trigger("click");

    // Show revert back to non-editing mode
    expect(wrapper.find(".editable-text__text").exists()).toBe(true);
    expect(wrapper.find(".editable-text__input").exists()).toBe(false);

    // TO-DO: refactor to check enter keypress and done button click
  });

  it('emits "edit" event when done editing', async () => {
    const wrapper = mount(EditableText);

    // Simulate clicking on pencil icon to edit
    await wrapper.findComponent(IconButton).trigger("click");

    // Simulate clicking on check icon to finish editing
    await wrapper.find(".editable-text__done").trigger("click");

    // Check if "edit" event was emitted
    expect(wrapper.emitted("edit")).toBeTruthy();
  });
});
