import jwt from 'jsonwebtoken';
import db from '../../../lib/db';
import User from '../../../models/User';

const handler = async(req,res)=>{
    if(req.method === 'POST'){
        try{
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
            const id = decode.user._id;
            db.connect();
            const user = await User.findById(id);
            db.disconnect();
            res.status(201).send({user});
        } catch (err) {
            res.status(401).send(err.message);
        }
    } else{
        res.status(401).send('Page not found');
    }
}
export default handler;