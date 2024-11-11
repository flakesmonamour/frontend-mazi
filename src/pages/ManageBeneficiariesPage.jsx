import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageBeneficiariesPage = () => {
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [description, setDescription] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [dateSent, setDateSent] = useState('');
  const [status, setStatus] = useState('');
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState(null); // Track errors

  // Fetch beneficiaries and inventory data
  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const response = await axios.get('/api/beneficiaries');
        console.log('Fetched beneficiaries:', response.data);

        if (Array.isArray(response.data)) {
          setBeneficiaries(response.data);
        } else {
          console.error('Expected array but got:', response.data);
          setError('Failed to fetch beneficiaries');
        }
      } catch (error) {
        console.error('Error fetching beneficiaries:', error);
        setError('Failed to fetch beneficiaries');
      }
    };

    const fetchInventory = async () => {
      try {
        const response = await axios.get('/api/inventory');
        console.log('Fetched inventory:', response.data);

        if (Array.isArray(response.data)) {
          setInventory(response.data);
        } else {
          console.error('Expected array but got:', response.data);
          setError('Failed to fetch inventory');
        }
      } catch (error) {
        console.error('Error fetching inventory:', error);
        setError('Failed to fetch inventory');
      }
    };

    fetchBeneficiaries();
    fetchInventory();
  }, []);

  const handleBeneficiarySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/beneficiaries', {
        name: beneficiaryName,
        description,
      });
      console.log('Beneficiary added:', response.data);
      setStatus('Beneficiary added successfully!');
      setBeneficiaryName('');
      setDescription('');
      await fetchBeneficiaries(); // Refresh beneficiaries list
    } catch (error) {
      console.error('Error adding beneficiary:', error);
      setStatus('Error adding beneficiary');
    }
  };

  const handleInventorySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/inventory', {
        item_name: itemName,
        quantity,
        date_sent: dateSent,
      });
      console.log('Inventory item added:', response.data);
      setStatus('Inventory item added successfully!');
      setItemName('');
      setQuantity('');
      setDateSent('');
      await fetchInventory(); // Refresh inventory list
    } catch (error) {
      console.error('Error adding inventory item:', error);
      setStatus('Error adding inventory item');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 via-green-300 to-green-500 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Manage Beneficiaries and Inventory</h2>

        {error && <p className="text-center text-red-600 font-semibold">{error}</p>} {/* Display errors */}
        
        <h3 className="text-2xl font-semibold text-green-600 mb-4">Add Beneficiary</h3>
        <form onSubmit={handleBeneficiarySubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={beneficiaryName}
              onChange={(e) => setBeneficiaryName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold text-lg rounded-md hover:bg-green-700 transition duration-200"
          >
            Add Beneficiary
          </button>
        </form>

        <h3 className="text-2xl font-semibold text-green-600 mt-8 mb-4">Add Inventory Item</h3>
        <form onSubmit={handleInventorySubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">Item Name</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Date Sent</label>
            <input
              type="date"
              value={dateSent}
              onChange={(e) => setDateSent(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold text-lg rounded-md hover:bg-green-700 transition duration-200"
          >
            Add Inventory Item
          </button>
        </form>

        {status && <p className="mt-4 text-center font-semibold text-green-600">{status}</p>}

        <h3 className="text-2xl font-semibold text-green-600 mt-12 mb-4">Beneficiaries List</h3>
        <ul className="space-y-4">
          {beneficiaries.length > 0 ? (
            beneficiaries.map((beneficiary) => (
              <li key={beneficiary.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <strong className="text-xl text-green-600">{beneficiary.name}</strong>
                <p className="text-gray-700 mt-2">{beneficiary.description}</p>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-600">No beneficiaries available.</p>
          )}
        </ul>

        <h3 className="text-2xl font-semibold text-green-600 mt-12 mb-4">Inventory List</h3>
        <ul className="space-y-4">
          {inventory.length > 0 ? (
            inventory.map((item) => (
              <li key={item.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <strong className="text-xl text-green-600">{item.item_name}</strong>
                <p className="text-gray-700">Quantity: {item.quantity}</p>
                <p className="text-gray-700">Date Sent: {item.date_sent}</p>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-600">No inventory items available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ManageBeneficiariesPage;
