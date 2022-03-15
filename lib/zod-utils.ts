import { z } from 'zod';

export function zodErrorsToString(err: z.ZodError<any>) {
  return err?.errors?.map((el) => el.message).join(', ');
}

export const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === 'string') {
      return {
        message: `Please enter text as input for ${issue.path?.[0] || 'part'}`,
      };
    }
    if (issue.expected === 'number') {
      return {
        message: `Please enter a number as input for ${
          issue.path?.[0] || 'part'
        }`,
      };
    }
    if (issue.expected === 'date') {
      return {
        message: `Please enter a date as input for ${
          issue.path?.[0] || 'part'
        }`,
      };
    }
  }

  // add more error types here.
  return { message: ctx.defaultError };
};
