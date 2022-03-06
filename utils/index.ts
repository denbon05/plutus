import { createHash } from 'crypto';

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const isCanStartUser = (): boolean => false;

export const value2Hash = (value: string): string =>
  createHash('sha256').update(value).digest('hex');
