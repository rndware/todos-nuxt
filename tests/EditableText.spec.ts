import { mount } from "@vue/test-utils";

import { describe, it, expect } from "vitest";
import EditableText from "../components/molecules/EditableText.vue";
import IconButton from "../components/atoms/IconButton.vue";

describe("EditableText", () => {
  it("renders text and input fields correctly", async () => {
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
    expect(wrapper.find(".editable-text__text").exists()).toBe(true);
    expect(wrapper.find(".editable-text__input").exists()).toBe(false);
  });

  it('emits "edited" event when done editing', async () => {
    const wrapper = mount(EditableText);

    // Simulate clicking on pencil icon to edit
    await wrapper.findComponent(IconButton).trigger("click");

    // Simulate clicking on check icon to finish editing
    await wrapper.find(".editable-text__done").trigger("click");

    // Check if "edited" event was emitted
    expect(wrapper.emitted("edited")).toBeTruthy();
  });
});
