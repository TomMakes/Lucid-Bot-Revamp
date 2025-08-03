import fs from 'fs';
import path from 'path';
import { SearchLists } from '../types/types';

// Helper function to read lines from a file
function getLines(filePath: string): string[] {
    const content: string = fs.readFileSync(filePath, 'utf-8');
    return content.split(/\r?\n/).filter(line => line.trim().length > 0);
}

// Helper function to get a random element from an array
function randomFrom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Load word lists
const baseDir: string = path.join(__dirname, '../../assets/search');
const modifiers: string[] = getLines(path.join(baseDir, 'SearchModifiers.txt'));
const attributes: string[] = getLines(path.join(baseDir, 'SearchAttributes.txt'));
const items: string[] = getLines(path.join(baseDir, 'SearchItems.txt'));
const locations: string[] = getLines(path.join(baseDir, 'SearchLocations.txt'));

export {
    getLines,
    randomFrom
};

export const searchLists: SearchLists = {
    modifiers,
    attributes,
    items,
    locations
};
