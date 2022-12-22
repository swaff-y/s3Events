const Logger = require('./Logger');

module.exports = class EventProcessor{
  constructor(event){
    this.event = event;
    try{
      this.processEvent();
    } catch(error) {
      new Logger('Error', error);
    }
  }

  processEvent(){
    const event = this.event;
    const records = event.Records;
    const regexp = /ObjectCreated/gi;
    this.data = {};

    if(records && Array.isArray(records)) {
      records.forEach((record) => {
        const body = record.body
        const recs = JSON.parse(body).Records
        if(recs && Array.isArray(recs)) {
          recs.forEach((rec) => {
            const eventName = rec.eventName;
            const s3 = rec.s3;
            const s3Object = s3.object
            const eventKey = s3Object.key
            const data = { 
              type: eventName,
              s3: s3Object,
              key: eventKey
            }
            if(eventName.match(regexp)){
              data.size = s3Object.size;
              data.tag = s3Object.eTag;
            }
            return this.data = data;
          })
        }
      })
    }
  }
}