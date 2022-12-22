const Logger = require('../helpers/Logger');
const Config = require("../models/Config");
const Db = require("../helpers/Db");
const EventProcessor = require('../helpers/EventProcessor');
const mongoose = require('mongoose');

exports.handler = event => {
  const regexpCreated = /ObjectCreated/gi;
  const regexpRemoved = /ObjectRemoved/gi;
  const dbConnect = async (data) => {
    let db = null;
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
        .then(() => {
          const db = mongoose.connection;
          DbInst = new Db;
          new Logger('Info', 'Connected to database');
          if(data.type.match(regexpCreated)) {
            new Logger('Info', `Processing Created File "${data.key}"`);
            DbInst.create(data, db);
          } else if(data.type.match(regexpRemoved)) {
            new Logger('Info', `Processing Deleted File "${data.key}"`);
            DbInst.remove(data, db);
          } else new Logger('Error', `Incorrect file event type`);
        })
    } catch (err) {
        (db) && db.close();

        new Logger('Error', `Error at dbConnect :: ${err}`);
    }
  }
  const eventProcessor = new EventProcessor(event);
  const data = eventProcessor.data;
  new Logger('Info', data);
  try {
    if(data.type.match(regexpCreated) || data.type.match(regexpRemoved))
    dbConnect(data);
  else
    new Logger('Info', 'Not a recognised event, ignoring.');
  } catch(err) {
    new Logger('Error', err);
  }
}