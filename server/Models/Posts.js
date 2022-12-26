import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {           //need reference
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {                    // likes are just a map of user ids value always true
      type: Map,                // map used as map efficient than array 
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;