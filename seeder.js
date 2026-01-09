// require('dotenv').config();
// const mongoose = require('mongoose');
// const Admin = require('./src/models/Admin');
// const Product = require('./src/models/Product');
// const connectDB = require('./src/config/db');

// const seedData = async () => {
//     try {
//         await connectDB();

//         await Admin.deleteMany();
//         const admin = await Admin.create({
//             username: 'adminstocktify',
//             password: 'stocktify123',
//         });

//         console.log('Admin created!');

//         console.log('Data Seeding Successful!');
//         process.exit();
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//         process.exit(1);
//     }
// };

// seedData();
