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

app.get('/api/hello_world', function (req, res) {
    res.status(200).send("Adeus");
});

app.get('/db/select/:fields/from/:table', (req: Request, res: Response) => {

    const fields: string[] = req.params.fields.split(',');
    const table: string = req.params.table;
    
    const client = new pg.Client(dbConnectionFields);
    
    client.connect()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.error('Failed to connect to the database', err);
    });
    
    const query = `SELECT ${fields.join(',')} FROM ${table}`;
    console.log(query);
    client.query(query)
        .then((result) => {
            const rows = result.rows;
            res.status(200).json(rows);
            client.end();
        })
        .catch((err) => {
            console.error('Failed to execute the database query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});
