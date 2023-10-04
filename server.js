const express = require("express");
const app = express();
const articleRouter = require("./routes/article");
const mongoose = require("mongoose");
const Article = require("./modles/artcle");
const methodOverride= require('method-override')

app.set("view engine", "ejs");
mongoose.connect("mongodb://0.0.0.0:27017/blog");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))


app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});
app.use("/articles", articleRouter);

app.listen(5000);
