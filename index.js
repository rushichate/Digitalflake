const express = require("express")
const app = express()
const cors = require("cors")
const { connection } = require("./database")
const { adminRouter } = require("./backend/routes/admin.route")
const { itemRouter } = require("./backend/routes/items.route")
require("dotenv").config()


app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json("Welcome to the Digitalflake")
})

app.use("/admin",adminRouter)
app.use("/items",itemRouter)

app.listen(process.env.port,async()=>{
    try{
      await connection
      console.log("Server is connected to database and running fine")
    }catch(error){
      console.log(error)
    }
})