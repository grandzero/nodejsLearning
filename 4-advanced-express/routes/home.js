const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
	res.render('index', {title:'My Express Title', message: "Hello world"});//Birinci parametre kullanılacak pug'ın adıdır. İkinci obje ise vereceğimiz değerlerdir.
});
module.exports = router;