export default function stringToCamelCase(string) {
  // Lower cases the string
  return string.replace(
    /(\w)(\w*)/g,
    (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
  );
}
