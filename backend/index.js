import express from 'express'
import mysql from 'mysql'
import cors from 'cors'


const app = express()


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Satish@26',
    database: 'ccprojectlibrary'
})

app.get('/',(req,res)=>{
    res.json('hello')
})

app.use(express.json())
app.use(cors())

// app.get("/students",(req,res)=>{
//     const q = "SELECT * FROM students"
//     db.query(q,(err,data)=>{
//         if(err){
//             return res.json(err)
//         }
//         else{
//             return res.json(data)
//         }
//     })
// })

// app.post("/students",(req,res)=>{
//     console.log(req)
//     const q = "INSERT INTO students(`student_id`,`student_name`) VALUES (?)"
//     const values = [req.body.student_id, req.body.student_name]

//     db.query(q,[values], (err,data)=>{
//         if(err){
//             return res.json(err)
//         }
//         else{
//             return res.json('student added successfully')
//         }
//     })
// })

app.post('/register',(req,res)=>{
    const q = "INSERT INTO student(`id`,`name`,`username`,`password`) VALUES (?)"
    const values = [req.body.id, req.body.name, req.body.username, req.body.password]
    db.query(q,[values],(err,data)=>{
        if(err){
            res.send({error:err})
        }
        if(data){
            res.send({message: data})
        }
    })
})

app.post('/login',(req,res)=>{
    const q = "SELECT * FROM student WHERE username = '"+req.body.username+"' AND password = '"+req.body.password+"'"
    const values = [req.body.username, req.body.password]
    db.query(q,(err,data)=>{
        if(err){
            res.send({error:err})
        }
        if(data.length>0){
            res.send(data)
        }else{
            res.send({message: 'Wrong username/password'})
        }
    })
})

app.post('/resources',(req,res)=>{
    const q = "SELECT student.name,resources_occupied.res_id, resource_type.type_name, resources_occupied.start_date, resources_occupied.end_date from resources_occupied, student, resource_type, resources where student.id='"+req.body.id+"' and resources_occupied.id = student.id and resources_occupied.res_id=resources.res_id and resources.type_id=resource_type.type_id"
    db.query(q,(err,data)=>{
        if(err){
            res.send({error:err})
        }
        if(data){
            res.send(data)
        }else{
            res.send({message: 'Wrong username/password'})
        }
    })
})
app.get('/resources-count', (req,res)=>{
    const q = "SELECT resource_type.type_name,count(*) as count FROM resources, resource_type where resource_type.type_id = resources.type_id group by resources.type_id;"
    db.query(q, (err, data)=>{
        if(err){
            res.send({error:err})
        }
        if(data){
            res.send(data)
        }else{
            res.send({message:'error'})
        }
    })
})
app.get('/occupied-resources-count',(req, res)=>{
    const q = "SELECT resource_type.type_name,count(*) as count FROM resources_occupied, resource_type, resources where resource_type.type_id = resources.type_id and resources_occupied.res_id = resources.res_id group by resources.type_id;"
    db.query(q, (err, data)=>{
        if(err){
            res.send({error:err})
        }
        if(data){
            res.send(data)
        }else{
            res.send({message:'error'})
        }
    })
})

app.listen(8800, ()=>{
    console.log("Connected to backend")
})