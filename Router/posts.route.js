const route = require("express").Router();

const service = require("../Service/posts.services");

route.get("/", service.findPosts);

route.post("/", service.insertPosts);

route.put("/:id", service.updatePosts);

route.delete("/:id", service.deletePosts);

module.exports = route;
