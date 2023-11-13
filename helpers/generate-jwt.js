import jwt from "jsonwebtoken";


const generarjwt = (uid = '') => {

    return new Promise((resolve,reject)=>{

        const payload = {uid};

        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn : '10h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('Ha ocurrido un error');
            }else{
                resolve(token);
            }
        });
        
    })

}

export default generarjwt