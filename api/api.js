const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://vibho4797:Shreeram1@cluster0.ta7rcn8.mongodb.net/mydb', {useNewUrlParser: true, useUnifiedTopology: true });
const Device = require('./models/device'); 
const express = require('express');


const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const port = 5000;

app.get('/api/test', (req, res) => {
  res.send('The API is working!');
});

app.use(express.static(`${__dirname}/public/generated-docs`));

app.get('/docs', (req, res) => {
  res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});   

/**
* @api {get} /api/devices AllDevices An array of all devices
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*  [
*    {
*      "_id": "dsohsdohsdofhsofhosfhsofh",
*      "name": "Mary's iPhone",
*      "user": "mary",
*      "sensorData": [
*        {
*          "ts": "1529542230",
*          "temp": 12,
*          "loc": {
*            "lat": -37.84674,
*            "lon": 145.115113
*          }
*        },
*        {
*          "ts": "1529572230",
*          "temp": 17,
*          "loc": {
*            "lat": -37.850026,
*            "lon": 145.117683
*          }
*        }
*      ]
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

// This code defines a route to handle a POST request to create a new device with sensor data
app.post('/api/devices', (req, res) => {
  // This code extracts the relevant information from the request body, including the device name, user and sensor data
  const { name, user, sensorData } = req.body;
  // This code creates a new Device object with the extracted information
  const newDevice = new Device({
    name,
    user,
    sensorData
  });

  // This code saves the new device to the database and returns an appropriate response
  newDevice.save(err => {
    return err
      ? res.send(err)
      : res.send('successfully added device and data');
  });
});

// Define an HTTP GET route on '/api/devices'
app.get('/api/devices', (req, res) => {
  // To retrieve all devices from the database, use the 'Device' model 
  Device.find({}, (err, devices) => {
    // Send the error response to the client if there is an error
    if (err == true) {
      return res.send(err);
    } else {
      // Send the retrieved devices as the response if there are no errors 
      return res.send(devices);
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});