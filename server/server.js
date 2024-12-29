import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import User from './models/User.js';
import Access from './models/Access.js';
import MedicalRecord from './models/MedicalRecord.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware for parsing JSON bodies
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Veracity Server!');
});

/** USER ROUTES **/
// Get all Users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new User
app.post('/api/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a User by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a User
app.put('/api/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a User
app.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/** ACCESS ROUTES **/
// Get all Access records
app.get('/api/access', async (req, res) => {
  try {
    const accessRecords = await Access.find().populate('patientId medicalProviderId', 'name email');
    res.json(accessRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new Access record
app.post('/api/access', async (req, res) => {
  try {
    const newAccess = await Access.create(req.body);
    res.status(201).json(newAccess);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a specific Access record by ID
app.get('/api/access/:id', async (req, res) => {
  try {
    const accessRecord = await Access.findById(req.params.id).populate('patientId medicalProviderId', 'name email');
    if (!accessRecord) {
      return res.status(404).json({ message: 'Access record not found' });
    }
    res.json(accessRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an Access record
app.put('/api/access/:id', async (req, res) => {
  try {
    const updatedAccess = await Access.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAccess) {
      return res.status(404).json({ message: 'Access record not found' });
    }
    res.json(updatedAccess);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an Access record
app.delete('/api/access/:id', async (req, res) => {
  try {
    const deletedAccess = await Access.findByIdAndDelete(req.params.id);
    if (!deletedAccess) {
      return res.status(404).json({ message: 'Access record not found' });
    }
    res.json({ message: 'Access record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/** MEDICAL RECORD ROUTES **/
// Get all Medical Records
app.get('/api/medicalrecords', async (req, res) => {
  try {
    const medicalRecords = await MedicalRecord.find().populate('patientId', 'name email');
    res.json(medicalRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new Medical Record
app.post('/api/medicalrecords', async (req, res) => {
  try {
    const newRecord = await MedicalRecord.create(req.body);
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a specific Medical Record by ID
app.get('/api/medicalrecords/:id', async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findById(req.params.id).populate('patientId', 'name email');
    if (!medicalRecord) {
      return res.status(404).json({ message: 'Medical record not found' });
    }
    res.json(medicalRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a Medical Record
app.put('/api/medicalrecords/:id', async (req, res) => {
  try {
    const updatedRecord = await MedicalRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecord) {
      return res.status(404).json({ message: 'Medical record not found' });
    }
    res.json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a Medical Record
app.delete('/api/medicalrecords/:id', async (req, res) => {
  try {
    const deletedRecord = await MedicalRecord.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ message: 'Medical record not found' });
    }
    res.json({ message: 'Medical record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
