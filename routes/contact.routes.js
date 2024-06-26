const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");

//api/contacts
router.post("/:userId", contactController.createContact);
router.get("/:userId", contactController.getContacts);
router.get("/", contactController.getAllContacts); // Admin Access
router.get("/:id", contactController.getContact);
router.put("/:id", contactController.updateContact);
router.delete("/:id", contactController.deleteContact);

module.exports = router;
