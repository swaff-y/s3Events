module.exports = class Logger{
  constructor(type, message){
    this.type = type;
    this.message = message;
    try {
      this.processLog();
    } catch (error) {
      this.logObj = {
        type: 'Error',
        message: error
      }
      processLog();
    }
  }

  processLog(){
    if(!this.type) throw 'No log type';
    if(!this.message) throw 'No log message';

    this.logObj = {
      type: this.type,
      message: this.message
    }
    this.writeLog();
  }

  writeLog(){
    switch(this.logObj.type){
      case 'Error':
        this.errorLog(this.logObj); 
      break;
      case 'Warn':
        this.warnLog(this.logObj); 
      break;
      case 'Info':
        this.infoLog(this.logObj); 
      break;
      default:
        throw 'Incorrect Log options'
    }
  }

  errorLog(log){
    console.log('Error:', log.message);
  }

  warnLog(log){
    console.log('Warning:', log.message);
  }

  infoLog(log){
    console.log('Info:', log.message);
  }
};