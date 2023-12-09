import express from 'express'
import mysql from 'mysql'
import cors from 'cors'


const app = express()


const db = mysql.createConnection({
    client: 'mysql',
    host: 'ardent-quarter-403122:us-central1:ccprojectlibrary',
    user: 'root',
    password: 'Satish@26',
    database: 'ccprojectlibrary'
})

app.get('/',(req,res)=>{  
    const q = "INSERT INTO student(`id`,`name`,`username`,`password`) VALUES ('1','shravani','shravani','admin')"
    const values = [req.body.id, req.body.name, req.body.username, req.body.password]
    db.query(q,(err,data)=>{
        if(err){
            res.send({error:err})
        }
        if(data){
            res.send({message: data})
        }
    })
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
app.get('/available-resocurces',(req,res)=>{
    const q="SELECT resources.res_id, resources.type_id, resource_type.type_name from resources, resource_type where resources.type_id = resource_type.type_id and resources.res_id NOT IN (select res_id from resources_occupied)"
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


app.post('/add-resources',(req,res)=>{
    let q=''
    let start_date=new Date().toISOString()
    start_date = start_date.substring(0, start_date.indexOf('T'))
    let end_date=new Date((new Date()).getDate()+7).toISOString()
    end_date = end_date.substring(0, end_date.indexOf('T'))
    let values=[]
    for(let i=0;i<req.body.resources.length;i++){
         values.push([req.body.resources[i].res_id, req.body.id, start_date, end_date])
    }
    // q=q+"INSERT INTO resources_occupied (res_id, id, start_date, end_date) VALUES ('"+req.body.resources[i].res_id+"', '"+req.body.id+"', '"+start_date.substring(0, start_date.indexOf('T'))+"', '"+end_date.substring(0, end_date.indexOf('T'))+"'); "
    q="INSERT INTO resources_occupied (res_id, id, start_date, end_date) VALUES ?; "
    db.query(q,[values],(err,data)=>{
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log("Connected to backend")
})