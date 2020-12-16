const app = require('./app')
const { Sequelize } = require('sequelize')


//const sequelize = new Sequelize( 'postgres://vmaojkrjsulkat:3f234d31d4d23fe567bc6774885b5576cd334bbf461fbcb57f13f25a9c3fd177@ec2-35-173-114-25.compute-1.amazonaws.com:5432/dd1lp73ttk278f?sslmode=require');
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

sequelize.authenticate().then(log => console.log('Postgres DB Connection Successful'))
    .catch('DB Connection Not Successful')

const port = process.env.PORT || 5500
app.listen(port, () => {
    console.log('Running on port', port)
})