export const toPascalCase = (str: any) =>
    (str.match(/[a-zA-Z0-9]+/g) || [])
        .map((w: any) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
        .join("");