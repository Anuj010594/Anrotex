import { describe, expect, it } from "vitest";
import { leadSubmissionSchema } from "./lead-security";

const validLead = {
  name: "Anuj Dhadge",
  email: "anuj@example.com",
  company: "Anrotex",
  projectType: "AWS Cost Optimization Audit",
  message: "We need a focused review of our AWS account.",
  source: "/aws-cost-optimization",
  website: "",
  startedAt: Date.now() - 10_000,
  turnstileToken: "",
};

describe("leadSubmissionSchema", () => {
  it("accepts a valid lead", () => {
    expect(leadSubmissionSchema.safeParse(validLead).success).toBe(true);
    for (const projectType of ["DevOps consulting", "Scale Kubernetes reliably"]) {
      expect(leadSubmissionSchema.safeParse({ ...validLead, projectType }).success).toBe(true);
    }
    expect(leadSubmissionSchema.safeParse({ ...validLead, projectType: "Unknown service" }).success).toBe(false);
  });

  it("rejects invalid email and oversized messages", () => {
    const result = leadSubmissionSchema.safeParse({
      ...validLead,
      email: "not-an-email",
      message: "x".repeat(3001),
    });

    expect(result.success).toBe(false);
  });

  it("rejects unrecognised fields", () => {
    const result = leadSubmissionSchema.safeParse({
      ...validLead,
      unexpected: "value",
    });

    expect(result.success).toBe(false);
  });
});
