const Logger = require('../helpers/logger');
const EventProcessor = require('../helpers/eventProcessor');
const mongoose = require('mongoose');

exports.handler = event => {
  const dbConnect = async (event) => {
    let db = null;
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
        .then(() => {
          new Logger('Info', 'Connected to database')
          const eventProcessor = new EventProcessor(event);
          const data = eventProcessor.data;
          new Logger('Info', data);
        })
        db = mongoose.connection;
        new Logger('Info', "Closing database");
        db.close();
    } catch (err) {
        (db) && db.close();

        new Logger('Error', `Error at dbConnect :: ${err}`);
    }
  }
  dbConnect(event);
}