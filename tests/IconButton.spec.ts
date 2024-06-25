// Icon.spec.ts

import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import IconButton from "../components/atoms/IconButton.vue";

describe("IconButton.vue", () => {
  it("renders a button with correct class when iconName prop is provided", async () => {
    const iconName = "some-icon";
    const wrapper = mount(IconButton, {
      props: {
        iconName,
      },
    });

    // Assert that the button element exists
    expect(wrapper.find("button").exists()).toBe(true);

    // Assert that the button has the correct class
    expect(wrapper.find("button").classes()).toContain("pi");
    expect(wrapper.find("button").classes()).toContain(`pi-${iconName}`);

  });
});
