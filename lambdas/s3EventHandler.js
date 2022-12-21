const Logger = require('../helpers/logger');
const EventProcessor = require('../helpers/eventProcessor');

exports.handler = event => {
  const eventProcessor = new EventProcessor(event);
  new Logger('Info', eventProcessor.data);
}