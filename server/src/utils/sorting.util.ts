export const sortArray = <T>(
  array: T[],
  field: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...array].sort((a: T, b: T) => {
    const aValue = a[field];
    const bValue = b[field];
    
    if (aValue < bValue) return order === 'desc' ? 1 : -1;
    if (aValue > bValue) return order === 'desc' ? -1 : 1;
    return 0;
  });
};