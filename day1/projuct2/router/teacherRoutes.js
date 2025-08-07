const express=require('express');
const { getAllTeachers, getTeacherForm, addTeachers, singleTeacher } = require('../controllers/teacherControllers');
const router=express.Router();

router.get('/',getAllTeachers);

router.get('/add', getTeacherForm);

router.post('/add',addTeachers);

router.get('/:id', singleTeacher);

module.exports = router;