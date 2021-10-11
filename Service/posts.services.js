const { ObjectId } = require("mongodb");

const mongo = require("../Shared/mongo");

const service = {
  async findPosts(req, res) {
    try {
      const data = await mongo.posts
        .find({ userId: req.user.userId })
        .toArray();
      console.log(data);
      res.send(data);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
  async insertPosts(req, res) {
    try {
      console.log(req.body);
      const data = await mongo.posts.insertOne({
        ...req.body,
        userId: req.user.userId,
      });
      console.log(data);
      res.send({ ...req.body, userId: req.user.userId }); //_id: data.insertedId;
    } catch (err) {
      console.log(err);
      res.send({ error: "hello" });
      res.sendStatus(500);
    }
  },
  async updatePosts(req, res) {
    console.log(req.params.id);
    try {
      const data = await mongo.posts.findOne({
        _id: ObjectId(req.params.id),
        userId: req.body.userId,
      });
      if (!data) {
        return res.status(400).send({ Error: "Access denied for you" });
      }
      await mongo.posts.findOneAndUpdate(
        { _id: ObjectId(req.params.id) },
        { $set: { ...req.body } },
        { ReturnDocument: "after" }
      );
      console.log(data);
      res.send({ ...req.body, id: req.params.id });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
  async deletePosts(req, res) {
    console.log(req.params.id);
    try {
      const data = await mongo.posts.findOne({
        _id: ObjectId(req.params.id),
        userId: req.body.userId,
      });
      if (!data) {
        return res.status(400).send({ Error: "Access denied for you" });
      }
      await mongo.posts.deleteOne({
        _id: ObjectId(req.params.id),
      });
      res.send({});
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
};

module.exports = service;
