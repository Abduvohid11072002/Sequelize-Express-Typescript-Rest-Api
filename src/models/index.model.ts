import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.config";

interface ToDoAtributes {
    id: string;
    title: string;
    completed: boolean;
}
export class ToDoInstance extends Model<ToDoAtributes> { }

ToDoInstance.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'ToDoInstance',
  tableName: 'todos',
});