import db from "../../../lib/db";
import Post from "../../../models/Post";

const handler = async (req,res) => {
    if(req.method === 'GET'){
        db.connect();
        const post = await Post.find({});
        db.disconnect();
        res.status(200).json(post);
    } else{
        res.status(400).send('Page not found');
    }
}

export default handler;