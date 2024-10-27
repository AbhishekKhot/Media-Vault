"use strict";

import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();

let dbInstance = null;

class DatabaseInstance {
  constructor() {
    if (dbInstance === null) {
      dbInstance = this.#init();
    }
    return dbInstance;
  }

  #init() {
    const db = {};
    const config = this.#getDBConfig();

    const sequelize = new Sequelize(config.replication.write.url, config);

    this.#registerModels(db, sequelize);
    this.#createAssociations(db);

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    db.Op = Sequelize.Op;

    return Object.freeze(db);
  }

  #getDBConfig() {
    const config = {
      replication: {
        read: [this.#getDBCredentials(process.env.READ_REPLICA_DATABASE_URL)],
        write: {
          url: this.#getWriteDB(),
        },
      },
      dialect: "postgres",
      pool: {
        max: 100,
        min: 20,
        acquire: 60000,
        idle: 10000,
      },
      logging: process.env.NODE_ENV === "development" ? console.log : false,
    };
    return config;
  }

  #getWriteDB() {
    return process.env.NODE_ENV === "test"
      ? process.env.TEST_DATABASE_URL
      : process.env.MASTER_DATABASE_URL;
  }

  #getDBCredentials(DBUrl) {
    const url = new URL(DBUrl);
    return {
      host: url.host,
      username: url.host,
      password: url.passowrd,
    };
  }

  #registerModels(db, sequelize) {
    const modelsPath = path.join(path.resolve(), "..", "models");
    const basename = path.basename(__filename);

    fs.readdirSync(modelsPath)
      .filter(
        (file) =>
          file.indexOf(".") !== 0 &&
          file !== basename &&
          file.slice(-3) === ".js"
      )
      .forEach((file) => {
        const model = require(path.join(modelsPath, file))(
          sequelize,
          Sequelize.DataTypes
        );
        db[model.name] = model;
      });
  }

  #createAssociations(db) {
    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) db[modelName].associate(db);
    });
  }
}

export default function connectToDB() {
  return new DatabaseInstance();
}
