const express = require('express');
const router = express.Router();
const { clienteRoutes } = require('../routes/clienteRoutes')
const { produtoRoutes } = require('../routes/produtoRoutes')

router.use('/', produtoRoutes)
router.use('/', clienteRoutes)

router.use((req, res) => {
    res.status(404).json({ message: 'Pagina não encontrada' })
})

module.exports = { router };