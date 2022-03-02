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
                res.status(201).send(post);
                return;
            } else {
                db.disconnect();
                res.status(200).send({error:'Slug is already used'});
                return;
            }
        } else {
            res.status(400).send('Page not found');
        }
    } catch (error) {
        res.status(402).send({error})
    }
}

export default handler;