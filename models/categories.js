import {Schema,model} from 'mongoose';

const Category = Schema({
    name : {
        type : String,
        required : [true,'El name es obligatorio']
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
    }
})
Category.methods.toJSON = function () {
    const {__v,...category } = this.toObject();
    return category
}


export default model('Category',Category);