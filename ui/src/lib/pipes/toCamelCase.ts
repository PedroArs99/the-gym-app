export function toCamelCase(str: string) {
  const firstChar = str[0];
  const rest = str.substring(1);

  return firstChar.toUpperCase() + rest.toLowerCase();
}
