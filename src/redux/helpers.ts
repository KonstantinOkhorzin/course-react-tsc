import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
  return typeof error === 'object' && error != null && 'status' in error;
};

const isErrorWithMessage = (error: unknown): error is { message: string } => {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof error.message === 'string'
  );
};

export const errorHandler = (error: unknown): string => {
  if (isFetchBaseQueryError(error)) {
    return error.status === 'PARSING_ERROR' ? error.data : JSON.stringify(error.data);
  } else if (isErrorWithMessage(error)) {
    return error.message;
  } else {
    return 'An error occurred';
  }
};
