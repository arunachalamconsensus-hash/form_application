
import { useState } from "react";
import "./RegistrationForm.css";

function RegistrationForm() {

  // Initial Form Data
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  };

  // Form Data State
  const [formData, setFormData] = useState(initialFormData);

  // Error State
  const [errors, setErrors] = useState({});

  // Success State
  const [isSubmitted, setIsSubmitted] = useState(false);


  // Handle Input Changes
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
      ...(name === "password" || name === "confirmPassword"
        ? { confirmPassword: "" }
        : {})
    }));

    setIsSubmitted(false);
  };


  // Validation Function
  const validateForm = () => {

    const newErrors = {};

    // First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[a-zA-Z]+(?:[ '-][a-zA-Z]+)*$/.test(formData.firstName.trim())) {
      newErrors.firstName = "Enter a valid first name";
    }

    // Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[a-zA-Z]+(?:[ '-][a-zA-Z]+)*$/.test(formData.lastName.trim())) {
      newErrors.lastName = "Enter a valid last name";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Mobile
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit Indian mobile number";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/.test(formData.password)) {
      newErrors.password = "Include uppercase, lowercase, number and special character";
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Date of Birth
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    } else if (new Date(formData.dob + "T00:00:00") > new Date()) {
      newErrors.dob = "Date of birth cannot be in the future";
    }

    // Gender
    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    // Address
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Address must contain at least 10 characters";
    }

    // City
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    } else if (!/^[a-zA-Z]+(?:[ '-][a-zA-Z]+)*$/.test(formData.city.trim())) {
      newErrors.city = "Enter a valid city name";
    }

    // State
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    } else if (!/^[a-zA-Z]+(?:[ '-][a-zA-Z]+)*$/.test(formData.state.trim())) {
      newErrors.state = "Enter a valid state name";
    }

    // Pincode
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^[1-9][0-9]{5}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit Indian pincode";
    }

    return newErrors;
  };


  // Handle Form Submission
  const handleSubmit = (e) => {

    e.preventDefault();

    const validationErrors = validateForm();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {

      setIsSubmitted(true);

      console.log("Registration Successful:", formData);

    } else {

      setIsSubmitted(false);

    }
  };


  // Handle Reset
  const handleReset = () => {

    setFormData(initialFormData);
    setErrors({});
    setIsSubmitted(false);

  };


  return (

    <div className="registration-container">

      <div className="registration-card">

        {/* Header */}

        <div className="form-header">

          <div className="form-icon">👤</div>

          <p className="form-subtitle">
            CREATE YOUR ACCOUNT
          </p>

          <h1>Registration Form</h1>

          <p className="form-description">
            Please fill in your details to create an account.
          </p>

        </div>


        {/* Success Message */}

        {isSubmitted && (

          <div className="success-message">
            <span>✓</span>
            Registration completed successfully!
          </div>

        )}


        <form onSubmit={handleSubmit} noValidate>

          {/* Personal Information */}

          <div className="form-section-title">
            <h3>Personal Information</h3>
            <span>01</span>
          </div>


          <div className="form-grid">

            {/* First Name */}

            <div className="form-group">

              <label htmlFor="firstName">
                First Name <span>*</span>
              </label>

              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? "input-error" : ""}
              />

              {errors.firstName && (
                <p className="error-message">{errors.firstName}</p>
              )}

            </div>


            {/* Last Name */}

            <div className="form-group">

              <label htmlFor="lastName">
                Last Name <span>*</span>
              </label>

              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? "input-error" : ""}
              />

              {errors.lastName && (
                <p className="error-message">{errors.lastName}</p>
              )}

            </div>


            {/* Email */}

            <div className="form-group">

              <label htmlFor="email">
                Email Address <span>*</span>
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
              />

              {errors.email && (
                <p className="error-message">{errors.email}</p>
              )}

            </div>


            {/* Mobile */}

            <div className="form-group">

              <label htmlFor="mobile">
                Mobile Number <span>*</span>
              </label>

              <input
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="10-digit mobile number"
                maxLength="10"
                value={formData.mobile}
                onChange={handleChange}
                className={errors.mobile ? "input-error" : ""}
              />

              {errors.mobile && (
                <p className="error-message">{errors.mobile}</p>
              )}

            </div>


            {/* Date of Birth */}

            <div className="form-group">

              <label htmlFor="dob">
                Date of Birth <span>*</span>
              </label>

              <input
                type="date"
                id="dob"
                name="dob"
                max={new Date().toLocaleDateString("en-CA")}
                value={formData.dob}
                onChange={handleChange}
                className={errors.dob ? "input-error" : ""}
              />

              {errors.dob && (
                <p className="error-message">{errors.dob}</p>
              )}

            </div>


            {/* Gender */}

            <div className="form-group">

              <label>
                Gender <span>*</span>
              </label>

              <div className="gender-options">

                {["Male", "Female", "Other"].map((gender) => (

                  <label className="radio-label" key={gender}>

                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleChange}
                    />

                    {gender}

                  </label>

                ))}

              </div>

              {errors.gender && (
                <p className="error-message">{errors.gender}</p>
              )}

            </div>

          </div>


          {/* Account Information */}

          <div className="form-section-title">
            <h3>Account Information</h3>
            <span>02</span>
          </div>


          <div className="form-grid">

            {/* Password */}

            <div className="form-group">

              <label htmlFor="password">
                Password <span>*</span>
              </label>

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
              />

              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}

            </div>


            {/* Confirm Password */}

            <div className="form-group">

              <label htmlFor="confirmPassword">
                Confirm Password <span>*</span>
              </label>

              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "input-error" : ""}
              />

              {errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword}</p>
              )}

            </div>

          </div>


          {/* Address Information */}

          <div className="form-section-title">
            <h3>Address Information</h3>
            <span>03</span>
          </div>


          <div className="form-grid">

            {/* Address */}

            <div className="form-group full-width">

              <label htmlFor="address">
                Address <span>*</span>
              </label>

              <textarea
                id="address"
                name="address"
                placeholder="Enter your complete address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? "input-error" : ""}
              />

              {errors.address && (
                <p className="error-message">{errors.address}</p>
              )}

            </div>


            {/* City */}

            <div className="form-group">

              <label htmlFor="city">
                City <span>*</span>
              </label>

              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? "input-error" : ""}
              />

              {errors.city && (
                <p className="error-message">{errors.city}</p>
              )}

            </div>


            {/* State */}

            <div className="form-group">

              <label htmlFor="state">
                State <span>*</span>
              </label>

              <input
                type="text"
                id="state"
                name="state"
                placeholder="Enter state"
                value={formData.state}
                onChange={handleChange}
                className={errors.state ? "input-error" : ""}
              />

              {errors.state && (
                <p className="error-message">{errors.state}</p>
              )}

            </div>


            {/* Pincode */}

            <div className="form-group">

              <label htmlFor="pincode">
                Pincode <span>*</span>
              </label>

              <input
                type="text"
                id="pincode"
                name="pincode"
                placeholder="6-digit pincode"
                maxLength="6"
                value={formData.pincode}
                onChange={handleChange}
                className={errors.pincode ? "input-error" : ""}
              />

              {errors.pincode && (
                <p className="error-message">{errors.pincode}</p>
              )}

            </div>

          </div>


          {/* Buttons */}

          <div className="form-buttons">

            <button type="submit" className="submit-btn">
              Register Now →
            </button>

            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
            >
              ↻ Reset Form
            </button>

          </div>


          <p className="required-note">
            * All fields are mandatory.
          </p>

        </form>

      </div>

    </div>

  );

}

export default RegistrationForm;
