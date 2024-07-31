import React, { useState } from 'react';
import axios from 'axios';

const CustomerForm = ({ addCustomer }) => {
    // Initialize form data state with default values
    const [formData, setFormData] = useState({
        pan: '',
        fullName: '',
        email: '',
        mobile: '',
        addresses: [{ line1: '', line2: '', postcode: '', city: '', state: '' }]
    });

    // Handle input change for form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle input change for address fields
    const handleAddressChange = (index, e) => {
        const { name, value } = e.target;
        const addresses = [...formData.addresses];
        addresses[index][name] = value;
        setFormData({ ...formData, addresses });
    };

    // Verify PAN number with an API call
    const verifyPAN = async (pan) => {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!panRegex.test(pan)) {
            alert('Invalid PAN format');
            return;
        }
        try {
            const response = await axios.post('https://lab.pixel6.co/api/verify-pan.php', { panNumber: pan });
            if (response.data.isValid) {
                setFormData({ ...formData, fullName: response.data.fullName });
            }
        } catch (error) {
            console.error('Error verifying PAN', error);
        }
    };

    // Get city and state details based on postcode with an API call
    const getPostcodeDetails = async (postcode, index) => {
        try {
            const response = await axios.post('https://lab.pixel6.co/api/get-postcode-details.php', { postcode });
            if (response.data.status === 'Success') {
                const addresses = [...formData.addresses];
                addresses[index].city = response.data.city[0].name;
                addresses[index].state = response.data.state[0].name;
                setFormData({ ...formData, addresses });
            }
        } catch (error) {
            console.error('Error getting postcode details', error);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add validation logic if necessary
        addCustomer(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='main-form'>
                <div>
                    {/* PAN input field */}
                    <div className='row'>
                        <label>PAN:</label>
                        <input type="text" name="pan" value={formData.pan} onChange={handleChange} onBlur={() => verifyPAN(formData.pan)} required />
                    </div>

                    {/* Full Name input field */}
                    <div className='row'>
                        <label>Full Name:</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                    </div>

                    {/* Email input field */}
                    <div className='row'>
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    {/* Mobile input field */}
                    <div className='row'>
                        <label>Mobile:</label>
                        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
                    </div>

                    <br />

                    {/* Address fields */}
                    {formData.addresses.map((address, index) => (
                        <div key={index}>
                            <div className='row'>
                                <label>Address Line 1:</label>
                                <input type="text" name="line1" value={address.line1} onChange={(e) => handleAddressChange(index, e)} required />
                            </div>
                            <div className='row'>
                                <label>Address Line 2:</label>
                                <input type="text" name="line2" value={address.line2} onChange={(e) => handleAddressChange(index, e)} />
                            </div>
                            <div className='row'>
                                <label>Postcode:</label>
                                <input type="text" name="postcode" value={address.postcode} onChange={(e) => handleAddressChange(index, e)} onBlur={() => getPostcodeDetails(address.postcode, index)} required />
                            </div>
                            <div className='row'>
                                <label>City:</label>
                                <input type="text" name="city" value={address.city} onChange={(e) => handleAddressChange(index, e)} required readOnly />
                            </div>
                            <div className='row'>
                                <label>State:</label>
                                <input type="text" name="state" value={address.state} onChange={(e) => handleAddressChange(index, e)} required readOnly />
                            </div>
                        </div>
                    ))}

                    <br />

                    {/* Submit button */}
                    <button className='submit' type="submit">Submit</button>
                </div>
            </div>
        </form>
    );
};

export default CustomerForm;
