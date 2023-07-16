const express = require("express");
const ctrl = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const { addSchema, putSchema } = require("../../schemas");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post(
  "/",
  validateBody(addSchema, `Missing required name fields`),
  ctrl.add
);

router.delete("/:contactId", ctrl.remove);

router.put(
  "/:contactId",
  validateBody(putSchema, "Missing fields"),
  ctrl.updateById
);

module.exports = router;
