const express = require('express');
const router = express.Router();
const path = require('path');
const dbConnection = require('../util/database');
const session = require('express-session');

const { ComprehendClient, DetectSentimentCommand, DetectKeyPhrasesCommand  } = require("@aws-sdk/client-comprehend");
const config = {
 credentials:{
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
 },
 region: 'ap-northeast-2'
}

const client = new ComprehendClient(config);




router.get( '/',  async (req, res) => {
   
  res.sendFile(path.join(__dirname ,'../views', 'compre.html' ))

    
    
})


router.post("/", async (req, res) => { 
    const content = req.body.content
    console.log('확인 :' + content)



 const input = {
    LanguageCode: 'ko',
    Text: content
}
const command = new DetectSentimentCommand(input);
const command2 = new DetectKeyPhrasesCommand(input);

const response = await client.send(command);
const response2 = await client.send(command2);

console.log('test string => ', input.Text);
console.log(response);
console.log(response.Sentiment)
console.log('\n\n\n=========================\n\n\n')
console.log(response2);



});


async function comprehend () {
    
 const input = {
    LanguageCode: 'ko',
    Text: content
}
const command = new DetectSentimentCommand(input);
const command2 = new DetectKeyPhrasesCommand(input);

const response = await client.send(command);
const response2 = await client.send(command2);

console.log('test string => ', input.Text);
console.log(response);
console.log(response.Sentiment)
console.log('\n\n\n=========================\n\n\n')
console.log(response2);
}

module.exports = router;
