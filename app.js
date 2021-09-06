const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants');
const express=require('express');
const app =express();
const port=process.env.PORT || 5000
app.use(express.json());
const multer=require('multer');
const fs=require('fs');
const upload=multer({
    dest:'images',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpeg|png)$/)){
            return cb(new Error('Please upload a jpeg or png file less than 1 mb'))
        }
        cb(undefined, true)
    }
})


app.put("/upload", upload.single('upload'),async(req,res)=>{
    res.send('Image uploaded successfull');
});

app.delete("/deletefile", async(req,res)=>{
    try
    {
    fs.unlinkSync('./images')
    res.status('200').send('Image deleted');
    }
    catch(err){
        console.error(err);

    }
});

app.post("/renamefile", async(req,res)=>{
    try{
        fs.renameSync('image.png','newimage.png')
        res.status('200').send('Image renamed');
    }
    catch(err){
        console.error(err);
    }

});


app.listen(port,()=>{
    console.log('Server is up and running on port ' +port);
});