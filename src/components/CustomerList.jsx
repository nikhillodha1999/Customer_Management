import React from 'react';

// CustomerList component that takes in three props: customers, deleteCustomer, and editCustomer
const CustomerList = ({ customers, deleteCustomer, editCustomer }) => {
    return (
        <div>
            <h2>Customer List</h2>
            {/* Check if there are customers in the list */}
            {customers.length > 0 ? (
                // Map through the customers array and display each customer's name with Edit and Delete buttons
                customers.map((customer, index) => (
                    <div key={index}>
                        <p>{customer.fullName}</p>
                        <button onClick={() => editCustomer(index)}>Edit</button>
                        <button onClick={() => deleteCustomer(index)}>Delete</button>
                    </div>
                ))
            ) : (
                // Display a message if no customers are available
                <p>No customers available.</p>
            )}
        </div>
    );
};

export default CustomerList;
