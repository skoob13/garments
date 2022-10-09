export function omitStylingProps<P extends Record<string, unknown>>(props: P, filterStr: string = '$') {
  return Object.fromEntries(Object.entries(props).filter(([propName]) => !propName.startsWith(filterStr)));
}
