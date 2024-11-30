const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const express = require("express")


const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/elearning").then((data) => {
    console.log("mongodb connected succesfully")
})

const courseSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    faculty: {
        type: String
    },

})

const Course = mongoose.model("Course", courseSchema)

app.get('/api/courses', async (req, res) => {
    try {
        const courses = await Course.find({})
        res.json(courses)
    } catch (error) {
        console.error("cannot find courses")
    }
})

app.post('/api/create', async (req, res) => {
    try {
        const { title, description, faculty } = req.body
        const course = {
            title,
            description, faculty
        }

        const newRecord = await Course.create(course)

        res.json({ message: "course Created", newRecord })
    } catch (error) {
        console.error("cannot find courses")
    }
})
app.delete('/api/course/:id', async (req, res) => {
    try {
        const { id } = req.params


        const deletedRecord = await Course.findByIdAndDelete(id)

        res.json({ message: "course Deleted", deletedRecord })
    } catch (error) {
        console.error("cannot delete course")
    }
})
app.put('/api/course/:id', async (req, res) => {
    try {
        const updtedRecord = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });



        res.json({ message: "course Updated", updtedRecord })
    } catch (error) {
        console.error("cannot delete course")
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});