# Mongoose

## schema

In Mongoose, a schema is a fundamental building block that defines the structure, data types, and constraints for documents (data entries) in a MongoDB collection. A schema acts as a blueprint for how the data should be stored in the database. It helps enforce a consistent structure for documents within a collection, ensuring that the data follows a predefined format.

Here's a breakdown of what a schema does and its key components:

1. Defining Fields and Data Types: A schema defines the fields (also known as properties or attributes) that a document will have. Each field is associated with a specific data type, such as String, Number, Date, Boolean, etc. This helps MongoDB understand the structure of the data being stored.
2. Validation and Constraints: Schemas allow you to set validation rules and constraints on the data. For example, you can specify that a field must be unique, required, have a minimum or maximum length, or meet other criteria. This ensures data integrity and consistency.
3. Default Values: You can provide default values for fields. If a document is created without a value for a field, the default value will be used.
4. Methods and Virtuals: Schemas can define methods that can be called on documents (instances of a model) and virtuals, which are additional fields computed from existing data.

Here's a basic example of how you might define a schema using Mongoose:

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  birthdate: Date,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
```

In this example, userSchema defines the structure of a User document in the MongoDB collection. It has fields for firstName, lastName, email, and birthdate, each with its own data type and constraints.

After defining the schema, you create a Mongoose model using mongoose.model() and pass in the schema definition. This model represents the collection and provides methods for interacting with it. You can then create, read, update, and delete documents in the collection using the model's methods.

Schemas are a powerful feature of Mongoose that help you organize your data, ensure consistency, and provide an abstraction layer for working with MongoDB collections. They play a central role in the object-document mapping (ODM) capabilities that Mongoose provides.

## model

In Mongoose, a model is a constructor function that represents a collection in a MongoDB database. It allows you to interact with a specific collection, perform CRUD (Create, Read, Update, Delete) operations, and define custom methods and queries. Models are built upon the schema definition and provide an abstraction layer for working with MongoDB collections.

Here are the key features and functions of a Mongoose model:

1. Creating a Model: You create a model using the mongoose.model() function, passing in the name of the model and the schema it should use. This creates a constructor function that you can use to instantiate documents.

2. Document Instances: When you create a model, you're essentially creating a blueprint for documents in a MongoDB collection. You can create new document instances using the model constructor, and each instance will correspond to a single document in the collection.

3. CRUD Operations: Models provide built-in methods for performing CRUD operations on the collection associated with the model. For example, you can use methods like create(), find(), findOne(), updateOne(), and deleteOne() to interact with the data in the collection.

4. Custom Methods: You can define custom instance methods and static methods on a model. Instance methods are methods that can be called on document instances, while static methods are called on the model itself. This allows you to encapsulate business logic and create reusable code.

5. Pre and Post Hooks: Mongoose models support hooks that allow you to execute functions before or after certain events, such as saving a document or updating it.

Here's a simple example of creating a model in Mongoose:

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  birthdate: Date,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
```

In this example, the User model is created based on the userSchema. This model can then be used to interact with a MongoDB collection named "users." You can use methods like User.create(), User.find(), User.findOne(), and so on, to manipulate data in the "users" collection.

Models are a core concept in Mongoose, providing an organized and consistent way to work with data in MongoDB collections. They encapsulate the data schema, validation, and various database interactions, making it easier to manage and maintain your application's data layer.

### model parameter

```js
const User = mongoose.model("User", userSchema);
```

1. 'User': The first parameter is a string that represents the name of the model. This name is used to associate the model with a specific MongoDB collection. In this case, the model is named 'User', so it will correspond to the 'users' collection in the database. The name you choose here will also affect how you interact with the model's methods later in your code.

2. 'userSchema': The second parameter is the schema that you want to use for this model. It's the blueprint that defines the structure, data types, validation rules, and more for the documents that will be stored in the collection. When you create a new document using this model, it will adhere to the schema definition you've provided.

By calling mongoose.model('User', userSchema), you're creating a constructor function called User that you can use to instantiate documents for the 'users' collection. This constructor function has access to methods like create(), find(), findOne(), and any custom methods you define. You can think of the User model as a way to interact with the 'users' collection in a more organized and structured manner.

### model naming

The difference in naming convention between the singular name passed to mongoose.model() and the plural name of the resulting collection is due to a default behavior of Mongoose. This naming convention is often a source of confusion for newcomers, but there's a reason behind it.

When you define a model using mongoose.model(), you provide a singular name for the model, like 'User'. However, Mongoose, by default, will automatically pluralize the singular name to generate the name of the MongoDB collection.

For example:

- Singular model name: 'User'
- Automatically pluralized collection name: 'users'

Mongoose follows this convention to help developers by providing a consistent way to interact with the database collections while keeping the code easy to read. The pluralization of collection names makes it clearer that you are dealing with a collection of documents rather than a single document.

While this is the default behavior, you can explicitly specify the collection name by providing a third argument to the mongoose.model() function. This can be useful if you want to use a specific collection name that doesn't follow the automatic pluralization. Here's an example:

```js
const User = mongoose.model("User", userSchema, "customCollectionName");
```

In this example, the collection created will be named 'customCollectionName' instead of the automatically pluralized 'users'.

## create a document

make a new instance of the model you want

```js
const course = new Course({
  name: "Angular Course",
  author: "Mosh",
  tags: ["angular", "frontend"],
  isPublished: true,
});
```

when you save the created instance it returns a promise and provides the saved document

```js
async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save(); // this returns the saved document in the collection, this operation is async
  console.log(result);
}
```

## find document/documents

use the model to find the documents, it returns the result in a promise like object called query-document

```js
async function findCourse() {
  const courses = await Course.find();
  console.log(courses);
}
```

`find` by default returns all the documents in the selected collection,

you can filter the collections by passing a filter object as an argument to the `find` method

```js
async function findCourse() {
  const courses = await Course.find({ name: "Node.js" });
  console.log(courses);
}
```

code above is going to return all the documents in `Course` model with the name property of `Node.js`.

### more `find` methods

- `limit` takes a number and limits the output documents to that number

```js
async function findCourse() {
  const courses = await Course.find().limit(2);
  console.log(courses);
}
```

returns 2 document from all the documents in the collection(model)

- `sort` takes an object of field/fields set each property to (1 for ascending, -1 for descending)

```js
async function findCourse() {
  const courses = await Course.find().sort({ name: 1 });
  console.log(courses);
}
```

returns all documents in collection and sorts them in ascending order based on their name property

- `select` takes an object of field/fields that you want in the final result set property to (1 for include, -1 for exclude)

```js
async function findCourse() {
  const courses = await Course.find().select({
    name: 1,
    author: 1,
    isPublished: 1,
    _id: -1,
  });
  console.log(courses);
}
```

fids all documents and includes/excludes only the specified fields

- `count` returns the count of documents in a collection

### comparison query operators

- eq -> equal
- lt -> less than
- gt -> greater than
- lte -> less than or equal to
- gte -> greater than or equal to
- neq -> not equal to
- in -> to check if a value is in an (i e: array )
- nin -> not in

`$` is used to tell mongoose that we are using an operator

find all courses with the price equal to `10`

```js
async function findCourse() {
  const courses = await Course.find({ price: 10 });
  console.log(courses);
}
```

find all courses with the price greater than `10` and less than `50`

```js
async function findCourse() {
  const courses = await Course.find({ price: { $gt: 10, $lt: 50 } });
  console.log(courses);
}
```

### logical operators

- or

```js
async function findCourse() {
  const courses = await Course.find().or([
    { author: "Mosh" },
    { isPublished: true },
  ]);
  console.log(courses);
}
```

returns courses that whether the author is `Mosh` or the course is published

- and

  ```js
  async function findCourse() {
    const courses = await Course.find().and([
      { author: "Mosh" },
      { isPublished: true },
    ]);
    console.log(courses);
  }
  ```

  returns all the courses that the author is `Mosh` and is published

  ### regular expressions

```js
async function findCourse() {
  const courses = await Course.find({ author: /Mosh/ });
  // courses with author name of "Mosh"
  const courses = await Course.find({ author: /^Mosh/ });
  // courses with author name starts with "Mosh"
  const courses = await Course.find({ author: /hamedani$/ });
  // courses with author name ends with "hamedani"

  console.log(courses);
}
```

