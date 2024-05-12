"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const generateShortId_1 = require("./src/utils/generateShortId");
const pg_1 = __importDefault(require("pg"));
const body_parser_1 = __importDefault(require("body-parser"));
const md5_1 = __importDefault(require("md5"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
const pool = new pg_1.default.Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || ""),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});
app.get('/api/hello_world', (req, res) => {
    res.status(200).send("Adeus");
});
// Route handler for GET /api/sign_up
app.get('/api/sign_up', (req, res) => {
    res.sendFile(__dirname + "/public/html/sign_up.html");
});
// Route handler for GET /shortener - Return webpage with form to input link
app.get("/shortener", (req, res) => {
    res.sendFile(__dirname + "/public/html/shortener_form.html");
});
// Route handler for GET /s/:short_url - Redirect to the appropriate link
app.get('/s/:shortUrl', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shortUrl } = req.params;
        // Retrieve the original URL from the "entries" table using the short id
        const result = yield pool.query('SELECT original_url, creation_date FROM entries WHERE short_id = $1', [shortUrl]);
        if (result.rowCount > 0) {
            const creationDate = (new Date(result.rows[0].creation_date)).valueOf() / 1000;
            const now = ((new Date()).valueOf() / 1000) - (60 * 60);
            if (now - creationDate > 60) {
                res.status(410).send('Link has expired.');
            }
            const originalUrl = result.rows[0].original_url;
            res.redirect(originalUrl);
        }
        else {
            res.status(404).send('URL not found');
        }
    }
    catch (error) {
        console.error('Error retrieving original URL:', error);
        res.status(500).send('An error occurred');
    }
}));
// POST endpoint for /api/sign_up
app.post('/api/sign_up', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, confirmPassword } = req.body;
        // Input validation
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }
        // Hash password using MD5
        const hashedPassword = (0, md5_1.default)(password);
        // Insert new user into the database
        yield pool.query('INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)', [name, email, hashedPassword]);
        return res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
}));
// Route handler for POST /shortener - Create short URL and return to user
app.post('/shortener', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link } = req.body;
        // Generate a random short id
        const shortId = (0, generateShortId_1.generateShortId)(link);
        // Insert the entry into the "entries" table
        yield pool.query('INSERT INTO entries (creation_date, short_id, original_url) VALUES (current_timestamp, $1, $2) ON CONFLICT (short_id) DO UPDATE SET creation_date = now(), original_url = $3', [shortId, link, link]);
        // Construct the short URL
        const shortUrl = `${req.protocol}://${req.get('host')}/s/${shortId}`;
        // Return the short URL to the user
        res.send(shortUrl);
    }
    catch (error) {
        console.error('Error creating short URL:', error);
        res.status(500).send('An error occurred');
    }
}));
app.get('/db/select/:fields/from/:table', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = req.params.fields.split(',');
    const table = req.params.table;
    const query = `SELECT ${fields.join(',')} FROM ${table}`;
    yield pool.query(query)
        .then((result) => {
        const rows = result.rows;
        res.status(200).json(rows);
    })
        .catch((err) => {
        console.error('Failed to execute the database query', err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
}));
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
