const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = mongoose.Schema({
    isGold: {type: Boolean, required: true, default: false},
    name: {type: String, 
        required: true,
        //isAsync: true, // Böylece validator fonksiyonumuz async çalışabilir 
        validator: function(v,callback){
            callback(v.length > 2 && v.length < 10);
        } },
    phone: {type: String,
        min: 5555,
        max: 9999999, 
        required: function () {
            return this.name;
        }
    }
});
const Customer = mongoose.model('Customer', customerSchema);
exports.Customer = Customer;
