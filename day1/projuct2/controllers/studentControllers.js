const path=require('path')

const filepath=path.join(__dirname,'../data/students.json')

let students=[
    {id: 1, name: 'Rahul', grade: '10'},
    {id: 2, name: 'Meera', grade: '12'},
    {id: 3, name: 'Manu', grade: '11'},

];

const fecthAllStudents=()=>{
    return new Promise((res)=>{
       setTimeout(()=>{
        res(students)
   },1000);
    })  
}


const fetchSingleStudent=(id )=>{
   return new Promise((res)=>{
      setTimeout(()=>{
        const student=students.find(s=> s.id == id)
        res(student);
      },1000);
   });
}

const getStudentForm=(req,res)=>{
    //throw new Error('Error throw')
   res.render('students-form',{title:'Add students'});
}

const getAllStudents=async(req,res)=>{
    try{
      // const studentsList=await fecthAllStudents()
       const data=await fstat.readFile(filepath,'utf-8')
       const studentsList=JSON.parse(data)
       res.render('students',{title:'All Students',students:studentsList});
    }catch(err){
       res.status(500).send('Filed to fetch students');
    }
}

const addStudentForm=async(req,res)=>{
    const{name,grade}=req.body;

    const data=await fs.readFile(filepath,'utf-8')
    const students=JSON.parse(data)

    const newStudent={
        id: Date.now(),
        name,
        grade,
    };
    students.push(newStudent);
    await fs.writeFile(filepath,JSON.stringify(students,null,2))
    res.redirect('/students');
}

const getSingleStudent=async (req,res)=>{
    try{
    const student= await fetchSingleStudent(req.params.id)
    if(!student){
    //const err= new Error('student not found');
    const err=new NotFoundError('students not found')
    //err.statusCode=404
    //return next(err)
    throw(err)
    }
    res.render('student-details',{title:'student Details',student});
    }catch(err){
        next(err);
        //return res.status(500).send('some thing went wrong')

    }
}

module.exports={
    getAllStudents,
    getStudentForm,
    addStudentForm,
    getSingleStudent
}