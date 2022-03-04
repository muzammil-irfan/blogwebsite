import db from "../../../lib/db";
import Post from "../../../models/Post";

const handler = async (req,res) => {
    if(req.method === 'GET'){
        db.connect();
        const id = req.body;
        if(!id){
            const post = await Post.find({});
            db.disconnect();
            return res.status(200).json(post);
        }
            const post = await Post.findById(id);
            //Nothing will happen if not found. Pending
            return res.status(404).json(post);
        
    } else{
        res.status(400).send('Page not found');
    }
}

export default handler;