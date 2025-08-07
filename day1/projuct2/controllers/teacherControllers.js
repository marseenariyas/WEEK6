let teachers=[
    {id: 1, name: 'Rohini', subject: 'Hindi'},
    {id: 2, name: 'Sujaya', subject: 'Maths'}
];

const fetchAllteachers=()=>{
    return new Promise((res)=>{
       setTimeout(()=>{
         res(teachers)
       },1000);
    });
}

const fetchSingleTeacher=((id)=>{
     return new Promise((res)=>{
        setTimeout(()=>{
            const teacher=teachers.find(t=> t.id == id)
            res(teacher);
        },1000);
     }) 
})

const getAllTeachers= async(req,res)=>{
    try{
        const teachersList=await fetchAllteachers()
    res.render('teachers',{title:'All teachers',teachers:teachersList});
    }catch(err){
        res.status(500).send('failed to fetch teachers');
    }
};

const getTeacherForm=(req,res)=>{
    res.render('teachers-form',{title:'Add teachers'});
};

const addTeachers=(req,res)=>{
    const{name,subject}=req.body;
    const newTeachers={
        id:teachers.length=1,
        name,
        subject,
    };
    teachers.push(newTeachers);
    res.redirect('/teachers');
}

const singleTeacher=async(req,res)=>{
    try{
        const teacher=await fetchAllteachers(req.params.id)
    if(!teacher)return res.send('tearcher not found');
        res.render('teachers-details',{title:'teachers Details'})
    }catch(err){
        return res.static(404).send('teachers not found')
    }
}

module.exports={
    getAllTeachers,
    getTeacherForm,
    addTeachers,
    singleTeacher

};

