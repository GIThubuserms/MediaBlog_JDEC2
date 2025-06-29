export const asynchandler=(fn)=>{
return async(req,res,next)=>{
   try {
     await fn(req,res,next)
   } catch (error) {
    console.log(error);
   res.status(400).json({message:error.message}) 
  }

}
}


