const express = require('express');
const cors = require('cors');
const http = require('http');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { client } = require('./src/Utilis/db.config')
const { blogRouter } = require('./src/routes/contents.router');

require('dotenv').config();

const port = process.env.PORT || 5000
const app = express();

app.use(cors());
app.use(express.json());

app.use('/blogs', blogRouter);

const expressServer = http.createServer(app)

expressServer.listen(port, () => {
    console.log('running exserver', port);
})


app.get('/', (req, res) => {
    res.send('coderAccess exp server running')
});

process.on('uncaughtExceptionMonitor', (err) => {
    console.log(err.name, err.message);
    app.close(() => {
        process.exit(1)
    })
})
