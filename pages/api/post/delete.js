import db from "../../../lib/db";
import Post from "../../../models/Post";
import User from "../../../models/User";
import jwt from "jsonwebtoken";


const handler = async(req,res) => {
    if(req.method === 'POST') {
        const id = req.body.id;
        await db.connect();
        // Find the Note
        const post = await Post.findById(id);
        if(post === null){return res.status(404).send('Not Found')};
        
         // Allow deletion only if user owns this Note
         const token = req.body.token;
            const JWT_SECRET = process.env.JWT_SECRET;
            const decode = jwt.verify(token,JWT_SECRET,((err,decode)=>{
                if(err){    
                    res.status(401).send({err:err.message});
                    return;
                } else{
                    return decode;    
                }
            }));
            const userId = decode.user._id;
            await db.connect();
            const user = await User.findById(userId);
            if(!user){return res.status(401).send('Unauthorized')}
            const postDeletion = await Post.findByIdAndDelete(id);
            res.status(200).send('Post deleted successfully')
    }else {
        res.status(400).send('Page not found');
    }
}

export default handler;