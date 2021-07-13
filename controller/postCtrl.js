const Posts = require("../models/postModel")
const Comments = require("../models/commentModel")
const Users = require("../models/userModel")

class APIfeatures {
    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this
    }
}


const postCtrl = {
    createPost: async (req, res) => {
        try {

            const { content, images } = req.body

            if (images.length === 0)
                return res.status(400).json({ msg: "Please add your photo" })

            const newPost = new Posts({
                content, images, user: req.user._id
            })

            await newPost.save()

            res.json({
                msg: "Create Post!",
                newPost:{
                    ...newPost._doc,
                    user:req.user
                }
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    getPosts: async (req, res) => {
        try {
            const features = new APIfeatures(
                Posts.find({
                    user: [...req.user.following, req.user._id]
                }), req.query
            ).paginating()

            const posts = await features.query.sort("-createdAt")
                .populate("user likes", "avatar username fullname followers")
                .populate({
                    path: "comments ",
                    populate: {
                        path: "user likes",
                        select: "-password"
                    }
                })

            res.json({
                msg: "Success!",
                result: posts.length,
                posts
            })


        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    updatePost: async (req, res) => {
        try {

            const { content, images } = req.body

            const post = await Posts.findOneAndUpdate({ _id: req.params.id }, {
                content, images
            }).populate("user likes", "avatar username fullname")


            res.json({
                msg: "Update Success",
                newPost: {
                    ...post._doc,
                    content, images
                }
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    likePost: async (req, res) => {
        try {
            const post = await Posts.find({ _id: req.params.id, likes: req.user._id })
            if (post.length > 0) return res.status(400).json({ msg: "You liked this post" })

            const like = await Posts.findOneAndUpdate(({ _id: req.params.id }), {
                $push: { likes: req.user._id }
            }, { new: true })

            if (!like) return res.status(400).json({ msg: "This post does not exist" })
            res.json({ msg: "Liked Post!" })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    unlikePost: async (req, res) => {
        try {

            const like = await Posts.findOneAndUpdate(({ _id: req.params.id }), {
                $pull: { likes: req.user._id }
            }, { new: true })

            if (!like) return res.status(400).json({ msg: "This post does not exist" })

            res.json({ msg: "unLiked Post!" })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    getUserPosts: async (req, res) => {
        try {

            const features = new APIfeatures(
                Posts.find({ user: req.params.id }), req.query
            ).paginating()

            const posts = await features.query.sort("-createdAt")

            res.json({
                posts,
                result: posts.length
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message })

        }
    },

    getPost: async (req, res) => {
        try {
            const post = await Posts.findById(req.params.id)
                .populate("user likes", "avatar username fullname followers")
                .populate({
                    path: "comments",
                    populate: {
                        path: "user likes",
                        select: "-password"
                    }
                })

            if (!post) return res.status(400).json({ msg: "This post does not exist" })

            res.json({ post })

        } catch (error) {
            return res.status(500).json({ msg: error.message })

        }
    },

    getPostDiscover: async (req, res) => {
        try {

            const newArr = [...req.user.following, req.user._id]

            const num = req.query.num || 9

            const posts = await Posts.aggregate([
                { $match: { user: { $nin: newArr } } },
                { $sample: { size: Number(num) } },
            ])

            res.json({
                msg: "Success!",
                result: posts.length,
                posts
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message })

        }
    },

    deletePost: async (req, res) => {
        try {

            const post = await Posts.findOneAndDelete({ _id: req.params.id, user: req.user._id })
            await Comments.deleteMany({ id: { $in: post.comments } })

            res.json({
                msg:"Delete Success!",
                newPost: {
                    ...post,
                    user: req.user 
                }
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message })

        }
    },

    savePost: async (req, res) => {
        try {

            const user = await Users.find({ _id: req.user._id, saved: req.params.id })
            if (user.length > 0) return res.status(400).json({ msg: "You saved this post" })

            const save = await Users.findOneAndUpdate(({ _id: req.user._id }), {
                $push: { saved: req.params.id }
            }, { new: true })

            if (!save) return res.status(400).json({ msg: "This user does not exist" })

            res.json({ msg: "Saved Post!" })

        } catch (error) {
            return res.status(500).json({ msg: error.message })

        }
    },

    unSavePost: async (req, res) => {
        try {

           

            const save = await Users.findOneAndUpdate(({ _id: req.user._id }), {
                $pull: { saved: req.params.id }
            }, { new: true })

            if (!save) return res.status(400).json({ msg: "This user does not exist" })

            res.json({ msg: "UnSaved Post!" })

        } catch (error) {
            return res.status(500).json({ msg: error.message })

        }
    },

    getSavePosts: async (req, res) => {
        try {

            const features = new APIfeatures(Posts.find({
                _id : {$in: req.user.saved}
            }), req.query).paginating()

            const savePosts = await features.query.sort("-createdAt")

            res.json({
                savePosts,
                result: savePosts.length
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message })

        }
    },
}


module.exports = postCtrl