
const fs = require('fs').promises;
const path = require('path')

const filepath = path.join(__dirname, '../data/students.json')

const {NotFoundError}=require('../utils/errors');


// let students = [
//     { id: 1, name: 'Rahul', grade: '10' },
//     { id: 2, name: 'Meera', grade: '12' },
//     { id: 3, name: 'Manu', grade: '11' },

// ];

// const fecthAllStudents = () => {
//     return new Promise((res) => {
//         setTimeout(() => {
//             res(students)
//         }, 1000);
//     })
// }


// const fetchSingleStudent = (id) => {
//     return new Promise((res) => {
//         setTimeout(() => {
//             const student = students.find(s => s.id == id)
//             res(student);
//         }, 1000);
//     });
// }

const fetchSingleStudent=async(id)=>{
    const data=await fs.readFile(filepath,'utf-8');
    const students=JSON.parse(data);
    return students.find(s => s.id == id);
}

const getStudentForm = (req, res) => {
    //throw new Error('Error throw')
    res.render('student-form', { title: 'Add students' });
}

const getAllStudents = async (req, res, next) => {
    //console.log('students')
    try {
        // const studentsList=await fecthAllStudents()
        const data = await fs.readFile(filepath, 'utf-8')
        const studentsList = JSON.parse(data)
        res.render('students', { title: 'All Students', students: studentsList });
    } catch (err) {
        // res.status(500).send('Failed to fetch students');
        next(err);
    }
}


const addStudentForm = async (req, res, next) => {
    try {
        const { name, grade } = req.body;
        const data = await fs.readFile(filepath, 'utf-8');
        const students = JSON.parse(data);

        const newStudent = {
            id: Date.now(),
            name,
            grade
        };

        students.push(newStudent);
        await fs.writeFile(filepath, JSON.stringify(students, null, 2));

        res.redirect('/students');
    } catch (err) {
        console.error("Failed to add student:", err);
        //res.status(500).send("Error adding student");
        next(err)
    }
};


const getSingleStudent = async (req, res, next) => {
    try {

        const student = await fetchSingleStudent(req.params.id)
        if (!student) {
            //const err= new Error('student not found');
            const err = new NotFoundError('students not found')
            //err.statusCode=404
            //return next(err)
            throw (err)
        }
        res.render('student-details', { title: 'student Details', student });
    } catch (err) {
        next(err);
        //return res.status(500).send('some thing went wrong')

    }
}

module.exports = {
    getAllStudents,
    getStudentForm,
    addStudentForm,
    getSingleStudent
}