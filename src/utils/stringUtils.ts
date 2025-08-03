// String utility functions

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Truncates a string to a specified length and adds ellipsis if needed
 */
export function truncate(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength - 3) + '...';
}

/**
 * Removes extra whitespace from a string
 */
export function normalizeWhitespace(str: string): string {
    return str.trim().replace(/\s+/g, ' ');
}

/**
 * Checks if a string is empty or only contains whitespace
 */
export function isEmpty(str: string): boolean {
    return !str || str.trim().length === 0;
}
