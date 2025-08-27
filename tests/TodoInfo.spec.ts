import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import { TodoInfo } from "@/components/molecules";

describe("Organism / TodoInfo.vue", () => {
  it("renders the correct counts", () => {
    const wrapper = mount(TodoInfo, {
      props: {
        starredCount: 5,
        archivedCount: 10,
        totalCount: 15,
      },
    });

    const starredCount = wrapper.find(".todo-info__starred-count");
    const archivedCount = wrapper.find(".todo-info__archived-count");
    const totalCount = wrapper.find(".todo-info__total-count");

    expect(starredCount.text()).toBe("5");
    expect(archivedCount.text()).toBe("10");
    expect(totalCount.text()).toBe("15");
  });
});
