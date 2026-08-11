'use server';

import { z } from 'zod';
import { UnauthorizedError, ValidationError } from '../http-errors';
import { auth } from '@/auth';
import { Session } from 'next-auth';
import dbConnect from '../mongoose';

/*
  1. Checking whether the schema and params are provided and validated.
  2. Checking whether the user is authorized.
  3. Connecting to the database.
  4. Returning the params and session.
*/

type ActionOptions<T> = {
  params?: T;
  schema?: z.ZodType<T>;
  authorize?: boolean;
};

async function action<T>({
  params,
  schema,
  authorize = false
}: ActionOptions<T>) {
  if (schema && params) {
    try {
      schema.parse(params);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return new ValidationError(
          z.flattenError(error).fieldErrors as Record<string, string[]>
        );
      } else {
        return new Error('Schema validation failed');
      }
    }
  }

  let session: Session | null = null;

  if (authorize) {
    session = await auth();

    if (!session) {
      return new UnauthorizedError();
    }
  }

  await dbConnect();

  return { params, session };
}

export default action;
