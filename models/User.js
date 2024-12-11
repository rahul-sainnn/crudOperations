const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  timestamps: true, 
});

// const createTable = async () => {
//   try {
//     // Force sync will drop the table if it exists, then create a new one
//     await sequelize.sync({ force: true }); 
//     console.log('Users table created successfully');
//   } catch (error) {
//     console.error('Error creating table:', error);
//   }
// };

// Call createTable to create the table
// createTable();

module.exports = User;
