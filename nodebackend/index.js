const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();

app.use(cors());
app.use(express.json());
const port = 5000;

// Enter your MongoDB connection details
const mongoURI = 'mongodb://127.0.0.1:27017';
const dbName = 'Employee_details';

const client = new MongoClient(mongoURI, {});

client.connect((err) => {
    if (err) {
        return console.error('Error connecting to MongoDB', err);
    }
    console.log('Connected to MongoDB!');
});

app.get('/employee', async (req, res, next) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('Employee');

        const testData = await collection.find().toArray();
        console.log(testData);
        res.send(testData);
    } catch (error) {
        console.error('Error retrieving data from MongoDB', error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/add-employee', async (req, res, next) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('Employee');

        const newUser = req.body; // Assuming the user data is sent in the request body

        // Insert the new user into the database
        await collection.insertOne(newUser);

        res.status(201).send('User created successfully');
    } catch (error) {
        console.error('Error creating user in MongoDB', error);
        res.status(500).send('Internal Server Error');
    }
});
app.put('/update-employee/:id', async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('Employee');

        const userId = req.params.id;
        const updatedUser = req.body;

        // Update the user in the database
        await collection.updateOne({ Emp_id: userId }, { $set: updatedUser });

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user in MongoDB', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.delete('/delete-employee/:id', async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('Employee');

        const userId = req.params.id;

        // Ensure that the provided user ID is a valid MongoDB ObjectId
        if (!ObjectId.isValid(userId)) {
            return res.status(400).send('Invalid user ID');
        }

        // Parse the user ID to an integer if it's a number
        const userIdToMatch = isNaN(userId) ? userId : parseInt(userId);

        // Delete the user from the database
        await collection.deleteOne({ Emp_id: userIdToMatch });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user in MongoDB', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Horror jassa app is running on port ${port}.`);
});
