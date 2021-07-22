const express = require('express');
const router = express.Router();


const { ComprehendClient, DetectSentimentCommand, DetectKeyPhrasesCommand  } = require("@aws-sdk/client-comprehend");
const config = {
 credentials:{
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
 },
 region: 'ap-northeast-2'
}

const client = new ComprehendClient(config);
router.get( '/compre',  async (req, res) => {
    const input = {
        LanguageCode: 'ko',
        Text:"사랑하는 시민 여러분들"
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
})

module.exports = router;
