"use server";

import { handleAssessment, type FormState } from "@/lib/inquiry";

export async function submitAssessment(_prev: FormState, formData: FormData): Promise<FormState> {
  return handleAssessment(formData);
}
