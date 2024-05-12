"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateShortId = void 0;
const md5_1 = __importDefault(require("md5"));
// Helper function to generate a random short id
function generateShortId(link) {
    link = (0, md5_1.default)(link);
    const shortId = link.substring(0, 8);
    return shortId;
}
exports.generateShortId = generateShortId;
