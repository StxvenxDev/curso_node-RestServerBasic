import {Schema,model} from 'mongoose';

const Product = Schema({
    name : {
        type : String,
        required : [true, 'El name es obligatorio'],
        unique : true
    },
    state : {
        type : Boolean,
        default : true,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : 'true'
    },
    category : {
        type : Schema.Types.ObjectId,
        ref : 'Category',
        required : 'true'
    },
    description : {
        type : String
    },
    disponible : {
        type : Boolean,
        default : true
    },
    img : {
        type : String
    }
})

Product.methods.toJSON = function () {
    const {__v,...product } = this.toObject();
    return product
}


export default model('Product',Product);