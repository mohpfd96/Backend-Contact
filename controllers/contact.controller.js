const Contact = require("../models/contact.model");

exports.createContact = async (req, res) => {
  try {
    let data = { ...req.body, userId: req.params.userId };
    console.log(data);
    const contact = new Contact(data);
    await contact.save();
    res
      .status(201)
      .send({ message: "Contact created successfully", data: contact });
  } catch (error) {
    res.status(400).send({ message: "Contact creation failed", data: error });
  }
};

exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).send({ message: "Contact not found", data: null });
    }
    res.send({ message: "Contact retrieved successfully", data: contact });
  } catch (error) {
    res.status(500).send({ message: "Error retrieving contact", data: error });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!contact) {
      return res.status(404).send({ message: "Contact not found", data: null });
    }
    res.send({ message: "Contact updated successfully", data: contact });
  } catch (error) {
    res.status(400).send({ message: "Contact update failed", data: error });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).send({ message: "Contact not found", data: null });
    }
    res.send({ message: "Contact deleted successfully", data: contact });
  } catch (error) {
    res.status(500).send({ message: "Error deleting contact", data: error });
  }
};

exports.getContacts = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res
      .status(400)
      .send({ message: "userId query parameter is required", data: null });
  }
  try {
    const contacts = await Contact.find({ userId: userId });
    res.send({ message: "Contacts retrieved successfully", data: contacts });
  } catch (err) {
    res.status(500).send({ message: "Error retrieving contacts", data: err });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    console.log(contacts);
    res.send({ message: "Contacts retrieved successfully", data: contacts });
  } catch (err) {
    res.status(500).send({ message: "Error retrieving contacts", data: err });
  }
};
