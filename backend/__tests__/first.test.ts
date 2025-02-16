import { describe, expect, test } from "@jest/globals";

describe("Basic Test Suite", () => {
    test("should always pass", () => {
      expect(1 + 1).toBe(2);
    });
  });