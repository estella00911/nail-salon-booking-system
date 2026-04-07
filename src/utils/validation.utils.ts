export const isValidId = (id: unknown): boolean => {
  if (typeof id === 'number' && Number.isInteger(id) && id > 0) {
    return true;
  }
  return false;
}