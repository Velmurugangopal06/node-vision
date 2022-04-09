var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');

router.post('/classify', function(req, res, next) {
  // DON'T return the hardcoded response after implementing the backend
  let response = ["shoe", "red", "nike"];

  // Your code starts here //
  const config = new AWS.Config({
    accessKeyId: 'AKIARAR74F5B2ZJFROOU',
    secretAccessKey: '58t6FYfBVhi0FhEKFwxOWExsgASY3dtg6EHAPcVP',
    region: 'ap-south-1'
  });

  const client = new AWS.Rekognition();
  const rekognitionRequest = {
    Image: {
      Bytes: req.files.file.data
    },
    MaxLabels: 10
  };

  client.detectLabels(rekognitionRequest, function(error, response) {
    if(error) console.error(error, error.stack);
    else console.log("Response from AWS ", response);
  })
  // Your code ends here //

  res.json({
    "labels": response
  });
});

module.exports = router;
