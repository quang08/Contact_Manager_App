//controllers handle/contain logic for routers

const getContacts = (req, res) => {
  res.status(200).json({ message: "Get all contacts" });
};

const getContact = (req, res) => {
  res.status(200).json({ message: "Get a contact" });
};

//POST requests if succeeded, return 201: new resources created
const createContact = (req, res) => {
  res.status(201).json({ message: "Created a contact" });
};

const updateContact = (req, res) => {
  res.status(200).json({ message: "Updated a contact" });
};

//DELETE requests if succeeded, return 204: no content
const deleteContact = (req, res) => {
  res.status(204).json({ message: "Deleted a contact" });
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
