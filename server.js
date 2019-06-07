const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const Todo = require("./model/todo");
const { addValidation } = require("./model/validation");

app.use(express.json());
app.use(cors());
dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
	console.log("connected to db");
});

app.post("/add-todo", async (req, res) => {
	const { error } = addValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const todoExist = await Todo.findOne({ message: req.body.title });
	if (todoExist) return res.status(400).send("Todo is already in the list");
	const todo = new Todo({
		message: req.body.title
	});
	try {
		const savedTodo = await todo.save();
		res.send(savedTodo);
	} catch (err) {
		res.status(400).json("Unable to save todo.");
	}
});

app.get("/get-todos", (req, res) => {
	Todo.find({}, (err, todos) => {
		if (err) return res.status(400).send("error getting users");

		res.json(todos);
	});
});

app.delete("/del-todo/:id", (req, res) => {
	const { id } = req.params;
	Todo.deleteOne({ _id: id }, (err, result) => {
		console.log(err);
	});
	res.json("done");
});

app.put("/toggle-todo/:id", (req, res) => {
	const { id } = req.params;
	Todo.findOne({ _id: id }, (err, todo) => {
		todo.completed = !todo.completed;
		todo.save(err => {
			if (err) {
				return err;
			}
		});
	});
	res.json("done");
});

app.listen(process.env.PORT || 3000, () => console.log("Server is up."));
