const { MongoClient } = require('mongo')
const {
    BD_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME
} = process.env;

const mongoUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${BD_NAME}`;

let connection;

async function connectDB(){
    if(connection) return connection;

    let client

    try {
        client = await MongoClient.connect(mongoUrl, { 
            useNewUrlParser: true
        })
        Connection = client.db(DB_NAME);
    } catch (error) {
        console.error('Could not connect to database', mongoUrl, error);
        process.exit(1)
    }
    return connection;
}

module.exports = connectDB;
