const express = require("express");
const produtoRoutes = express.Router();
const { produtoController } = require("../controllers/produtoController");

produtoRoutes.get("/produtos", produtoController.selecionaTodos);
produtoRoutes.post("/produtos", produtoController.incluiRegistro);
produtoRoutes.put("/produtos/:idProduto", produtoController.alteraProduto);
produtoRoutes.delete("/produtos/:idProduto", produtoController.deletaProduto);
module.exports = { produtoRoutes };
