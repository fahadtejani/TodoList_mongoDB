# TodoList_mongoDB

A todo List app that interacts with a local MongoDB database, using Mongoose. Use of a database allows persistent list items that can be accessed even after leaving the page. It is able to perform all four CRUD operations in response to user initiated events.

Technologies learned and used:
- Node.js
- Express.js
- MongoDB using Mongoose
- Lodash(_) for manipulating user input strings
- Body parser for incoming post requests
- EJS for dynamic rendering
- Express.js parameters for dynamic routing

Use of dynamic routing allows user to create separate lists with persistent list items.
For example, going to "localhost:3000" will give a "Today" list by default.
While going to "localhost:3000/weekend" will dynamically create a "Weekend" titled list and a corresponding collection entry in the database.


Note to self:

+ To use express parameters:
"student.get('/profile/:start/:end', function (req, res) {
    console.log("Starting Page: ", req.params['start']);
    console.log("Ending Page: ", req.params['end']);
    res.send();
})"
each parameter is available separately as "req.param.<Parameter Name>"
reference: https://www.geeksforgeeks.org/express-js-req-params-property/

+ Rather than typing up a .gitignore file every time just get a template from https://github.com/github/gitignore .
  -For node apps, just use: https://github.com/github/gitignore/blob/main/Node.gitignore .
