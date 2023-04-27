import express, {Express, Request, Response} from 'express'

const app : Express = express();
const port = 3000;

app.listen(port, function(){
    console.log(`Server started on port ${port}`);
});

app.get('/api/hello', function(req, res){
    res.status(200).send("Adeus");
});