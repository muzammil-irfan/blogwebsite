import bcrypt from "bcryptjs/dist/bcrypt";
import User from "../../../models/User";
import JWT from "jsonwebtoken";
import db from "../../../lib/db";
export default async function handler(req, res) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (req.method === "POST") {
    try{

        let { email, password } = req.body;
  
        await db.connect();
  
        const user = await User.findOne({ email });
  
        await db.disconnect();
        if (user === null) {
          res.status(401).send({ message: "Invalid email or password" });
        } else  {
            const compare = bcrypt.compareSync(password, user.password);
            
            if (user && compare) {
              const token = JWT.sign({ user }, JWT_SECRET, {
                expiresIn: "1d",
              });
              res.status(201).send({ token });
            } else {
              res.status(401).send({ message: "Invalid email or password" });
            }
        }
    } catch (err) {
        res.status(401).send({message: err});
    }
    
  } else {
    res.status(401).send("Page not found");
  }
}
