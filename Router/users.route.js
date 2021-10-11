const route = require("express").Router();

const service = require("../Service/users.services");

route.post("/register", service.registerUser);

route.post("/login", service.loginUser);

route.get("/", service.findPosts);

route.post("/", service.insertPosts);

route.delete("/:id", service.deletePosts);

route.put("/:id", service.updatePosts);

module.exports = route;
