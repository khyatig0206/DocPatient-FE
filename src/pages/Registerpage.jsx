import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
const Register = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        select_role: 'patient',
        profile_picture: null,
        establishment_name: '',
        license_number: '',
        categories: []
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [errors, setErrors] = useState({});
    const [validationErrors, setValidationErrors] = useState({});



    // Handle clicks outside of the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/categories/`);
                setCategories(response.data);
                setFilteredCategories(response.data); 
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        if (query === '') {
            setFilteredCategories(categories);
        } else {
            setFilteredCategories(categories.filter(category =>
                category.name.toLowerCase().includes(query)
            ));
        }
    };

    const handleCategorySelect = (category) => {
        if (!selectedCategories.some(selected => selected.id === category.id)) {
            const updatedSelectedCategories = [...selectedCategories, category];
            setSelectedCategories(updatedSelectedCategories);
            // Update formData.categories as an array of IDs
            setFormData({ ...formData, categories: updatedSelectedCategories.map(c => c.id) });
        }
        setFilteredCategories(categories);
        setSearchQuery(''); // Clear search query after selection
        setIsDropdownOpen(false); // Close dropdown after selection
    };

    // Remove selected category
    const removeCategory = (indexToRemove) => {
        const updatedCategories = selectedCategories.filter((_, index) => index !== indexToRemove);
        const updatedCategoryIds = updatedCategories.map(category => category.id);
        setSelectedCategories(updatedCategories);
        setFormData({ ...formData, categories: updatedCategoryIds });
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        setErrors({});
        setValidationErrors({});
    };

    // Handle profile picture upload
    const handleFileChange = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            var output = document.getElementById('profilePreview');
            output.src = reader.result;
        };
        setFormData({ ...formData, profile_picture: e.target.files[0] });
    };



    // Handle role selection change
    const handleRoleChange = (e) => {
        setFormData({ ...formData, select_role: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        let validationErrors = {};

        // Check if passwords match
        if (formData.password !== formData.confirm_password) {
            validationErrors.password = 'Passwords do not match.';
        }

        // Validate pincode (it should be a number)
        if (formData.pincode && !/^\d+$/.test(formData.pincode)) {
            validationErrors.pincode = 'Pincode must be a number.';
        }

        // Validate email format
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailPattern.test(formData.email)) {
            validationErrors.email = 'Invalid email format.';
        }

        // If there are validation errors, update the error state
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // If no errors, clear the errors state and submit the form
        setErrors({});

        const data = new FormData();
        
        // Append form data
        Object.keys(formData).forEach(key => {
            if (key === 'categories') {
                formData.categories.forEach(cat => data.append('categories', cat)); 
            } else if (key === 'profile_picture' && formData.profile_picture) {

                data.append(key, formData.profile_picture);
            } else if (key !== 'profile_picture') {
                data.append(key, formData[key]);
            }
        });
    
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/register/`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            window.alert("Registration successful!");
            window.location.href = "/"; 
            console.log(response.data);
        } catch (error) {
            if (error.response && error.response.data) {
                setValidationErrors(error.response.data); // Store validation errors
            }
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg mt-4 mb-4 rounded-lg w-full max-w-lg p-6 mx-2 space-y-6">
                <h2 className="text-2xl font-semibold text-center text-mycolor">Sign Up</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                    {/* Profile Picture Upload */}
                    <div className="text-center">
                    <label htmlFor="profile_picture" className="cursor-pointer relative">
                    <img
                    src="/profile-default.png"
                    id="profilePreview"
                    className="w-24 h-24 rounded-lg mx-auto object-cover"
                    alt="Profile Preview"
                    />
                    <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="absolute bottom-1 right-1 bg-white rounded-lg p-1 " // Customize colors and position here
                    style={{ fontSize: '0.8rem' }}
                    />
                </label>
                        <input type="file" id="profile_picture" name="profile_picture" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </div>

                    {/* Personal Details */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        onFocus={() => { setErrors({}); setValidationErrors({}); }} 
                        onChange={handleChange}
                        className="input-field border border-black-500 outline-mycolor p-2 rounded-lg"
                    />
                    {validationErrors.first_name && (
                        <p className="text-red-600 text-sm">{validationErrors.first_name[0]}</p>
                    )}
                    </div>
                    <div>
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        onFocus={() => { setErrors({}); setValidationErrors({}); }} 
                        onChange={handleChange}
                        className="input-field border border-black-500 outline-mycolor p-2 rounded-lg"
                    />
                    {validationErrors.last_name && (
                        <p className="text-red-600 text-sm">{validationErrors.last_name[0]}</p>
                    )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} onFocus={() => { setErrors({}); setValidationErrors({}); }}  className="input-field border border-black-500 outline-mycolor p-2 rounded-lg" />
                    {validationErrors.username && (
                        <p className="text-red-600 text-sm">{validationErrors.username[0]}</p>
                    )}
                    </div>
                    <div>
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} onFocus={() => { setErrors({}); setValidationErrors({}); }}  className="input-field border border-black-500 outline-mycolor p-2 rounded-lg" />
                    {validationErrors.email && (
                        <p className="text-red-600 text-sm">{validationErrors.email[0]}</p>
                    )}
                    </div>
                </div>
                    {/* Password Fields */}
                    <div className="grid grid-cols-2 gap-4"><div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        onFocus={() => { setErrors({}); setValidationErrors({}); }} 
                        className="input-field border border-black-500 outline-mycolor p-2 rounded-lg w-full"
                    />
                    {validationErrors.password && (
                        <p className="text-red-600 text-sm">{validationErrors.password[0]}</p>
                    )}
                </div>
                <div>
                        <input type="password" name="confirm_password" placeholder="Confirm Password" onChange={handleChange} onFocus={() => { setErrors({}); setValidationErrors({}); }}  className="input-field border border-black-500 outline-mycolor p-2 rounded-lg" />
                        {validationErrors.password && (
                        <p className="text-red-600 text-sm">{validationErrors.password[0]}</p>
                    )}
                    </div>
                    </div>

                    {/* Address Fields */}
                    <div>
                    <input type="text" name="address" placeholder="Address" onChange={handleChange} onFocus={() => { setErrors({}); setValidationErrors({}); }}  className="input-field border border-black-500 outline-mycolor p-2 rounded-lg w-full" />
                    {validationErrors.address && (
                        <p className="text-red-600 text-sm">{validationErrors.address[0]}</p>
                    )}
                    </div>
                    <div className="grid grid-cols-3 gap-4 max-w-full">
    <span className="w-full">
        <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            onFocus={() => { setErrors({}); setValidationErrors({}); }} 
            className="input-field border border-black-500 outline-mycolor p-2 rounded-lg w-full"
        />
        {validationErrors.city && (
            <p className="text-red-600 text-sm">{validationErrors.city[0]}</p>
        )}
    </span>
    <span className="w-full">
        <input
            type="text"
            name="state"
            placeholder="State"
            onChange={handleChange}
            onFocus={() => { setErrors({}); setValidationErrors({}); }} 
            className="input-field border border-black-500 outline-mycolor p-2 rounded-lg w-full"
        />
        {validationErrors.state && (
            <p className="text-red-600 text-sm">{validationErrors.state[0]}</p>
        )}
    </span>
    <span className="w-full">
        <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            onChange={handleChange}
            onFocus={() => { setErrors({}); setValidationErrors({}); }} 
            className="input-field border border-black-500 outline-mycolor p-2 rounded-lg w-full"
        />
        {validationErrors.pincode && (
            <p className="text-red-600 text-sm">{validationErrors.pincode[0]}</p>
        )}
    </span>
</div>


                    {/* Role Selection */}
                    <div className="flex justify-around mt-4">
                        <label className="flex items-center space-x-2">
                            <input type="radio" name="select_role" value="patient" defaultChecked onChange={handleRoleChange} className="radio" />
                            <span>Patient</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="radio" name="select_role" value="doctor" onChange={handleRoleChange} className="radio" />
                            <span>Doctor</span>
                        </label>
                    </div>

                    {/* Doctor-specific fields */}
                    {formData.select_role === 'doctor' && (
                        <>
                            {/* Search and Select Categories */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Select Categories</label>
                                {loading ? (
                                    <p>Loading categories...</p>
                                ) : (
                                    <>
                                        {/* Search Input */}
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onFocus={() => setIsDropdownOpen(true)}
                                            onChange={handleSearchChange}
                                            placeholder="Enter category"
                                            className="input-field border border-black-500 outline-mycolor p-2 rounded-lg w-full"
                                        />

                                        {isDropdownOpen && (
                                            <div className="relative" ref={dropdownRef}>
                                                <ul className="absolute bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto w-full">
                                                    {filteredCategories.map(category => (
                                                        <li
                                                            key={category.id}
                                                            onClick={() => handleCategorySelect(category)}
                                                            className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                                                        >
                                                            {category.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Display selected categories */}
                            <div className="flex flex-wrap mb-2 mt-2">
                                {selectedCategories.map((category, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center bg-buttoncolor px-3 py-1 m-1 text-sm font-semibold bg-lightGreen text-middleGreen rounded-full shadow-sm"
                                    >
                                        {category.name}
                                        <button
                                            type="button"
                                            onClick={() => removeCategory(index)}
                                            className="ml-2 text-red-600 hover:text-red-900"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                            {/* Establishment Name */}
                            <input
                                type="text"
                                name="establishment_name"
                                placeholder="Establishment Name"
                                onChange={handleChange}
                                className="input-field border border-black-500 outline-mycolor p-2 rounded-lg"
                            />

                            {/* License Number */}
                            <input
                                type="text"
                                name="license_number"
                                placeholder="License Number"
                                onChange={handleChange}
                                className="input-field border border-black-500 outline-mycolor p-2 rounded-lg"
                            />
                            </div>
                        </>
                    )}
                    {/* Display errors */}
                    {Object.keys(errors).length > 0 && (
                        <div className="text-red-500 text-sm ">
                            {Object.values(errors).map((error, index) => (
                                <p key={index} className='rounded-lg bg-red-50 p-1'>{error}</p>
                            ))}
                        </div>
                    )}
                    {/* Submit button */}
                    <button type="submit" className="w-full py-2 bg-mycolor text-white rounded-lg hover:bg-buttoncolor2">
                        Register
                       
                    </button>
                </form>

                <p className="text-center text-sm">
                    Already have an account? <a href="/login" className="text-mycolor hover:underline">Sign in</a>
                </p>
            </div>
        </section>
    );
};

export default Register;
