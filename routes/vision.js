var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');

router.post('/classify', function(req, res, next) {
  // DON'T return the hardcoded response after implementing the backend
  let response = ["shoe", "red", "nike"];

  // Your code starts here //
  let region = 'ap-southeast-1';
  let accessKeyId = 'AKIARAR74F5B2ZJFROOU';
  let secretAccessKey = '58t6"shoe", "red", "nike"FYfBVhi0FhEKFwxOWExsgASY3dtg6EHAPcVP';

  if(req?.files?.file?.data?.length > 0) {
    // Update AWS Config as Local have config
    AWS.config.update({
      accessKeyId, 
      secretAccessKey, 
      region
    });

    const client = new AWS.Rekognition();
    //
    const rekognitionRequest = {
      Image: {
        Bytes: req.files.file.data
      }
    };
    //
    client.detectLabels(rekognitionRequest, function(awsRekError, awsRekData) {
      if(awsRekError) 
        res.json({
          "error": awsRekError,
        })
      else {
        response = awsRekData?.Labels?.map((m) => {
                    return m.Name
                  });
        res.json({
          "labels": response
        });
      }
    })
  } else {
    res.json({
      "error": "Uploaded File is unreadable or not a valid filetype to process"
    })
  }
  // Your code ends here //
});

module.exports = router;
