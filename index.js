const express = require("express");
const app = express();
const mongoose=require("mongoose");
const TodoTask = require("./models/TodoTask");

app.set("view engine", "ejs");

app.use(express.static(__dirname+'/public'));

app.use(express.urlencoded({ extended: true }));

mongoose.set("useFindAndModify",false);

mongoose.connect('mongodb://127.0.0.1:27017/client_db', { useNewUrlParser: true,useUnifiedTopology: true }, () => {
        console.log('Connected to db');
        app.listen(3000,() =>console.log("SERVER Up and Running"));
    });


//POST
app.post('/',async (req, res) => {
    const todoTask = new TodoTask({
    content: req.body.content
    });
    try {
    await todoTask.save();
    res.redirect("/");
    } catch (err) {
    res.redirect("/");
    }
});

//GET Posts
app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
    res.render("todo.ejs", { todoTasks: tasks });
    });
});

//UPDATE
app.route("/edit/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
    res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
    });
})
.post((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
});

//DELETE
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
});