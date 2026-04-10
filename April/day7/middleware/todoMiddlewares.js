

 const logger = (req,res,next) => {
    console.log('req log => ', req.method, req.url)
    next();
 }

//  const authenticator = {req,res,next} => {
//     console.log(req.headers.token)
//     return res.status(401).send("unauthorized")
//     next();
//  }


const getIncomingTodo = (req, res, next) => {
  const { title, description } = req.body;

      if (!title || !description) {
          res.json({message:"improper request"})
      }
      else{
          next();
      }
};




 module.exports = {logger,getIncomingTodo}