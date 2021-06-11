const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname ,'../views', 'calendar.html' ))

});


router.post('/', (req, res) => {
    const date = req.body.day;

   
      if (result[0] !== undefined) {

        res.send({result:true})
        console.log('sdasd');
        req.session.date = result[0].day; 
        //res.session.id : res.session.userId

        req.session.date = day;
        console.log(req.session);
        } else { 
        req.send.date ({result:false})
      }
    });



module.exports = router;