const { Sequelize, DataTypes } = require('sequelize')

//const sequelize = new Sequelize( 'postgres://vmaojkrjsulkat:3f234d31d4d23fe567bc6774885b5576cd334bbf461fbcb57f13f25a9c3fd177@ec2-35-173-114-25.compute-1.amazonaws.com:5432/dd1lp73ttk278f?sslmode=require');
//postgres://vmaojkrjsulkat:3f234d31d4d23fe567bc6774885b5576cd334bbf461fbcb57f13f25a9c3fd177@ec2-35-173-114-25.compute-1.amazonaws.com:5432/dd1lp73ttk278f

const sequelize = new Sequelize(
    'dd1lp73ttk278f',  
    'vmaojkrjsulkat',  
    '3f234d31d4d23fe567bc6774885b5576cd334bbf461fbcb57f13f25a9c3fd177',
    {
        host: 'ec2-35-173-114-25.compute-1.amazonaws.com',
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false 
            }
          },
    },

);
const toDoItem = sequelize.define('toDoItem', {
    // id: {
    //     type: DataTypes.UUID,
    //     defaultValue: DataTypes.UUIDV4,
    //     primaryKey: true,
    //     allowNull: false
    // },
    title: {    
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
    },
    description: {
        type: Sequelize.STRING
    },
    isCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    priority: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    deadlineDate: {
        type: Sequelize.DATE,
        defaultValue: new Date((new Date(Date.now())).setMonth((new Date(Date.now())).getMonth()+1)),// refer 43 line
    }
})

//
//Setting deadline with 1 month+ date of creation of todo item
//Date.now(): returns a numerical value corresponding to current date
//but we require a Date object to apply getMonth() and setMonth() functions
const now=new Date(Date.now())
const month=now.getMonth()// 0-11
now.setMonth(month+1)
console.log(now)
//OR Directly
console.log(new Date((new Date(Date.now())).setMonth((new Date(Date.now())).getMonth()+1)))
//

toDoItem.sync({ force: true })// comment after running once

module.exports = toDoItem