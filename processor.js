#!/usr/bin/env node
'use strict';

const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const { handler } = require('./lambdas/s3EventHandler.js');

class Processor{
  constructor(argv){
    this.args = argv;
    try {
      this.processOptions();
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  processOptions(){
    const args = this.args._;
    if(!Array.isArray(args) || args.length < 1) throw "Arguments are not correct";
    if(args.length > 1) throw "Too many arguments";

    const filepath = this.args._[0];
    this.event = JSON.parse(fs.readFileSync('./' + filepath, 'utf8'));
  }
}

const processor = new Processor(argv);
handler(processor.event);
