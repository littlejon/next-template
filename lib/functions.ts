export const compactObj = (obj: { [s: string]: unknown }) => {
  if (obj === undefined || obj === null) return obj;

  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined)
  );
};
