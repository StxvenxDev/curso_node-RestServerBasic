import {Schema, model} from 'mongoose';


const userSchema = Schema({
    name : {
        type : String,
        required : [true, 'El nombre es obligatorio']
    },
    password : {
        type : String,
        required : [true, 'La contraseña es obligatoria']
    },
    email : {
        type : String,
        required : [true, 'El correo es obligatorio'],
        unique : true
    },
    role : {
        type : String,
        required : true,
        emun : ['ADMIN_ROLE', 'USER_ROLE'],
        default : 'USER_ROLE'
    },
    img : {
        type : String
    },
    estate : {
        type : Boolean,
        default : true
    },
    google : {
        type : Boolean,
        default : false
    }
});

userSchema.methods.toJSON = function () {
    const {__v, password,_id,...usuario } = this.toObject();
    
    usuario.uid = _id;

    return usuario
}

export default model('User', userSchema);