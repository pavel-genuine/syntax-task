const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { client } = require('../Utilis/db.config')

const blogsCollection = client.db('coderAccess').collection('blogs')

const getAllBlogsController = async (req, res) => {
   const query = {}
   const cursor = blogsCollection.find(query)
   const allBlogs = await cursor.toArray()
   res?.send(allBlogs)
}

const addBlogController = async (req, res) => {
   const blog = req.body;
   const result = await blogsCollection.insertOne(blog);
   res.status(200).send({
      success: true,
      message: 'Successfull',
      data: blog
   })
   res.status(500).send({
      success: false,
      error: 'failed',
   })

}

const getSingleBlogController = async (req, res) => {
   const id = req?.params?.id;
   const query = { _id: ObjectId(id) };
   const blog = await blogsCollection.findOne(query)
   res.status(200).send({
      success: true,
      message: 'Successfull',
      data: blog
   })
   res.status(500).send({
      success: false,
      error: 'failed',
   })

}


const updateBlogController = async (req, res) => {
   const id = req?.params?.id;
   const blog = req?.body;

   const filter = { _id: ObjectId(id) };
   const updatedDoc = {
      $set: blog
   };
   const result = await blogsCollection?.updateOne(filter, updatedDoc);

   res.send(result);
}

const deleteBlogController = async (req, res) => {
   const id = req.params.id;
   const query = { _id: ObjectId(id) };
   const result = await blogsCollection.deleteOne(query);
   res.send(result);
}
module.exports = { getAllBlogsController, addBlogController, getSingleBlogController, updateBlogController, deleteBlogController }