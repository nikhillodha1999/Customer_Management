import React, { useState, useEffect } from 'react';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import './App.css';

const App = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem('customers'));
    if (storedCustomers) {
      setCustomers(storedCustomers);
    }
  }, []);

  const addCustomer = (customer) => {
    const updatedCustomers = [...customers, customer];
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
  };

  const deleteCustomer = (index) => {
    const updatedCustomers = customers.filter((_, i) => i !== index);
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
  };

  const editCustomer = (index) => {
    // Logic to edit customer
  };

  return (
    <div className="app-container">
      <h1>Customer Management</h1>
      <CustomerForm addCustomer={addCustomer} />
      <CustomerList customers={customers} deleteCustomer={deleteCustomer} editCustomer={editCustomer} />
    </div>
  );
};

export default App;
