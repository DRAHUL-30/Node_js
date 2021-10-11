const { ObjectId } = require("mongodb");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongo = require("../Shared/mongo");

const { registerSchema, loginSchema } = require("../Shared/schema");
const { validate } = require("joi");

const service = {
  async registerUser(req, res) {
    try {
      const { value, error } = await registerSchema.validate(req.body);
      // console.log(validate.error.details);
      if (error)
        return res.status(400).send({ Error: error.details[0].message });

      const newUser = await mongo.users.findOne({
        username: req.body.username,
      });
      if (newUser) {
        return res.status(400).send("User already exists");
      }
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      //else
      await mongo.users.insertOne(req.body);
      console.log("User registered");
      res.send(newUser);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
  async loginUser(req, res) {
    try {
      const { value, error } = await loginSchema.validate(req.body);
      // console.log(validate.error.details);
      if (error)
        return res.status(400).send({ Error: error.details[0].message });
      const user = await mongo.users.findOne({ username: req.body.username });
      if (!user) {
        return res.status(403).send("User doesn't exists");
      }
      console.log("in");
      const isValid = await bcrypt.compare(req.body.password, user.password);
      if (!isValid) {
        return res
          .status(403)
          .send({ Error: "username or password is invalid" });
      }
      const AuthToken = jwt.sign({ userId: user._id }, "rahul@1");
      console.log(AuthToken);
      res.send(AuthToken);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },

  async findPosts(req, res) {
    try {
      const data = await mongo.users.find().toArray();
      console.log(data);
      res.send(data);
    } catch {
      res.sendStatus(500);
    }
  },
  async insertPosts(req, res) {
    try {
      const { insertedId: _id } = await mongo.users.insertOne({ ...req.body });
      res.send({ ...req.body, _id });
    } catch {
      res.sendStatus(500);
    }
  },
  async deletePosts(req, res) {
    try {
      const data = await mongo.users.deleteOne({
        _id: ObjectId(req.params.id),
      });
      console.log(data);
      res.send({});
    } catch {
      res.sendStatus(500);
    }
  },
  async updatePosts(req, res) {
    try {
      console.log(req.params.id);
      const data = await mongo.users.findOneAndUpdate(
        { _id: ObjectId(req.params.id) },
        { $set: { ...req.body } },
        { ReturnDocument: "after" }
      );
      console.log(data);
      res.send(data);
    } catch {
      res.sendStatus(500);
    }
  },
};

module.exports = service;
