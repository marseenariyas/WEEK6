const express=require('express');
const router=express.Router();

let students =[
    {id:1, name:'hiba', grade:'10'},
    {id:2, name:'meharin', grade:'10'},
    {id:3, name:'shahanas', grade:'10'}
];

app.get('/students',(req,res)=>{
    res.render('students',students)
})