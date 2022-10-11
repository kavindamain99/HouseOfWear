import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { updateAddress, getSingleAddress } from "../../actions/payment/address";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Swal from 'sweetalert2';
import Alert from '@mui/material/Alert';

const UpdateAddress = () => {
    const { id } = useParams();

    const [updatingAddress, setAddress] = useState({
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
    } = updatingAddress;

    const [error, setError] = useState("");

    const provinces = ["Western Province", "Central Province"];
    const districts = ["Kandy", "Matale", "Colombo", "Gampaha", "Kalutara"];
    const cities = ["Kandy", "Matale", "Gampola", "Colombo", "Kaduwela", "Gampaha", "Kalutara"];
    
    const handleChange = name => event => {
        const value = event.target.value;
        if(name === "defaultShippingAddress" || name === "defaultBillingAddress") {
            setAddress({ ...updatingAddress, [name]: event.target.checked });
        } else {
            setAddress({ ...updatingAddress, [name]: value });
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title : "Are you sure?",
            icon : "warning",
            showCancelButton : true,
            confirmButtonText : "Update",
            confirmButtonColor : "#df4759"
        }).then((result) => {
            if(result.isConfirmed) {
                updateAddress(updatingAddress, id)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setError("");
                        Swal.fire({
                            title : "Successfully updated",
                            icon : "success",
                            confirmButtonColor : "#df4759"
                        }).then(() => {
                            window.location.href = "/addresses";
                        });
                    }
                });
            }
        })
        /* updateAddress(updatingAddress, id)
            .then((data) => {
                console.log(data)
                if (data.error) {
                    console.log(data.error)
                    setError(data.error);
                } else {
                    setError("");
                    //window.location.href = "/addresses";
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

    const loadAddress = (addressId) => {
        getSingleAddress(addressId)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setError("");
                    setAddress(data);
                }
            })
            .catch((err) => {
                setError(err);
            }
        );
    };

    useEffect(() => {
        loadAddress(id);
    }, [id]);

    const updateForm = () => (
        <div className="update-address mt-3">
            <h1 style={{ textAlign : "center" }}>UPDATE ADDRESS</h1>
            <hr className="mt-4" style={{ width : "50%", margin : "auto" }}/>
            <div className="container mt-3" style={{ margin : "auto", width : "50%" }}>
                <form className="needs-validation" noValidate onSubmit={ handleSubmit } style={{ margin : "auto", width : "60%"}}>
                    <div className="row mt-3">
                        <div className="form-group">
                            <label className="text-muted">Name</label>
                            <input
                                onChange={ handleChange("name") }
                                type="text"
                                className="form-control"
                                value={ name }
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a name
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="form-group">
                            <label className="text-muted">Mobile Number</label>
                            <input
                                onChange={ handleChange("mobileNumber") }
                                type="text"
                                className="form-control"
                                value={ mobileNumber }
                                min="10"
                                max="10"
                                title="Error message" pattern="[0-9]{10}"
                            />
                            <div className="invalid-feedback">
                                Please provide a valid mobile number
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="form-group">
                            <label className="text-muted">Province</label>
                            <select id="province" className="form-control" onChange={ handleChange("province") } required>
                                <option selected value={ province }>{ province }</option>
                                <option value="Central">Central</option>
                                <option value="Western">Western</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="form-group">
                            <label className="text-muted">District</label>
                            <select id="district" className="form-control" onChange={ handleChange("district") } required>
                                <option selected value={ district }>{ district }</option>
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
                            <label className="text-muted">City</label>
                            <select id="city" className="form-control" onChange={ handleChange("city") } required>
                                <option selected value={ city }>{ city }</option>
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
                            <label className="text-muted">Address</label>
                            <input
                                onChange={ handleChange("address") }
                                type="text"
                                className="form-control"
                                value={ address }
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide an address
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="form-check">
                            <input
                                onChange={ handleChange("defaultShippingAddress") }
                                type="checkbox"
                                className="form-check-input"
                                id="defaultShippingAddress"
                                checked={ defaultShippingAddress }
                                style={{ border : "2px solid black", accentColor : "red" }}
                            />
                            <label htmlFor="defaultShippingAddress" className="form-checkbox-label">Default Shipping Address</label>
                            
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="form-check">
                            <input
                                onChange={ handleChange("defaultBillingAddress") }
                                type="checkbox"
                                className="form-check-input"
                                id="defaultBillingAddress"
                                checked={ defaultBillingAddress }
                                style={{ border : "2px solid black" }}
                            />
                            <label htmlFor="defaultBillingAddress" className="form-checkbox-label">Default Billing Address</label>
                        </div>
                    </div>
                    <button className="btn btn-dark btn-lg mt-4 mb-5" style={{ fontSize : "15px", width : "100%", borderRadius : "0px" }}>
                        UPDATE ADDRESS
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
            { updateForm() }
        </div>
    )
};

export default UpdateAddress;