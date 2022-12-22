const Logger = require('./Logger');
const Config = require("../models/Config");

module.exports = class Db{
  async create(data, db){
    const sp = data.key.split("/");
    const newRec = new Config({
      category: sp[0],
      url: data.key,
      file: sp[1],
      tag: data.tag
    });

    new Logger('Info', `File created ${await newRec.save()}`);
    new Logger('Info', "Closing database");
    return db.close();
  }

  async remove(data, db){
    let delRec = null;
    const oldRec = await Config.findOne({
      url: data.key
    });

    new Logger('Info', `File ${oldRec}`);
    if(oldRec){
      delRec = await Config.deleteOne({ _id: oldRec._id });
    }

    if(delRec){
      new Logger('Info', `File removed ${delRec}`);
    } else {
      new Logger('Info', `File not removed because it does not exist`);
    }
    
    new Logger('Info', "Closing database");
    return db.close();
  }
}