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
  const courses = await Course.find({ author: /^Mosh/ });
  //   const courses = await Course.find({author:/hamedani$/})
  console.log(courses);
}

// findCourse();

async function updateCourse(id) {
  try {
    // update using find method

    // const course = await Course.findOne({_id: id});
    // course.author = "Kyle Cook";
    // course.isPublished = true;
    // const result = await course.save()
    // console.log(result)
    //----------------------------------
    // update using update method

    const course = await Course.findOneAndUpdate(
      { _id: id },
      {
        $set: { author: "Mosh" },
      },
      { new: true }
    );
    console.log(course);
  } catch (err) {
    console.log(err);
  }
}

// updateCourse("64f0828a514ed4bd09a3e027");


async function deleteCourse(id){

    try {
        // const course = await Course.deleteOne({_id:id})
        // console.log(course)// return an acknowledge object

        // delete a document and get the deleted document 
        const course = await Course.findOneAndRemove({_id:id})
        // returns null if there is no document matching 
        console.log(course)
    }
    catch (err) {
        console.log(err)
    }
}
deleteCourse("64f08292f68ddf968a887c08");
