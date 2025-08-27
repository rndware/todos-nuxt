import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import { TodoGroupActions } from "@/components/molecules";

describe("Molecules / TodoGroupActions.vue", () => {
  it("renders properly with default props", () => {
    const wrapper = mount(TodoGroupActions, {
      props: {
        loading: false,
        selectedTodosLength: 3,
        allTodosLength: 5,
      },
    });

    expect(wrapper.find(".delete-button").exists()).toBe(true);
    expect(wrapper.find(".delete-selected-button").exists()).toBe(true);
  });

  it("enables controls when there are todos", () => {
    const wrapper = mount(TodoGroupActions, {
      props: {
        loading: false,
        selectedTodosLength: 3,
        allTodosLength: 5,
      },
    });

    expect(
      wrapper.find(".delete-button").attributes("disabled")
    ).toBeUndefined();
    expect(
      wrapper.find(".delete-selected-button").attributes("disabled")
    ).toBeUndefined();
  });

  it("shows correct text for delete selected button", () => {
    const wrapper = mount(TodoGroupActions, {
      props: {
        loading: false,
        selectedTodosLength: 3,
        allTodosLength: 5,
      },
    });

    expect(wrapper.find(".delete-selected-button").text()).toContain(
      "Delete Selected (3)"
    );
  });

  it("emits deleteAllClick event when delete all button is clicked", async () => {
    const wrapper = mount(TodoGroupActions, {
      props: {
        loading: false,
        selectedTodosLength: 3,
        allTodosLength: 5,
      },
    });

    await wrapper.find(".delete-button").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("deleteAllClick");
  });

  it("emits deleteSelectedClick event when delete selected button is clicked", async () => {
    const wrapper = mount(TodoGroupActions, {
      props: {
        loading: false,
        selectedTodosLength: 3,
        allTodosLength: 5,
      },
    });

    await wrapper.find(".delete-selected-button").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("deleteSelectedClick");
  });

  it("hides buttons when loading is true", async () => {
    const wrapper = mount(TodoGroupActions, {
      props: {
        loading: false,
        selectedTodosLength: 3,
        allTodosLength: 5,
      },
    });

    await wrapper.setProps({ loading: true });
    expect(wrapper.find(".delete-button").isVisible()).toBe(false);
    expect(wrapper.find(".delete-selected-button").isVisible()).toBe(false);
  });

  it("disables buttons when there are no todos", async () => {
    const wrapper = mount(TodoGroupActions, {
      props: {
        loading: false,
        selectedTodosLength: 5,
        allTodosLength: 3,
      },
    });

    await wrapper.setProps({ allTodosLength: 0, selectedTodosLength: 0 });
    expect(wrapper.find(".delete-button").attributes("disabled")).toBeDefined();
    expect(wrapper.find(".delete-selected-button").attributes("disabled")).toBeDefined();
  });
});
