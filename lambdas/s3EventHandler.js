exports.handler = event => {
  console.log('event => ', event)
  const records = event.Records;

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
          if(eventName == 'ObjectCreated:Put'){
            data.size = s3Object.size;
            data.tag = s3Object.eTag;
          }
          console.log('Data: ', data);
        })
      }
    })
  }
}