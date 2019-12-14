export const combineClasses = (...classes: Array<string | undefined>): string =>
  classes.join(" ").trim();
