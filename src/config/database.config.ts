import { Sequelize } from "sequelize";

const sequelize = new Sequelize("postgresql://postgres:root@localhost:5432/test_sequlize", {
    dialect: 'postgres',
    logging: false
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); 
    console.log(`Postgres connected `);

  } catch (error) {
      console.error(error);
      process.exit(1);
  }
};

export default sequelize;
