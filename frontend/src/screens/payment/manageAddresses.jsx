import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAddresses, deleteAddress } from "../../actions/payment/address";
import DeleteIcon from '@mui/icons-material/Delete';
import TuneIcon from '@mui/icons-material/Tune';
import Swal from 'sweetalert2';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';

const ManageAddresses = () => {
    const [addresses, setAddresses] = useState([]);
    const [error, setError] = useState("");

    const loadAddresses = () => {
        getAddresses()
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setError("");
                    setAddresses(data);
                }
            })
            .catch((err) => {
                setError(err);
            }
        );
    };

    useEffect(() => {
        loadAddresses();
    }, []);

    const removeAddress = (addressId) => {
        Swal.fire({
            title : "Are you sure?",
            icon : "warning",
            showCancelButton : true,
            confirmButtonText : "Delete",
            confirmButtonColor : "#df4759"
        }).then((result) => {
            if(result.isConfirmed) {
                deleteAddress(addressId)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setError("");
                        Swal.fire({
                            title : "Successfully deleted",
                            icon : "success",
                            confirmButtonText : "OK",
                            confirmButtonColor : "#df4759"
                        }).then((result) => {
                            if(result.isConfirmed) {
                                loadAddresses();
                            }
                        });
                    }
                })
                .catch((err) => {
                    setError(err);
                });
            }
        });
    };

        /* deleteAddress(addressId)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setError("");
                    loadAddresses();
                }
            })
            .catch((err) => {
                setError(err);
                loadAddresses();
            }
        ); */

    const showError = () => (
        <Alert severity="error" style={{ display : error ? '' : 'none', margin : "auto", width : "40%" }}>{error}</Alert>
    );

    return (
        <div className="container mt-5" style={{ margin : "auto", width : "100%" }}>
            <div className="row">
                <div className="col-md-4 offset-md-4" style={{ fontFamily : "sans-serif", fontWeight : "bold" }}>
                    {showError()}
                    <Link to="/address">
                        <button className="btn btn-dark btn-lg" style={{ fontSize : "15px", width : "100%", height : "70px", borderRadius : "0px" }} onClick="document.location.href='address'">+ ADD NEW ADDRESS</button>
                    </Link>
                    <ul className="list-group">
                        {addresses.map((address, index) => (
                            <li key={index} className="list-group-item">
                                <div className="row">
                                    <div className="col-md-8">
                                        <p className="text-left">{address.name}</p>
                                        <p className="text-left">{address.mobileNumber}</p>
                                        <p className="text-left">{address.address.split(",").map((line, index) => (
                                            <span key={index}>{line}<br/></span>
                                        ))}
                                        </p>                               
                                        {address.defaultShippingAddress && (
                                            <p className="text-left" style={{ color : "#32a8a8" }}>Default Shipping Address</p>
                                        )}

                                        {address.defaultBillingAddress && (
                                            <p className="text-left" style={{ color : "#32a8a8" }}>Default Billing Address</p>
                                        )}
                                    </div>
                                    <div className="col-md-4">
                                        <Link to={`/address/${address.addressId}`}>
                                            <button className="btn" ><TuneIcon /></button>
                                        </Link>
                                        <IconButton onClick={() => removeAddress(address.addressId)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ManageAddresses;