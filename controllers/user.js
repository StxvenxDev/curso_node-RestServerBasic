import {request, response} from 'express';

const userGet = (req,res) => {
    const query = req.query;
    res.json({
        msg: "get api - controllers",
        query  
    });
};

const userPost = (req,res)=>{
    const body = req.body;
    res.json({
        msg : "post api - controllers",
        body
    });
};

const userPut = (req,res)=>{
    const id = req.params.id
    res.json({
        msg : "put api - controllers",
        id
    });
};

const userPatch = (req,res)=>{
    res.json({
        msg : "patch api - controllers"
    });
};

const userDelete = (req,res)=>{
    res.json({
        msg : "delete api - controllers"
    });
};

export {
    userDelete,
    userGet,
    userPatch,
    userPost,
    userPut
}