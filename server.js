const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");

const app=express();

//body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
		  extended: true
		})); 

//DB config
const db=require('./config/key.js').mongoURI;

//connect to mongo
mongoose
.connect(db, { useNewUrlParser: true })
.then(()=>console.log('mongodb is connected'))
.catch(err=>console.log(err));

/*call to routers.js*/
const tbSchema=require("./route/routers");
app.use('/', tbSchema);
/*end: call to routers.js*/
const port=process.env.PORT||5000;


app.listen(port, ()=>console.log(`server is started on port ${port}`));
