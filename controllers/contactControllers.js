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
  const contacts = await Contact.find({ user_id: req.user.id }); //fetch all the contacts of the logged in user. Meaning each logged in user has different contacts to fetch
  res.status(200).json(contacts);
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
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
    user_id: req.user.id, //attach the id of the user who created the contact
    //we got req.user property through the validateToken middleware where it decodes the JWT then add req.user = decode.user property
  });
  res.status(201).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User does not have permission");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//DELETE requests if succeeded, return 204: no content
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User does not have permission");
  }
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
