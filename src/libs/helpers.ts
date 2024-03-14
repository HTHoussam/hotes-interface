export function isEven(v: number) {
  return v % 2 === 0;
}

export const formatNumber = (number: number, precision = 2) => {
  return number != null ? Intl.NumberFormat('nb-NY', { maximumFractionDigits: precision }).format(number) : '';
};

export const formatNumberToNor = (number: number, precision = 2) => {
  return number != null
    ? Intl.NumberFormat('en-US', { maximumFractionDigits: precision })
        .format(number)
        .replaceAll(',', ' ')
        .replace('.', ',')
    : '';
};
export const reverseFormatNumber = (formattedNumber: string) => {
  const numericString = formattedNumber.replaceAll(/[^\d.,-]/g, '').replace(',', '.');
  const parsedNumber = parseFloat(numericString);
  return isNaN(parsedNumber) ? null : parsedNumber;
};

export function intersectionOfArrays(arrays: object[][]): object[] {
  if (!arrays.length) return [];

  // Find the first non-empty array
  const nonEmptyArray = arrays.find((array) => array.length > 0);
  if (!nonEmptyArray) return [];

  const initialIntersection = nonEmptyArray;
  return arrays.reduce((intersection, array) => {
    if (array.length === 0) return intersection;
    return intersection.filter((element) => array.some((item) => JSON.stringify(item) === JSON.stringify(element)));
  }, initialIntersection);
}

export function unionOfArrays(arrays: object[][]) {
  if (!arrays.length) return [];

  const unionSet = new Set<string>();

  arrays.forEach((array) => {
    array.forEach((item) => {
      unionSet.add(JSON.stringify(item));
    });
  });

  return Array.from(unionSet).map((item) => JSON.parse(item));
}

export function deepArrayCompare(arr1: string | any[], arr2: string | any[]) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return false;
  }

  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
      if (!deepArrayCompare(arr1[i], arr2[i])) {
        return false;
      }
    } else if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
export function deepCompareObjectsArrays(arr1: object[], arr2: object[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const sortedArr1 = JSON.stringify(arr1.sort());
  const sortedArr2 = JSON.stringify(arr2.sort());

  return sortedArr1 === sortedArr2;
}

/**
 *
 * @param date date as string or Date object if date is string it should be formatted to DD.MM.YYYY format before handf
 * @returns boolean: true if day is saturday or sunday false if any other day of the week
 */
export function IsWeekend(date: string | Date) {
  const dateObject =
    typeof date === 'string'
      ? new Date(Number(date.split('.')[2]), Number(date.split('.')[1]), Number(date.split('.')[0]))
      : date;
  const dayOfWeek = dateObject.toDateString();
  console.log('dayOfWeek', dayOfWeek);
  console.log(
    "dayOfWeek.includes('Sat') ",
    dayOfWeek.includes('Sat'),
    "dayOfWeek.includes('Sun')",
    dayOfWeek.includes('Sun'),
  );
  return dayOfWeek.includes('Sat') || dayOfWeek.includes('Sun');
}
