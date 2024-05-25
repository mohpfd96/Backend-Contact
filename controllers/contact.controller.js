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
    res.status(400).send({ message: "Contact Created", data: error });
  }
};

exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res
        .status(404)
        .send({ message: "Contact Not Found!", data: null });
    }
    res.send({ message: "Contact Found!", data: contact });
  } catch (error) {
    res.status(500).send({ message: "Error Getting Contacts!", data: error });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!contact) {
      return res
        .status(404)
        .send({ message: "Contact Not Found!", data: null });
    }
    res.send({ message: "Contact Updated!", data: contact });
  } catch (error) {
    res.status(400).send({ message: "Failed Update Contact", data: error });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res
        .status(404)
        .send({ message: "Contact Not Found!", data: null });
    }
    res.send({ message: "Contact Deleted!", data: contact });
  } catch (error) {
    res.status(500).send({ message: "Error Deleting Contacts!", data: error });
  }
};

exports.getContacts = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).send({ message: "No userId!", data: null });
  }
  try {
    const contacts = await Contact.find({ userId: userId });
    res.send({ message: "Contacts Found!", data: contacts });
  } catch (err) {
    res.status(500).send({ message: "Error Getting Contacts!", data: err });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.send({ message: "Contacts Found!", data: contacts });
  } catch (err) {
    res.status(500).send({ message: "Error Getting Contacts!", data: err });
  }
};
