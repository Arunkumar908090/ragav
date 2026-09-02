const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadDirectory = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

// Make uploaded images accessible
app.use("/uploads", express.static(uploadDirectory));


// -------------------------
// Image Upload Configuration
// -------------------------

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },

    filename: function (req, file, cb) {

        const extension = path.extname(file.originalname);

        const filename =
            Date.now() + "-" +
            Math.round(Math.random() * 1000000) +
            extension;

        cb(null, filename);
    }

});

const upload = multer({
    storage: storage,

    fileFilter: function (req, file, cb) {

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp"
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"));
        }
    },

    limits: {
        fileSize: 5 * 1024 * 1024
    }
});


// -------------------------
// Health Check
// -------------------------

app.get("/health", (req, res) => {

    res.json({
        status: "UP",
        message: "Backend is running successfully"
    });

});


// -------------------------
// Login
// -------------------------

app.post("/api/login", (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {

        return res.status(400).json({
            success: false,
            message: "Username and password are required"
        });

    }

    // Demo credentials
    if (username === "admin" && password === "admin123") {

        return res.json({
            success: true,
            message: "Login successful",
            username: username
        });

    }

    res.status(401).json({
        success: false,
        message: "Invalid username or password"
    });

});


// -------------------------
// Profile Image Upload
// -------------------------

app.post(
    "/api/upload-profile-image",
    upload.single("image"),
    (req, res) => {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "No image uploaded"
            });

        }

        const imageUrl =
            `http://localhost:${PORT}/uploads/${req.file.filename}`;

        res.json({

            success: true,

            message: "Profile image uploaded successfully",

            imageUrl: imageUrl

        });

    }
);


// -------------------------
// Home Page Image Upload
// -------------------------

app.post(
    "/api/upload-home-image",
    upload.single("image"),
    (req, res) => {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "No image uploaded"
            });

        }

        const imageUrl =
            `http://localhost:${PORT}/uploads/${req.file.filename}`;

        res.json({

            success: true,

            message: "Home image uploaded successfully",

            imageUrl: imageUrl

        });

    }
);


// -------------------------
// Tasks
// -------------------------

let tasks = [
    {
        id: 1,
        title: "Learn Docker",
        completed: false
    },
    {
        id: 2,
        title: "Learn Kubernetes",
        completed: false
    }
];


// Get tasks
app.get("/api/tasks", (req, res) => {

    res.json(tasks);

});


// Get task
app.get("/api/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {

        return res.status(404).json({
            message: "Task not found"
        });

    }

    res.json(task);

});


// Create task
app.post("/api/tasks", (req, res) => {

    const { title } = req.body;

    if (!title || title.trim() === "") {

        return res.status(400).json({
            message: "Task title is required"
        });

    }

    const newTask = {

        id: tasks.length > 0
            ? tasks[tasks.length - 1].id + 1
            : 1,

        title: title.trim(),

        completed: false

    };

    tasks.push(newTask);

    res.status(201).json(newTask);

});


// Update task
app.put("/api/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {

        return res.status(404).json({
            message: "Task not found"
        });

    }

    task.completed = !task.completed;

    res.json(task);

});


// Delete task
app.delete("/api/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const taskExists =
        tasks.some(task => task.id === id);

    if (!taskExists) {

        return res.status(404).json({
            message: "Task not found"
        });

    }

    tasks = tasks.filter(task => task.id !== id);

    res.json({
        message: "Task deleted successfully"
    });

});


// -------------------------
// Start Server
// -------------------------

app.listen(PORT, () => {

    console.log(
        `Backend server running on port ${PORT}`
    );

});
