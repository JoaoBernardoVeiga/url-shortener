import express, { Express, Request, Response } from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';
import md5 from 'md5';

const app: Express = express();
const port: number = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const dbConnectionFields = {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'postgres'
}

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

app.get('/api/hello_world', (req, res) => {
    res.status(200).send("Adeus");
});

// Route handler for GET /api/sign_up
app.get('/api/sign_up', (req, res) => {
    res.sendFile(__dirname + "/sign_up.html");
});

// POST endpoint for /api/sign_up
app.post('/api/sign_up', async (req, res) => {
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
        const hashedPassword = md5(password);
        
        const client = new pg.Client(dbConnectionFields);
        
        client.connect()
            .then(() => {
                console.log('Connected to the database');
            })
            .catch((err) => {
                console.error('Failed to connect to the database', err);
            });
        
        // Insert new user into the database
        await client.query(
            'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)',
            [name, email, hashedPassword]
        );

        await client.end();

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'An unexpected error occurred' });
    }
});