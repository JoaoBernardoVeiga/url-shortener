"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.listen(port, function () {
    console.log(`Server started on port ${port}`);
});
app.get('/api/hello_world', function (req, res) {
    res.status(200).send("Adeus");
});
