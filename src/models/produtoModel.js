const { pool } = require("../config/db");

const produtoModel = {
  /**
   * Retorna todos os produtos cadastrados na tabela produtos
   * @async
   * @function selelectAll
   * @returns {promisse<Array<object>>} Retorna um array de objetos, cada objeto representa um produto
   * @example
   * const produtos = await produtoModel.selectAll();
   * console.log(produtos)
   * //saída esperada
   * [
   *      {coluna1: "valorColuna1", coluna2:"valorColuna2",coluna3: "valorColuna3", ...},
   *      {coluna1: "valorColuna1", coluna2:"valorColuna2",coluna3: "valorColuna3", ...}
   * ]
   */
  selelectAll: async () => {
    const sql = "select * FROM produtos;";
    const [rows] = await pool.query(sql);
    return rows;
  },

  selectById: async (pId) => {
    const sql = "select * FROM produtos;";
    const values = [pId];
    const [rows] = await pool.query(sql);
    return rows;
  },
  /**
   * Insere um produto na base de dados
   * @param {string} pNomeProd Descrição do nome do protudo que deve ser inserido no banco de dados
   * @param {number} pValorProd Valor do produto que deve ser inserido no banco de dados Ex: 126.99
   * @returns {Promise<Object>} retorna um objeto contendo propriedades sobre o resultado da execução da query
   * @example
   * const result = await produtoModel.insert(paramA, paramB);
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
  insert: async (pNomeProd, pValorProd) => {
    const sql =
      "insert into produtos (nome_produto, valor_produto) values (?,?);";
    const values = [pNomeProd, pValorProd];
    const [rows] = await pool.query(sql, values);
    return rows;
  },

  update: async (pId, pDescricao, pValor) => {
    const sql =
      "update produtos set nome_produto=?, valor_produto=? where id_produto=?;";
    const values = [pDescricao, pValor, pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },
  delete: async (pId) => {
    const sql = "delete from produtos where id_produto = ?;";
    const values = [pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },
};

module.exports = { produtoModel };

// selecionaPorId: async (pId) => {
//     const sql = 'select * from ... where id=?;';
//     const values = [pId];
//     const [rows] = await pool.query(sql, values);
//     return rows;
// },
// insere: async (pNome, pMatricula) => {
//     const sql = 'insert into ... (....) values(?,?);';
//     const values = [pNome, pMatricula];
//     const [rows] = await pool.query(sql, values);
//     return rows;
// },
// atualiza: async (pId, pNome, pMatricula) => {
//     const sql = 'update ... set ...=?, matricula=? where id=?;';
//     const values = [pNome, pMatricula, pId];
//     const [rows] = await pool.query(sql, values);
//     return rows;
// },
// deleta: async (pId) =>{
//     const sql = 'delete from ... where id=?;';
//     const values = [pId];
//     const [rows] = await pool.query(sql, values);
//     return rows;
// }
