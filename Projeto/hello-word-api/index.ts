import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';
import md5 from 'md5';

const app: Express = express();
const port: number = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const pool = new pg.Pool({ 
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || ""),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
});


app.get('/api/hello_world', (req: Request, res: Response) => {
    res.status(200).send("Adeus");
});

// Route handler for GET /api/sign_up
app.get('/api/sign_up', (req: Request, res: Response) => {
    res.sendFile(__dirname + "/public/html/sign_up.html");
});

// Route handler for GET /shortener - Return webpage with form to input link
app.get("/shortener", (req: Request, res: Response) => {
    res.sendFile(__dirname + "/public/html/shortener_form.html");
});

// Route handler for GET /s/:short_url - Redirect to the appropriate link
app.get('/s/:shortUrl', async (req: Request, res: Response) => {
    try {
        const { shortUrl } = req.params;
        
        // Retrieve the original URL from the "entries" table using the short id
        const result = await pool.query('SELECT original_url FROM entries WHERE short_id = $1', [shortUrl]);
        
        if (result.rowCount > 0) {
            const originalUrl = result.rows[0].original_url;
            res.redirect(originalUrl);
        } else {
            res.status(404).send('URL not found');
        }
    } catch (error) {
        console.error('Error retrieving original URL:', error);
        res.status(500).send('An error occurred');
    }
});

// POST endpoint for /api/sign_up
app.post('/api/sign_up', async (req: Request, res: Response) => {
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
        const hashedPassword: string = md5(password);
        
        // Insert new user into the database
        await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)',
            [name, email, hashedPassword]
        );

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
});


// Route handler for POST /shortener - Create short URL and return to user
app.post('/shortener', async (req: Request, res: Response) => {
    try {
        const { link } = req.body;
        
        // Generate a random short id
        const shortId = generateShortId();
        
        // Insert the entry into the "entries" table
        await pool.query('INSERT INTO entries (creation_date, short_id, original_url) VALUES (current_timestamp, $1, $2)', [shortId, link]);
        
        // Construct the short URL
        const shortUrl = `${req.protocol}://${req.get('host')}/s/${shortId}`;
        
        // Return the short URL to the user
        res.send(shortUrl);
    } catch (error) {
        console.error('Error creating short URL:', error);
        res.status(500).send('An error occurred');
    }
});

// Helper function to generate a random short id
function generateShortId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortId = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        shortId += characters.charAt(randomIndex);
    }
    return shortId;
}

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});