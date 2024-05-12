"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateShortId_1 = require("../../../src/utils/generateShortId");
describe('generateShortId', () => {
    test('Should generate a random short id from the given link', () => {
        // Arrange
        const link = 'https://www.example.com';
        const expectedShortId = "e149be13";
        // Act
        const shortId = (0, generateShortId_1.generateShortId)(link);
        // Assert
        expect(shortId).toBe(expectedShortId);
    });
});
