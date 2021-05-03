var express = require("express")
var bodyParser = require("body-parser")
var app = express()
var http = require("http").Server(app)
var io = require("socket.io")(http)
var mongoose = require("mongoose")

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

var Message = mongoose.model('Message', {
	name : String,
	message : String

})

var dbUrl = "mongodb+srv://admin:Soumy@7080@cluster0.gql7s.mongodb.net/Cluster0"

app.get('/messages', (req,res)=>{
	Message.find({}, (err,messages) =>{
		res.send(messages)	

	})
	
})

app.post('/messages', (req,res)=> {
	var message = new Message(req.body)
	message.save((err)=> {
		if(err)
			res.sendStatus(500)
			io.emit("message", req.body)
			res.sendStatus(200)

	})
	

})

io.on("connection", (socket)=> {
	console.log("User connected")

})

mongoose.connect(dbUrl, (err)=> {
	console.log("mongodb connection successful...")

})

var server = http.listen(3010, () => {
	console.log("Server is listening on port :", server.address().port )


})



