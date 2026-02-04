const Contact = require("../models/Contact");

exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create({
      userId: req.user._id,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email
    });

    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user._id });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
