//**** controllers handle/contain logic for routers ****

//In Express, route handlers or middleware functions often contain asynchronous operations such as interacting with databases or making API calls.
//These asynchronous operations typically involve promises or async/await syntax.
//However, if an error occurs within an asynchronous function, Express does not handle it automatically. It's necessary to catch the error
//and pass it to the next error-handling middleware or send an appropriate response.
//The express-async-handler package provides a convenient way to wrap asynchronous functions
//and automatically catch any errors within them. It eliminates the need for explicit try/catch blocks in each async function and simplifies error handling.
const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get a contact" });
});

//POST requests if succeeded, return 201: new resources created
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  //Error throwing: However this way the error is not in JSON but HTMl, so we should create a custom middleware
  //where it takes incoming req and res then convert errors to JSON if there's any
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Updated a contact" });
});

//DELETE requests if succeeded, return 204: no content
const deleteContact = asyncHandler(async (req, res) => {
  res.status(204).json({ message: "Deleted a contact" });
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
