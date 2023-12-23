export { default as compare } from 'just-compare';
export { default as groupBy } from 'just-group-by';
export { default as partition } from 'just-partition';
export { default as split } from 'just-split';

export const seconds = (howMany: number) => howMany * 1000;
export const minutes = (howMany: number) => 60 * howMany * seconds(1);
export const hours = (howMany: number) => 60 * howMany * minutes(1);
export const days = (howMany: number) => 24 * howMany * hours(1);
export const weeks = (howMany: number) => 7 * howMany * days(1);
