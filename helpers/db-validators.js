import Role from "../models/role.js"
import User from "../models/User.js";

const esRolValidate = async (role = '') => {
    const roleExist = await Role.findOne({role});
    if(!roleExist){
        throw new Error(`${role} no es un rol valido`);
    }
}

const esEmailValidate = async (email = '' ) => {
    const emailExist = await User.findOne({email});
    if(emailExist){
        throw new Error(`Este correo ya se encuentra registrado`);
    }
}

const esUserValidate = async (id) => {
    const userExist = await User.findById(id);
    if(!userExist){
        throw new Error('Este usuario no existe');
    }
}

const coleccionesPermitidas = async (coleccion, colecciones = []) => {
    const permitida = colecciones.includes(coleccion);
    if(!permitida){
        throw new Error(`La coleccion ${coleccion} no esta permitida. Colecciones permitidas ${colecciones}`);
    }
    return true;
}


export {
    esRolValidate,
    esEmailValidate,
    esUserValidate,
    coleccionesPermitidas
}