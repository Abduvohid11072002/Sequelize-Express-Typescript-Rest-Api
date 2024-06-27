import { Sequelize } from "sequelize";

const sequelize = new Sequelize("postgresql://postgres:root@localhost:5432/test_sequlize", {
    dialect: 'postgres',
    logging: false
})

export default sequelize;
