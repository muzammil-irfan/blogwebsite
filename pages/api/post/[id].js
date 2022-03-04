import db from "../../../lib/db";
import Post from "../../../models/Post";

const handler = async (req, res) => {
  const { id } = req.query;
  const method = req.method;
  const findPostId = async() => {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send("Not Found");
    }
    //If get request then return post
    if (method === "GET") {
      db.disconnect();
      return res.status(200).json(post);
    }
  };
  
  const failedRequest = async(post) => {
    if (!post) {
      return res.status(403).send("Failure, Please try again");
    }
  };
  
  switch (method) {
    case "GET":
      db.connect();
      findPostId(); //It will disconnect
      break;
    case "PUT":
      //To update the post
      db.connect();
      findPostId();
      const updatedPost = await Post.findByIdAndUpdate(id, req.body);
      failedRequest(updatedPost); //It will check if fail
      res.status(200).json(updatedPost);
      break;
    case "DELETE":
      db.connect();
      findPostId();
      const postDeletion = await Post.findByIdAndDelete(id);
      failedRequest(postDeletion); //It will check if fail
      db.disconnect();
      res.status(200).send("Post deleted successfully");
      break;
    default:
      res.status(400).send("Page not found");
      break;
  }
};


export default handler;
