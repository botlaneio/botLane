import { describe, expect, it } from "vitest";
import { getSolution, solutions } from "./solutions";

describe("solutions content", () => {
  it("has five solutions with unique slugs", () => {
    expect(solutions).toHaveLength(5);
    expect(new Set(solutions.map((s) => s.slug)).size).toBe(5);
  });

  it("gives every solution a full run and clear limits", () => {
    for (const s of solutions) {
      expect(s.steps.length, s.slug).toBeGreaterThanOrEqual(3);
      expect(s.never.length, s.slug).toBeGreaterThanOrEqual(2);
      expect(s.headline, s.slug).toMatch(/\*[^*]+\*/);
    }
  });

  it("returns undefined for unknown slugs", () => {
    expect(getSolution("nope")).toBeUndefined();
  });
});
