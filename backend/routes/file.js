const router=require('express').Router();
const multer=require('multer');

const upload=multer({dest:'uploads/'});

router.route('/upload').post(upload.single('hell'),(req,res)=>{
	res.json('ok');
});

router.route('/download').post();

module.exports=router;