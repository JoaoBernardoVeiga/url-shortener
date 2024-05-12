import { generateShortId } from "../../../src/utils/generateShortId";


describe('generateShortId', () => {
    test('Should generate a random short id from the given link', () => {
        // Arrange
        const link = 'https://www.example.com';
        const expectedShortId = "e149be13";

        // Act
        const shortId = generateShortId(link);

        // Assert
        expect(shortId).toBe(expectedShortId);
    });
});