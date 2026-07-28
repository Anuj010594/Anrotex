import { z } from "zod";

const hasUnsupportedSingleLineCharacter = (value: string) =>
  Array.from(value).some((character) => {
    const code = character.charCodeAt(0);
    return code <= 31 || code === 127;
  });

const hasUnsupportedMessageCharacter = (value: string) =>
  Array.from(value).some((character) => {
    const code = character.charCodeAt(0);
    const isAllowedWhitespace = code === 9 || code === 10 || code === 13;
    return (code <= 31 && !isAllowedWhitespace) || code === 127;
  });

export const PROJECT_TYPES = [
  "AWS Cost Optimization Audit",
  "Reduce cloud costs",
  "Improve deployment speed",
  "Scale Kubernetes reliably",
  "Improve observability",
  "Modernize infrastructure",
  "Something else",
] as const;

const singleLineText = (label: string, maximum: number) =>
  z
    .string()
    .trim()
    .min(2, `${label} is required`)
    .max(maximum, `${label} is too long`)
    .refine((value) => !hasUnsupportedSingleLineCharacter(value), {
      message: `${label} contains unsupported characters`,
    });

export const leadSubmissionSchema = z
  .object({
    name: singleLineText("Name", 80),
    email: z.string().trim().email("Enter a valid email").max(254),
    company: z
      .string()
      .trim()
      .max(120, "Company name is too long")
      .refine((value) => !hasUnsupportedSingleLineCharacter(value), {
        message: "Company name contains unsupported characters",
      })
      .default(""),
    projectType: z.enum(PROJECT_TYPES).or(z.literal("")).default(""),
    message: z
      .string()
      .trim()
      .min(10, "Add a little more detail")
      .max(3000, "Message is too long")
      .refine((value) => !hasUnsupportedMessageCharacter(value), {
        message: "Message contains unsupported characters",
      }),
    source: z.string().trim().max(180).default("/contact"),
    website: z.string().trim().max(200).default(""),
    startedAt: z.number().int().positive(),
    turnstileToken: z.string().trim().max(2048).default(""),
  })
  .strict();

export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;
