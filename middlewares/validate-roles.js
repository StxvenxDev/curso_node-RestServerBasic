

const adminRole = (req,res,next) => {

    if(!req.user){
        return res.status(500).json({msg : 'El token no ha sido verificado'});
    }

    const {role,name} = req.user;

    if(role != 'ADMIN_ROLE'){
        return res.status(401).json({msg:`Lo sentimos ${name} Solo el administrador puede hacer esta accion`});
    }

    next();
}

const tieneRole = (...roles) => {

    return (req,res,next) =>{

        if(!req.user){
            return res.status(500).json({msg : 'El token no ha sido verificado'});
        }

        if(!roles.includes(req.user.role)){
            return res.status(400).json({msg:'Necesitas un rol valido para poder realizar esto'});
        }

        next();
    }

}

export {
    adminRole,
    tieneRole
}
