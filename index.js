const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/playground", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch((err) => console.log("something went wrong: ", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now() },
  isPublished: Boolean,
});

// create a course model
const Course = mongoose.model("Course", courseSchema);
// a model represents the collection it creates
async function createCourse() {
  // make an instance of Course model("constructor function")
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save(); // this returns the saved document in the collection, this operation is async
  console.log(result);
}
// createCourse()

async function findCourse() {
//   const courses = await Course.find({author:/Mosh/})
  const courses = await Course.find({author:/^Mosh/})
//   const courses = await Course.find({author:/hamedani$/})
  console.log(courses);
}

findCourse();


