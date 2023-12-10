import express from 'express'
import mysql from 'mysql'
import cors from 'cors'


const app = express()



const connectionConfig = {
    client: 'mysql',
    connection : {
        user: 'root',
        password: 'Satish@26',
        database: 'ccprojectlibrary',
        
    }
    // Alternatively, you can use the following line instead of socketPath for local development
    // host: 'localhost',
  };

  if(process.env.NODE_ENV == 'production'){
    connectionConfig.connection.socketPath= process.env.GAE_DB_SOCKET
  }else{
    connectionConfig.connection.host = '127.0.0.1'
  }

  


// const db = mysql.createConnection({
//     host: '34.170.114.188',
//     user: 'root',
//     password: 'Satish@26',
//     database: 'ccprojectlibrary',
// })


//const mysql = require('promise-mysql');

// createUnixSocketPool initializes a Unix socket connection pool for
// a Cloud SQL instance of MySQL.
const createUnixSocketPool = async config => {
  // Note: Saving credentials in environment variables is convenient, but not
  // secure - consider a more secure solution such as
  // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
  // keep secrets safe.
  console.log({
    user: 'root', // e.g. 'my-db-user'
    password: 'Satish@26', // e.g. 'my-db-password'
    database: 'ccprojectlibrary', // e.g. 'my-database'
    socketPath: process.env.GAE_DB_SOCKET, // e.g. '/cloudsql/project:region:instance'
    
  })
  return mysql.createPool({
    connectionLimit: 10,
    user: 'root', // e.g. 'my-db-user'
    password: 'Satish@26', // e.g. 'my-db-password'
    database: 'ccprojectlibrary', // e.g. 'my-database'
    socketPath: process.env.GAE_DB_SOCKET, // e.g. '/cloudsql/project:region:instance'
    // host: '34.170.114.188',
  });
};

app.get('/', async (req,res)=>{  

    const result = 'hi'
    const pool = await createUnixSocketPool()
    pool.query('select * from student',  function (error, results, fields) {
        res.send(results)
    });
   // res.send(pool)
    //console.log(pool)
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

app.post('/register',async (req,res)=>{
    const q = "INSERT INTO student(`id`,`name`,`username`,`password`) VALUES (?,?,?,?)"
    const values = [req.body.id, req.body.name, req.body.username, req.body.password]
    const pool = await createUnixSocketPool()
    pool.query(q,values,  function (error, results, fields) {
        console.log(results, error, )
        res.send(results)
    });
    
})

app.post('/login',async (req,res)=>{
    const q = "SELECT * FROM student WHERE username = '"+req.body.username+"' AND password = '"+req.body.password+"'"
    const values = [req.body.username, req.body.password]

    const pool = await createUnixSocketPool()
    pool.query(q,  function (error, results, fields) {
        
        res.send(results)
    });
   
})

app.post('/resources',async (req,res)=>{
    const q = "SELECT student.name,resources_occupied.res_id, resource_type.type_name, resources_occupied.start_date, resources_occupied.end_date from resources_occupied, student, resource_type, resources where student.id='"+req.body.id+"' and resources_occupied.id = student.id and resources_occupied.res_id=resources.res_id and resources.type_id=resource_type.type_id"
   
    const pool = await createUnixSocketPool()
    pool.query(q,  function (error, results, fields) {
        console.log(results, error, )
        res.send(results)
    });
})
app.get('/available-resocurces',async (req,res)=>{
    const q="SELECT resources.res_id, resources.type_id, resource_type.type_name from resources, resource_type where resources.type_id = resource_type.type_id and resources.res_id NOT IN (select res_id from resources_occupied)"
    const pool = await createUnixSocketPool()
    pool.query(q,  function (error, results, fields) {
        console.log(results, error, )
        res.send(results)
    });
})


app.post('/add-resources',async (req,res)=>{
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
    const pool = await createUnixSocketPool()
    pool.query(q,values,  function (error, results, fields) {
        console.log(results, error, )
        res.send(results)
    });
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log("Connected to backend")
})