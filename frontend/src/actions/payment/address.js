const API = "http://localhost:5000/api/addresses";

export const addNewAddress = async (address) => {
    address = JSON.stringify(address);
    try {
        const response = await fetch(`${API}`, {
            method: "POST",
            headers: {
                Accept : "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDA4NmZjZTNhZDExZWE1ZDc4YWE1MCIsImlhdCI6MTY2MjcwMjk5NiwiZXhwIjoxNjYzOTEyNTk2fQ.Z6o6CWRcRI7irUDMpV4VG8pwmzxA_rzMUiT6UzRACMg",
            },
            body: address,
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export const updateAddress = async (address, addressId) => {
    address = JSON.stringify(address);
    console.log(address)
    try {
        const response = await fetch(`${API}/${addressId}`, {
            method: "PUT",
            headers: {
                Accept : "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDA4NmZjZTNhZDExZWE1ZDc4YWE1MCIsImlhdCI6MTY2MjcwMjk5NiwiZXhwIjoxNjYzOTEyNTk2fQ.Z6o6CWRcRI7irUDMpV4VG8pwmzxA_rzMUiT6UzRACMg",
            },
            body: address,
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export const getSingleAddress = async (addressId) => {
    try {
        const response = await fetch(`${API}/${addressId}`, {
            method: "GET",
            headers: {
                Accept : "application/json",
                "Content-Type": "application/json",
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDA4NmZjZTNhZDExZWE1ZDc4YWE1MCIsImlhdCI6MTY2MjcwMjk5NiwiZXhwIjoxNjYzOTEyNTk2fQ.Z6o6CWRcRI7irUDMpV4VG8pwmzxA_rzMUiT6UzRACMg",
            },
        });
        return await response.json();;
    } catch (error) {
        console.log(error);
    }
}

export const getAddresses = async () => {
    try {
        const response = await fetch(`${API}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDA4NmZjZTNhZDExZWE1ZDc4YWE1MCIsImlhdCI6MTY2MjY3MTAwNSwiZXhwIjoxNjYzODgwNjA1fQ.xSpErAxeqKF2MCFYt86-4jyx5RPGpyR4G_PLGNa_RTQ",
            },
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export const deleteAddress = async (addressId) => {
    try {
        const response = await fetch(`${API}/${addressId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDA4NmZjZTNhZDExZWE1ZDc4YWE1MCIsImlhdCI6MTY2MjY3MTAwNSwiZXhwIjoxNjYzODgwNjA1fQ.xSpErAxeqKF2MCFYt86-4jyx5RPGpyR4G_PLGNa_RTQ",
            },
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}