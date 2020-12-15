const express = require('express');
const router = express.Router();
const {Rental, validate} = require('../models/rental');
const {Movies} = require('../models/movies');
const {Customer} = require('../models/customers');
const mongoose = require('mongoose');
const Fawn = require('fawn');

Fawn.init(mongoose);

router.get('/', async (req,res) => {

    //Go to rentals and find all
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async (req,res) => {
    const {error} = validate(req.body);
    
    if(error) return res.status(400).send(error.details[0].message);
    //Object id validate etmezsek request askıda kalır ve konsola hata mesajı basılır.
    if(mongoose.Types.ObjectId.isValid(req.body.customerId)) return res.status(400).send("Invalid ID")
    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid Customer');
    console.log(customer);
    //Burada yapmak istemezsek ve bunun yerine doğrudan validate fonksiyonunda yapmak istersek joi paketine ek olarak joi-objectid ekleyebiliriz. Ama güvenli bir paket değildir manuel yapmak daha iyi olabilir. Ama tek yerden kontrolü o şekilde sağlayabiliriz.
    if(mongoose.Types.ObjectId.isValid(req.body.movieId)) return res.status(400).send("Invalid ID")
    const movie = await Movies.findById(req.body.movieId);
    console.log(movie);
    if(!movie) return res.status(400).send('Invalid Movie');

    if(movie.numberInStock === 0) return res.status(400).send('Movie out of stock');
    //Şimdi burada öncelikle post requeste movie id ve customer id geliyor. Bu id'ler yardımıyla önce belli kontroller gerçekleştiriyoruz. Bu kontroller o müşteri var mı? O film var mı? O film stokta var mı gibi kontroller.
    //Daha sonra da rental dökümanımızı hazırlıyoruz. Ama bu dökümanı hazırlarken kullanıcı ve film id'lerini de kendimiz bulduğumuz bu kullanıcı ve film id'leri olarak set ediyoruz.
    //Böyle yapmamızın amacı daha sonra bu rental işlemi esnasında daha fazla bilgi ihtiyacımız olursa bu id'ler yardımıyla diğer collectionlara göz atıp detaylı bütün bilgileri alabiliriz.
    let rental = await new Rental({
        customer:{
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    /*await rental.save();
    //Burada birinci save işlemini yaptıktan sonra bir sorun oluşabilir. Sunucu çökebilir, mongoyla bağlantı kesilebilir. Bu durumda rental işlemi gerçekleşse bile movie save gerçekleşmediği için sorunlar çıkacaktır.
    //Bu sorunu aşmak için Transaction yapmak gerekir.
    //Transaction yapmak için two phase commit gerekir çünkü mongoda transaction olayı yoktur. Diğer Relational db'lerde vardır. Bu tarz zincirleme işlemler ya hep birlikte gerçekleşir ya da hiç birisi gerçekleşmez transaction ile.
    movie.numberInStock--;
    movie.save();*/
    try{
    new Fawn.Task()
        .save('rentals', rental)//Burada doğrudan collection adı ile çalışıyoruz. Bu yüzden birinci string argüman hem case sensitive hem de çoğuldur. Yani doğrudan mongodb'deki collection adını vermemiz gerekiyor.
        .update('movies', {_id: movie._id}, {
            $inc: {numberInStock: -1}
        })
        .run();
    }catch(e){
        console.log(e);
        res.status(500).send('Something failed');
    }
    res.send(rental);
})






module.exports = router;