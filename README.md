# s3Events

## Description
This is a lambda to handle s3 create and delete events in AWS. 

## Stack
- Node
- MongoDb
- Mongoose
- Minimist

## To run Lambda locally
``` 
# When a file is created
./processor.js fixtures/create.json

# When a file is deleted
./processor.js fixtures/delete.json
```

## Environment Variables
```
# To set the environmet variable locally
export DATABASE_URL=mongodb://xxx
```

## To deploy
```
serverless deploy
```


