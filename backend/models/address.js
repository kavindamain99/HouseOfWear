import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    addresses : [{
        addressId : {
            type : Number,
            required : true
        },
        name : {
            type : String,
            required : true
        },
        mobileNumber : {
            type : String,
            required : true
        },
        province : {
            type : String,
            required : true
        },
        district : {
            type : String,
            required : true
        },
        city : {   
            type : String,
            required : true
        },
        address : {
            type : String,
            required : true
        },
        defaultShippingAddress : {
            type : Boolean,
            default : false
        },
        defaultBillingAddress : {
            type : Boolean,
            default : false
        }
    }]
});

const Address = mongoose.model('Address', addressSchema);
export default Address;