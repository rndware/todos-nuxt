import { describe, it, expect, vi } from "vitest";
import { parentEmit } from "@/utils/parentEmit";

describe("parentEmit", () => {
  it("should call emit with the correct action and arguments", () => {
    // Mock the emit function
    const emitMock = vi.fn();
    const action = "test-action";

    // Create the parentEmit function with the mock
    const emitFunction = parentEmit(emitMock, action);

    // Call the emitFunction with some arguments
    emitFunction("arg1", "arg2");

    // Assert that the emit function was called with the correct arguments
    expect(emitMock).toHaveBeenCalledWith(action, "arg1", "arg2");

    // Call the emitFunction with different arguments
    emitFunction("arg3", "arg4", "arg5");

    // Assert that the emit function was called with the new arguments
    expect(emitMock).toHaveBeenCalledWith(action, "arg3", "arg4", "arg5");
  });
});
