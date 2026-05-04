export const isValidDateTime = (input: string): boolean => {
  if (typeof input !== 'string') {
    return false;
  }
  const date = new Date(input);
  return !isNaN(date.getTime());
}

export const isISODateTime = (input: string): boolean => {
  const ISOFormat: RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
  return ISOFormat.test(input);
}

export const isFutureDate = (input: string): boolean => {
  return new Date(input) > new Date();
}

export const isStartBeforeEnd = (start: Date | string, end: Date | string): boolean => {
  return new Date(start) < new Date(end);
}

