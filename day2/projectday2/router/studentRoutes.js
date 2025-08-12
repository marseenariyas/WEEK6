const express=require('express');
const { addStudentForm, getAllStudents, getStudentForm, getSingleStudent } = require('../controllers/studentControllers');
const router=express.Router();

router.get('/',getAllStudents)

router.get('/add',getStudentForm)

router.post('/add',addStudentForm);

router.get('/:id',getSingleStudent);

module.exports = router;