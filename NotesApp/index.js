const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir("./files", function (err, files) {
    if (err) {
      console.error("Error reading files:", err);
      res.status(500).send("Server error");
      return;
    }
    res.render("index", { files: files });
    console.log(files);
  });
});

app.get("/file/:filename", (req, res) => {
  const filepath = path.join(__dirname, "files", req.params.filename);
  fs.readFile(filepath, "utf-8", (err, fileData) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Server error");
      return;
    }
    res.render("show", { filename: req.params.filename, fileData: fileData });
  });
});

app.get("/edit/:filename", (req, res) => {
  res.render("edit", { filename: req.params.filename });
});

app.post("/edit", (req, res) => {
  const previousPath = path.join(__dirname, "files", req.body.previous);
  const newPath = path.join(__dirname, "files", req.body.new);

  fs.rename(previousPath, newPath, (err) => {
    if (err) {
      console.error("Error renaming file:", err);
      res.status(500).send("Server error");
      return;
    }
    console.log(
      `File ${req.body.previous} renamed to ${req.body.new} successfully!`
    );
    res.redirect("/");
  });
});

app.post("/create", (req, res) => {
  const title = req.body.title.split(" ").join("");
  const details = req.body.details;

  fs.writeFile(`./files/${title}.txt`, details, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      res.status(500).send("Server error");
      return;
    }
    console.log(req.body);
    res.redirect("/");
  });
});

app.delete("/delete/:filename", (req, res) => {
  const filepath = path.join(__dirname, "files", req.params.filename);
  fs.unlink(filepath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      res.status(500).send("Server error");
      return;
    }
    console.log(`File ${req.params.filename} deleted successfully!`);
    res.status(200).send("File deleted");
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
