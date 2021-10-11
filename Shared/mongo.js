const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URL);

module.exports = {
  db: null,
  posts: null,
  users: null,

  async connect() {
    await client.connect();
    console.log(process.env.MONGODB_URL);
    this.db = client.db(process.env.MONGODB_NAME);
    console.log(process.env.MONGODB_NAME);

    this.posts = this.db.collection("posts");
    // console.log(this.posts)
    this.users = this.db.collection("users");
    // console.log(this.users)
  },
};
