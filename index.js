const {Telegraf} = require('telegraf')
const express = require('express')
const mongoose = require("mongoose")
const respond = require('./respond')

//express init
const app = express()

// DB Connections
// mongodb+srv://rasedul20:rasedul20@telegrambot.y4jtfri.mongodb.net/telegramDB
mongoose.connect(process.env.DB,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify: false})
.then(()=>console.log("DB is connected!"))
.catch((e)=>console.log(e))

//bot init
const bot = new Telegraf(process.env.TOKEN)

bot.start(ctx=>{
    respond.find()
    .then((data)=>{
        ctx.reply(data[0].msg)
    })
    .catch((e)=>console.log(e))
})

bot.command('test',ctx=>{
    ctx.reply("This is test command")
})

app.use(bot.webhookCallback('/'))

app.get("/",async (req,res)=>{
    try {
        const data = await respond.find()
        res.json({data})    
    } catch (error) {
        res.json({"error":error})
    }
})

app.get("/health",(req,res)=>{
    res.sendStatus(200).json({
        "Status": "Site is running"
    })
})

const port = process.env.PORT || 8181
app.listen(port , ()=>{
    console.log("The site is running on port "+ port)
})