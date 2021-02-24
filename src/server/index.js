const dotenv = require('dotenv');
dotenv.config();

var path = require('path');

const express = require('express');
const mockAPIResponse = require('./mockAPI.js');

const fetch = require('node-fetch');

// Start Application
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('dist'));

app.get('/', function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve('dist/index.html'));
});

// Designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log('Example app listening on port 8081!');
});

app.get('/test', function (req, res) {
  res.send(mockAPIResponse);
});

// POST Route
app.post('/analyse', postData);

function postData(req, res) {
  const { dataURL } = req.body;
  requestAnalyseWebAPI(dataURL).then((dataAPI) => {
    const { confidence, subjectivity, agreement, irony } = dataAPI;

    const parsedData = {
      confidence,
      subjectivity,
      agreement,
      irony,
    };
    res.send(parsedData);
  });
}

// Function to GET Analysis, it points to external WebAPI
const requestAnalyseWebAPI = async (dataURL) => {
  const urlAPI = 'https://api.meaningcloud.com/sentiment-2.1';
  const meaningCloudKey = process.env.API_KEY;
  const language = 'en';
  const completeUrlAPI = `${urlAPI}?key=${meaningCloudKey}&lang=${language}&url=${dataURL}`;

  const response = await fetch(completeUrlAPI);

  try {
    const res = await response.json();
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
