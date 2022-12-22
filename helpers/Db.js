const Logger = require('./Logger');
const Config = require("../models/Config");
const SplitCamelCase = require("./SplitCamelCase");
const C = require('../config')
const Camel = new SplitCamelCase;

module.exports = class Db{
  async create(data, db){
    const sp = data.key.split("/");
    const newRec = new Config({
      category: sp[C.categoryIdx],
      name: sp[C.nameIdx].split(".")[0],
      fullName: Camel.splitCamelCase(sp[C.nameIdx].split(".")[0]),
      url: data.key,
      file: sp[1],
      tag: data.tag,
      bio: Camel.splitCamelCase(sp[C.nameIdx].split(".")[0])
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