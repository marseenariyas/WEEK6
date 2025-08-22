const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const PORT=3000;

app.use(express.json());
app.use(cookieParser('your-super-secret-key'));
//res.clearCookie('sessionId', { path: '/', sameSite: 'Lax' });

app.post('/login',(req,res)=>{
    res.cookie('theme','dark',{
        maxAge:1000*60*24*7,
        httpOnly:false,
        sameSite:'Lax',
        path:'/',
    });

    res.cookie('sessionId','abc123',{
        signed:true,
        httpOnly:true,
        secure:true,
        sameSite:'Lax',
        maxAge:1000*60*60*2,
    });
    return res.json({message:'Logged in,cookies set!'});
});

app.get('/profile',(req,res)=>{
    const{theme}=req.cookies;
    const {sessionId}=req.signedCookies;
    return res.json({theme,sessionId});
});

app.post('/theme',(req,res)=>{
    const{theme}=req.body;
    res.cookie('theme',theme,{maxage:7*24*60*1000});
    res.json({ok:true});
});

app.post('/logout',(req,res)=>{
    res.clearCookie('sessionId');
    res.clearCookie('theme');
    res.json({message:'Logged out,cookies cleared'});

});


app.listen(PORT,()=>{
   console.log(`server running at http://localhost:${PORT}`);
});

