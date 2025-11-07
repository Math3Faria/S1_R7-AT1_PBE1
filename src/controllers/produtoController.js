const { produtoModel } = require("../models/produtoModel");

const produtoController = {
  /**
   * Retorna os produtos cadastrados
   * Rota GET /produtos
   * @async
   * @function selecionaTodos
   * @param {Request} req Objeto da requisição HTTP
   * @param {Response} res Objeto da resposta HTTP
   * @returns {promisse<Array<object>>} Objeto contendo o resultado da consulta
   */

  selecionaTodos: async (req, res) => {
    try {
      const resultado = await produtoModel.selelectAll();
      if (resultado.length === 0) {
        return res.status(200)
          .json({ message: "A consulta nao retornou resultados" });
      }
      return res
        .status(200)
        .json({ message: "Dados da tabela aluno", data: resultado });
    } catch (error) {
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
        errorMessage: error.message,
      });
    }
  },
  incluiRegistro: async (req, res) => {
    try {
      const { descricao, valor } = req.body;
      if (!descricao || !valor || !isNaN(descricao) || isNaN(valor)) {
        return res
          .status(400)
          .json({ message: "Verifique os dados enviados e tente novamente" });
      }

      const resultado = await produtoModel.insert(descricao, valor);
      if (resultado.insertId === 0) {
        throw new Error("Ocorreu um erro ao incluir o produto");
      }
      res
        .status(201)
        .json({ message: "Registro incluído com sucesso", data: resultado });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
        errorMessage: error.message,
      });
    }
  },
  alteraProduto: async (req, res) => {
    try {
      const idProduto = Number(req.params.idProduto);
      const { descricao, valor } = req.body;
      if (
        !idProduto || (!descricao && !valor) ||(!isNaN(descricao) && isNaN(valor)) ||typeof idProduto != "number") {
        return res.status(400).json({ message: "Verifique os dados alterados e tente novamente" });
        }
        const produtoAtual = await produtoModel.selectById(idProduto);
        if (produtoAtual.length === 0) {
          return res.status(200).json({ message: "Produto não localizado" });
        }
        const novaDescricao = descricao ?? produtoAtual[0].nome_produto;
        const novoValor = valor ?? produtoAtual.valor_produto;

        const resultUptade = await produtoModel.update(idProduto, novaDescricao, novoValor);
        if(resultUptade.affectedRows === 1 && resultUptade.changedRows ===0){
            return res.status(200).json({message: 'Não há alterações a serem realizadas'})
        }
        if(resultUptade.affectedRows === 1 && resultUptade.changedRows ===1){
            return res.status(200).json({message: 'Registro alterado com sucesso'})
        }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
        errorMessage: error.message,
      });
    }
  },

  deletaProduto: async (req, res) => {
    try {
        const idProduto = Number(req.params.idProduto);

        if(!idProduto || !Number.isInteger(idProduto)){
            return res.status(400).json({message: 'forneça um identificador válido!'})
        }
        const produtoSelecionado = await produtoModel.selectById(idProduto);
        if(produtoSelecionado.length === 0) {
            return res.status(200).json({message: 'Produto não localizado na base de dados'})
        
        }
        const resultadoDelete = await produtoModel.delete(idProduto);
        if(resultadoDelete.affectedRows === 0) {
            return res.status(200).json({message: 'Ocorreu um erro ao excluir o produto'})
        }
        res.status(200).json({message: "Produto excluído com sucesso!"})
    } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Ocorreu um erro no servidor",
          errorMessage: error.message,
        });
      }
  }
};
module.exports = { produtoController };
