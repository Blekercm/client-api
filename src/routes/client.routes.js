const { Router } = require("express");
const {
  createClient,
  getAllClient,
  getClient,
  updateClient,
  deleteClient,
} = require("../controllers/client.controller");

const router = Router();

router.post("/client/add", createClient);

router.get("/client/getAll", getAllClient);

router.get("/client/get/:id", getClient);

router.put("/client/update/:id", updateClient);

router.delete("/client/delete/:id", deleteClient);

module.exports = router;
