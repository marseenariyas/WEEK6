const express = require('express')
const path = require('path')
const router = express.Router();
const app = express();
const PORT = 5000;

process.on('uncaughtException',(err)=>{
    console.log('uncaught exception',err.message)
    process.exit(1)
})

const studentRoutes = require('./router/studentRoutes')
const teacherRoutes = require('./router/teacherRoutes');
const { error } = require('console');
const { NotFoundError, BadRequestError } = require('./utils/errors');
const { title } = require('process');
const { errorHandlingMiddileware } = require('./middilewares/errorHandling');

// const{welcome}=import('./controllers/moduleType.mjs').then(({welcome}) => {
//    app.get('/welcome',welcome)
// });



app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home', { title: 'Welcome to school portal' });
});

// (async()=>{
//     const{welcome}=await import('./controllers/moduleType.mjs')
//     app.get('/welcome',welcome)
// })();

// app.use((err,req,res,next)=>{
//     console.log('Error:',err.message)
//     const statusCode=err.statusCode||500;
//     const msg=err.message||'something broke'
//     res.status(statusCode).send(msg)
// })

app.use(errorHandlingMiddileware)
//     const statusCode = err.statusCode || 500;
//     const msg = err.message || 'Something broke'
//     res.status(statusCode).render('error', {
//         title: 'Error',
//         status,
//         message
//     })

// })

app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);

app.listen(PORT, () => {
    console.log(`sever running at http://localhost:${PORT}`);
});

module.exports = router;
