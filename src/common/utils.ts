export function toDateTimeString(date: Date, locale?: string) {
  return date.toLocaleString(locale, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function toShortDateTimeString(date: Date, locale?: string) {
  const dateTimeString = toDateTimeString(date, locale);

  if (dateTimeString && locale === 'fi') {
    // This is a pretty ugly way to go about it, but I couldn't find a
    // way to use the API to remove this prefix.
    return dateTimeString.replace(' klo', ',');
  }

  return dateTimeString;
}

export function sum(numbers: number[]): number {
  return numbers.reduce((sum: number, capacity: number) => sum + capacity, 0);
}
