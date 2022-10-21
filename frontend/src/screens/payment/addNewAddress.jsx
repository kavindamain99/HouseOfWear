import React, { useState } from "react";
import { addNewAddress } from "../../actions/payment/address";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2';

const AddNewAddress = () => {
    const [newAddress, setAddress] = useState({
        name: "",
        mobileNumber: "",
        province: "",
        district: "",
        city: "",
        address: "",
        defaultShippingAddress: false,
        defaultBillingAddress: false,
    });
    
    const {
        name,
        mobileNumber,
        province,
        district,
        city,
        address,
        defaultShippingAddress,
        defaultBillingAddress,
    } = newAddress;

    const [error, setError] = useState("");
    
    const handleChange = name => event => {
        const value = event.target.value;
        if(name === "defaultShippingAddress" || name === "defaultBillingAddress") {
            setAddress({ ...newAddress, [name]: event.target.checked });
        } else {
            setAddress({ ...newAddress, [name]: value });
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addNewAddress(newAddress)
        .then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setError("");
                Swal.fire({
                    title : "Successfully added",
                    icon : "success",
                    showConfirmButton : false,
                    timer : 1500
                }).then(() => {
                    window.location.href = "/addresses";
                })
            }
        })
        .catch((err) => {
            setError(err);
        });
        /* addNewAddress(newAddress)
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                    setError(data.error);
                } else {
                    setError("");
                    window.location.href = "/addresses";
                }
            })
            .catch((err) => {
                setError(err);
            }
        ); */
    };

    const showError = () => (
        <Alert severity="error" style={{ display : error ? '' : 'none', margin : "auto", width : "40%" }}>{error}</Alert>
    );

    const addressForm = () => (
        <div className="add-new-address mt-3">
            <h1 style={{ textAlign : "center" }}>ADD NEW ADDRESS</h1>
            <hr className="mt-4" style={{ width : "50%", margin : "auto" }}/>
            <div className="container mt-5" style={{ margin : "auto", width : "50%" }}>
                <form className="needs-validation" noValidate onSubmit={ handleSubmit } style={{ margin : "auto", width : "60%"}}>
                    <div className="row mt-3">
                        <div className="form-group">
                            <input type="text" className="form-control" id="fullName" placeholder="Full Name" onChange={ handleChange("name") } value={ name } required/>
                            <div className="invalid-feedback">
                                Please provide full name
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="form-group">
                            <input type="text" title="Error Message" pattern="[0-9]{10}" className="form-control" id="mobileNumber" placeholder="Mobile Number" min="10" max="10" onChange={ handleChange("mobileNumber") } value={ mobileNumber } required/>
                            <div className="invalid-feedback">
                                Please provide a valid mobile number
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="form-group">
                            <select id="province" className="form-control" onChange={ handleChange("province") } required>
                                <option selected disabled value="none">Province</option>
                                <option value="Central">Central</option>
                                <option value="Western">Western</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="form-group">
                            <select id="district" className="form-control" onChange={ handleChange("district") } required>
                                <option selected disabled value="none">District</option>
                                <option value="Kandy">Kandy</option>
                                <option value="Matale">Matale</option>
                                <option value="Nuwara Eliya">Nuwara Eliya</option>
                                <option value="Colombo">Colombo</option>
                                <option value="Gampaha">Gampaha</option>
                                <option value="Kalutara">Kalutara</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="form-group">
                            <select id="city" className="form-control" onChange={ handleChange("city") } required>
                                <option selected disabled value="none">City</option>
                                <option value="Kandy">Kandy</option>
                                <option value="Peradeniya">Peradeniya</option>
                                <option value="Gampola">Gampola</option>
                                <option value="Colombo">Colombo</option>
                                <option value="Malabe">Malabe</option>
                                <option value="Kaduwela">Kaduwela</option>
                                <option value="Gampaha">Gampaha</option>
                                <option value="Kalutara">Kalutara</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="form-group">
                            <input type="text" className="form-control" id="address" placeholder="Address" onChange={ handleChange("address") } value={ address } required/>
                            <div className="invalid-feedback">
                                Please provide an address
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="defaultShippingAddress" style={{ border : "2px solid black" }} onChange={ handleChange("defaultShippingAddress") }/>
                                <label htmlFor="defaultShippingAddress" className="form-checkbox-label">Make default shipping address</label>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="defaultBillingAddress" style={{ border : "2px solid black" }} onChange={ handleChange("defaultBillingAddress") }/>
                                <label htmlFor="defaultBillingAddress" className="form-checkbox-label">Make default billing address</label>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-dark btn-lg mt-4 mb-4" type="submit" style={{ fontSize : "15px", width : "100%", borderRadius : "0px" }}>
                        SAVE ADDRESS
                    </button>
                </form>
            </div>
        </div>
    );

    (function () {
        'use strict'
        
        let forms = document.querySelectorAll('.needs-validation')
      
        Array.prototype.slice.call(forms)
          .forEach(function (form) {
            form.addEventListener('submit', function (event) {
              if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
                setError("All fields must be correctly filled");
              }
      
              form.classList.add('was-validated')
            }, false)
          })
    })();
    
    return (
        <div>
            <Link
                to="/addresses"
                className="mt-5"
                style={{
                    textDecoration : "none",
                    color : "black",
                    marginTop : "50%",
                    marginLeft : "5%",
                    fontSize : "20px",
                }}>
                <ArrowBackIosNewIcon />
                Go Back
            </Link>
            { showError() }
            { addressForm() }
        </div>
    );
}

export default AddNewAddress;