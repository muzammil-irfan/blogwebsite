import db from "../../../lib/db";
import Post from "../../../models/Post";

const handler = async(req,res)=>{
    try{

        if(req.method === 'POST') {
            await db.connect();
            const slug = req.body.slug;
            const slugCheck = await Post.findOne({slug});
            if(slugCheck === null ) {
                const post = await Post.create(req.body);
                db.disconnect();
                return res.status(201).json(post);
            } else {
                db.disconnect();
                return res.status(200).json({error:'Slug is already used'});
            }
        } else {
            res.status(400).send('Page not found');
        }
    } catch (error) {
        res.status(402).json({error})
    }
}

export default handler;