//user:huongvt
//passs: Ps72zGaREQg00eOj
//cluster0.ksx2wui.mongodb.net
//mongodb+srv://huongvt:<db_password>@cluster0.ksx2wui.mongodb.net/

// 1 file .js chứa toàn bộ mã nguồn (kết nối MongoAtlas, xử lý APIs) 
// 4 ảnh minh họa Postman với thao tác CRUD 
// 1 ảnh chụp bản thân + bảng trên lớp 
// Lưu ý: 
// MongoDB truy cập qua user-password với user là MSSV; tên Collection là tên email của các bạn. Ví dụ MSSV là 2020123456; Collection là minh.nn20123456.
// Nếu file .js không upload được, có thể đổi đuôi file sang .txt. Không nén các files thành một file chung.


const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); //middleware to parse JSON request body


const uri = "mongodb+srv://huongvt:Ps72zGaREQg00eOj@cluster0.ksx2wui.mongodb.net/?appName=Cluster0";
const collectionName = "students";


mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// const client = new MongoClient(uri);

async function run() {
  try {
    // 1. Connect to the server
    await client.connect();
    console.log("Connected successfully to server");

    // 2. Select the Database and Collection
    const db = client.db('mongodbVSCodePlaygroundDB'); // The DB name from your playground
    const collection = db.collection('sales');

    // 3. Insert Documents (The data from your playground)
    const insertResult = await collection.insertMany([
      { 'item': 'abc', 'price': 10, 'quantity': 2, 'date': new Date('2014-03-01T08:00:00Z') },
      { 'item': 'jkl', 'price': 20, 'quantity': 1, 'date': new Date('2014-03-01T09:00:00Z') },
      { 'item': 'xyz', 'price': 5, 'quantity': 10, 'date': new Date('2014-03-15T09:00:00Z') }
    ]);
    console.log(`Inserted ${insertResult.insertedCount} documents`);

    // 4. Run the Query (Sales on April 4th, 2014)
    // In Node.js, we use 'await' because database calls take time
    const count = await collection.countDocuments({
      date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') }
    });
    
    console.log(`${count} sales occurred in 2014.`);

    // 5. Run the Aggregation
    const aggregationCursor = collection.aggregate([
      { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
      { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
    ]);

    // Print aggregation results
    await aggregationCursor.forEach(doc => console.log(doc));

  } finally {
    // 6. Close the connection when done
    await client.close();
  }
}

run().catch(console.dir);