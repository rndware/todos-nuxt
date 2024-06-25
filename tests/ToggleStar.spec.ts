import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ToggleStar from "../components/molecules/ToggleStar.vue";
import IconButton from "../components/atoms/IconButton.vue";

describe("ToggleStar", () => {
  it("renders star icon correctly", async () => {
    const wrapper = mount(ToggleStar, {
      props: {
        starred: false,
      },
    });

    expect(wrapper.findComponent(IconButton).props("iconName")).toBe("star");
  });

  it("renders full star icon correctly", async () => {
    const wrapper = mount(ToggleStar, {
      props: {
        starred: true,
      },
    });

    expect(wrapper.findComponent(IconButton).props("iconName")).toBe("star-fill");
  });

  it('emits "toggled" event when star icon is clicked', async () => {
    const wrapper = mount(ToggleStar, {
      props: {
        starred: false,
      },
    });

    // Simulate clicking the star icon
    await wrapper.findComponent(IconButton).trigger("click");

    // Check if "toggled" event was emitted
    expect(wrapper.emitted("toggled")).toBeTruthy();
  });
});
