const express=require('express')
const path=require('path')
const app=express();
const PORT=5000;
const studentRoutes=require('./routes/studentRoutes');

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    res.render('home')
});

app.listen(PORT,()=> console.log(`server running at http://localhost:${PORT}`));