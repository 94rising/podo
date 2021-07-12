console.log( 'test_compre exec .... ' );
const { ComprehendClient, BatchDetectDominantLanguageCommand } = require("@aws-sdk/client-comprehend");
const COMPRE_OPTION = {
    region:  "ap-northeast-2"
}
// key, COMPRE_OPTION
    const clinet_Test = new ComprehendClient(COMPRE_OPTION)
    const params = {TextList: ['i hate you', 'i love you']};
    const command = new BatchDetectDominantLanguageCommand(params);
    
    
    const testFunc = () => {
        (console.log( command))
        clinet_Test.send(command)
        .then( (result) => {
            console.log(result)
    
        }, (err) => {
            console.log( 'err', err );
        } )
        .catch( err => {
            console.log('err => ', console.log(err))
        } )
    }
    testFunc(); 
    