export const constaint = {
  Datatype: {
    INT: " INT ",
    BIGINT: " BIGINT ",
    VARCHAR: (size) => ` VARCHAR(${size || 45}) `,
    BOOLEAN: " BOOLEAN ",
    TIMESTAMP: " TIMESTAMP DEFAULT CURRENT_TIMESTAMP ",
  },
  PRIMARY_KEY: " PRIMARY KEY ",
  AUTO_INCREMENT: " AUTO_INCREMENT ",
  UNIQUE: " UNIQUE ",
  NOT_NULL: " NOT NULL ",
  DEFAULT: " DEFAULT ",
};
class Model {
  constructor(tablename, colons, db) {
    this.table = tablename;
    this.colons = colons;
    this.db = db;
  }
  
  async dropTable() {
    const drop = async () => {
      try {
        await this.db(`DROP TABLE ${this.table}`);
      } catch (error) {
        console.log(error);
      }
    };
    return drop();
  }

  async creatTable() {
    const creat = async () => {
      console.log(`creating ${this.table} table`);
      try {
        const result = await this.db(
          `CREATE TABLE ${this.table} (${this.colons})`
        );
        return result;
      } catch (error) {
        return console.log(`creating ${this.table} table error ::`, error);
      }

      // try {
      //   const result = await this.db(
      //     `CREATE TABLE ${this.table} (${this.colons})`
      //   );
      //   return result;
      // } catch (error) {
      //   return console.log(error);
      // }
    };
    return creat();
  }

  async save(insertedData) {
    const result = await this.db(
      `INSERT INTO ${this.table} SET ?`,
      insertedData
    );
    return result;
  }

  async update(selectors, updateedData) {
    if (typeof selectors === "object") {
      const keys = Object.keys(updateedData);
      const values = Object.values(updateedData);
      const result = await this.db(
        `UPDATE ${this.table} SET ${keys.map((item) => {
          return `${item} = ?`;
        })} WHERE ${Object.keys(selectors)[0]} = ?`,
        [...values, Object.values(selectors)[0]]
      );
      return result;
    } else {
      const err = new Error();
      err.name = "there's problem in selector";
      err.message = "try anahtere selector";
      throw err;
    }
  }

  async updateOneById(selector_value, updateedData) {
    const result = await this.db(
      `UPDATE ${this.table}  SET  ?  WHERE  id = ?`,
      [updateedData, selector_value]
    );
    return result;
  }

  async delete(selectors = { selector: selector_value } || stringSelectors) {
    if (typeof selectors === "object") {
      const selector_value = Object.values(selectors)[0];
      const selector_key = Object.keys(selectors)[0];
      const result = await this.db(
        `DELETE FROM ${this.table} WHERE ${selector_key} = ?
        `,
        selector_value
      );
      return result;
    } else if (typeof selectors === "string") {
      const result = await this.db(
        `DELETE FROM ${this.table} WHERE ${selectors}`
      );
      return result;
    }
  }

  async deleteOneById(selector_value) {
    const result = await this.db(
      `DELETE FROM ${this.table}  WHERE  id = ?`,
      selector_value
    );
    return result;
  }

  async find({ selectors, columns } = "noParams") {
    if (
      typeof selectors !== "object" &&
      typeof selectors !== "string" &&
      selectors
    ) {
      const err = new Error();
      err.name = "there's problem in selector";
      err.message = "try anahtere selector";
      throw err;
    } else if (typeof selectors === "object") {
      const selector_value = Object.values(selectors)[0];
      const selector_key = Object.keys(selectors)[0];
      const result = await this.db(
        `SELECT ${columns || "*"} FROM ${this.table} WHERE ${selector_key} = ?`,
        selector_value
      );
      return result;
    } else if (!selectors) {
      const result = await this.db(
        `SELECT ${columns || "*"} FROM ${this.table}`
      );
      return result;
    } else if (typeof selectors === "string") {
      const result = await this.db(
        `SELECT ${columns || "*"} FROM ${this.table} WHERE ${selectors}`
      );
      return result;
    }
  }
}

export default Model;