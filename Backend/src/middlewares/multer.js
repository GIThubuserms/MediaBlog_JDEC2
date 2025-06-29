import multer from 'multer'

const storage=multer.diskStorage({
    destination:(err,file,cb)=>{
      return  cb(null,'./public/temp')
    },
    filename:(err,file,cb)=>{
      return cb(null,file.originalname)
    }
})
export const upload=multer({
  storage:storage
})
