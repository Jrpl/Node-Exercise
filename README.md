# Node-Exercise
A Node API that can log metrics and return the sum of metrics for the past hour

## npm start
Use npm start to launch the application on port 3000

## Routes

### POST localhost:3000/metric/:key
Send a Json object with value property
{
  "value": number
}

### GET localhost:3000/metric/:key/sum
Returns the total value of given key from the past hour
