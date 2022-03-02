import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    coverImageUrl:{
        type:String,
        required:true,
    },
    coverImageAlt:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    draft:{
        type:Boolean,
        required:true,
    }
},{
    timestamps:true
});

export default mongoose.models.Post || mongoose.model('Post',PostSchema);