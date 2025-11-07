const { pool } = require("../config/db");

const clienteModel = {
  /**
   * Retorna todos os clientes cadastrados na tabela clientes
   * @async
   * @function selelectAll
   * @returns {promisse<Array<object>>} Retorna um array de objetos, cada objeto representa um cliente
   * @example
   * const clientes = await clienteModel.selectAll();
   * console.log(clientes)
   * //saída esperada
   * [
   *      {coluna1: "valorColuna1", coluna2:"valorColuna2",coluna3: "valorColuna3", ...},
   *      {coluna1: "valorColuna1", coluna2:"valorColuna2",coluna3: "valorColuna3", ...}
   * ]
   */
  selelectAll: async () => {
    const sql = "select * FROM clientes;";
    const [rows] = await pool.query(sql);
    return rows;
  },
  selectById: async (pId) => {
    const sql = "select * FROM clientes;";
    const values = [pId];
    const [rows] = await pool.query(sql);
    return rows;
  },
  /**
   * Insere um cliente na base de dados
   * @param {string} pNomeCliente Descrição do nome do cliente que deve ser inserido no banco de dados
   * @param {number} pCpfCliente o cpf do cliente que deve ser inserido no banco de dados Ex: 126.99
   * @returns {Promise<Object>} retorna um objeto contendo propriedades sobre o resultado da execução da query
   * @example
   * const result = await clienteModel.insert(paramA, paramB);
   * //Saída
   *      "result": {
   *      "fildCount": 0,
   *      "affectedRows": 1,
   *      "inserctId": 1,
   *      "info": "",
   *      "serverStatus": 2,
   *      "warningStatus": 0,
   *      "changedRowns": 0
   * }
   */
  insert: async (pNomeCliente, pCpfCliente) => {
    const sql =
      "insert into clientes (nome_cliente, cpf_cliente) values (?,?);";
    const values = [pNomeCliente, pCpfCliente];
    const [rows] = await pool.query(sql, values);
    return rows;
  },

  update: async (pId, pNomeCliente, pCpf) => {
    const sql =
      "update clientes set nome_cliente=?, cpf_cliente=? where id_cliente=?;";
    const values = [pNomeCliente, pCpf, pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },
  delete: async (pId) => {
    const sql = "delete from clientes where id_cliente = ?;";
    const values = [pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },
};

module.exports = { clienteModel };