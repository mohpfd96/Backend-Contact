const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");

router.post("/", contactController.createContact);
router.get("/", contactController.getContacts);
router.get("/:id", contactController.getContact);
router.patch("/:id", contactController.updateContact);
router.delete("/:id", contactController.deleteContact);

module.exports = router;
