const { clienteModel } = require("../models/clienteModel");

const clienteController = {
  selecionaTodos: async (req, res) => {
    try {
      const resultado = await clienteModel.selelectAll();
      if (resultado.length === 0) {
        return res
          .status(200)
          .json({ message: "A consulta não retornou resultados" });
      }
      return res
        .status(200)
        .json({ message: "Dados da tabela clientes", data: resultado });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message: "Erro interno do servidor",
          errorMessage: error.message,
        });
    }
  },

  incluiRegistro: async (req, res) => {
    try {
      const { nome, cpf } = req.body;
      if (!nome || !cpf || !isNaN(nome) || isNaN(cpf)) {
        return res
          .status(400)
          .json({ message: "Verifique os dados enviados e tente novamente" });
      }

      const clientes = await clienteModel.selelectAll();
      const cpfExiste = clientes.find((c) => c.cpf_cliente == cpf);
      if (cpfExiste) {
        return res
          .status(409)
          .json({ message: "CPF já cadastrado na base de dados" });
      }

      const resultado = await clienteModel.insert(nome, cpf);
      if (resultado.insertId === 0) {
        throw new Error("Erro ao incluir o cliente");
      }

      res
        .status(201)
        .json({ message: "Registro incluído com sucesso", data: resultado });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message: "Erro interno do servidor",
          errorMessage: error.message,
        });
    }
  },

  alteraCliente: async (req, res) => {
    try {
      const idCliente = Number(req.params.idCliente);
      const { nome, cpf } = req.body;

      if (!idCliente || (!nome && !cpf)) {
        return res
          .status(400)
          .json({ message: "Verifique os dados enviados e tente novamente" });
      }

      const clienteAtual = await clienteModel.selectById(idCliente);
      if (clienteAtual.length === 0) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }

      const novoNome = nome ?? clienteAtual[0].nome_cliente;
      const novoCpf = cpf ?? clienteAtual[0].cpf_cliente;

      if (cpf && cpf !== clienteAtual[0].cpf_cliente) {
        const clientes = await clienteModel.selelectAll();
        const cpfDuplicado = clientes.find(
          (c) => c.cpf_cliente == cpf && c.id_cliente !== idCliente
        );
        if (cpfDuplicado) {
          return res
            .status(409)
            .json({ message: "O novo CPF informado já está cadastrado" });
        }
      }

      const resultado = await clienteModel.update(idCliente, novoNome, novoCpf);
      if (resultado.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Cliente não encontrado para atualização" });
      }

      if (resultado.affectedRows === 1 && resultado.changedRows === 0) {
        return res
          .status(200)
          .json({ message: "Nenhuma alteração foi realizada" });
      }

      res.status(200).json({ message: "Cliente alterado com sucesso" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message: "Erro interno do servidor",
          errorMessage: error.message,
        });
    }
  },

  deletaCliente: async (req, res) => {
    try {
      const idCliente = Number(req.params.idCliente);

      if (!idCliente || !Number.isInteger(idCliente)) {
        return res
          .status(400)
          .json({ message: "Forneça um identificador válido" });
      }

      const clienteSelecionado = await clienteModel.selectById(idCliente);
      if (clienteSelecionado.length === 0) {
        return res
          .status(404)
          .json({ message: "Cliente não localizado na base de dados" });
      }

      const resultado = await clienteModel.delete(idCliente);
      if (resultado.affectedRows === 0) {
        return res.status(500).json({ message: "Erro ao excluir o cliente" });
      }
      res.status(200).json({ message: "Cliente excluído com sucesso" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message: "Erro interno do servidor",
          errorMessage: error.message,
        });
    }
  },
};

module.exports = { clienteController };
