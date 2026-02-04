const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  createContact,
  getContacts,
  updateContact,
  deleteContact
} = require("../controllers/contactController");

router.post("/", authMiddleware, createContact);
router.get("/", authMiddleware, getContacts);
router.put("/:id", authMiddleware, updateContact);
router.delete("/:id", authMiddleware, deleteContact);

module.exports = router;
