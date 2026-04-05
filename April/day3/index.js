const express = require("express")
const app = express();
const port = 3000;


app.get("/home", (req,res)=> {
        res.json("This is Home page")
});

app.get("/about", (req,res) => {
        res.json({message:"This is about page"})
})

//app.post("")


app.listen(port, ()=> {
        console.log(`app started with ${port} port number`)
})

