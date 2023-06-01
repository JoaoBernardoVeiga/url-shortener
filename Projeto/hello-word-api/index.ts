import express, { Express, Request, Response } from 'express';
import pg from 'pg';

const app: Express = express();
const port: number = 3000;

app.use(express.static('public'));

const dbConnectionFields = {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'postgres'
}

app.listen(port, function () {
    console.log(`Server started on port ${port}`);
});

app.get('/api/hello_world', function (req: Request, res: Response) {
    res.status(200).send("Adeus");
});

app.get('/db/select/:fields/from/:table', async (req: Request, res: Response) => {

    const fields: string[] = req.params.fields.split(',');
    const table: string = req.params.table;
    
    const pool = new pg.Pool(dbConnectionFields);
    
    const query = `SELECT ${fields.join(',')} FROM ${table}`;
    await pool.query(query)
        .then((result) => {
            const rows = result.rows;
            res.status(200).json(rows);
        })
        .catch((err) => {
            console.error('Failed to execute the database query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});
