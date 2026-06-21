const express=require('express');
const app=express();
const path=require('path');
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.get('/',async(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});
let list;
app.post('/options',async(req,res)=>{
    try{
        let response=Object.values(req.body);
        list=response;
        console.log(list,response);
        res.status(200).json({
            success: true,
            data: list
        });
    }catch(err){
        res.status(500).json({ error:'Failed to fetch the data' });
    }
});
app.get('/list',async(req,res)=>{
    res.send(list);
})
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{console.log(`Server running in Port: ${PORT}`)});