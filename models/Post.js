
let mongoose = require('mongoose');

let postSchema = mongoose.Schema( {
    title: {type:String, required:true},
    body: {type:String, required:true},
    createdAt: {type:Date, default:Date.now},
    updatedAt: {type:Date}
});

let Post = mongoose.model('post', postSchema);
module.exports = Post;