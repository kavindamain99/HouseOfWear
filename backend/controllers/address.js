import Address from '../models/address.js';
import asyncHandler from 'express-async-handler';

const insertAddress = asyncHandler(async (req, res) => {
    console.log(454525453435)
    const userId = req.user._id;
    const { name, mobileNumber, province, district, city, address, defaultShippingAddress, defaultBillingAddress } = req.body;
    const user = await Address.findOne({ userId: userId });
    if (user) {
        if(defaultShippingAddress === true) {
            user.addresses.forEach(entry => {
                entry.defaultShippingAddress = false;
            });
        }
        if(defaultBillingAddress === true) {
            user.addresses.forEach(entry => {
                entry.defaultBillingAddress = false;
            });
        }
        const newAddress = {
            addressId : user.addresses.length + 1,
            name,
            mobileNumber,
            province,
            district,
            city,
            address,
            defaultShippingAddress,
            defaultBillingAddress
        };

        user.addresses.push(newAddress);
        await user.save();
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
        res.status(201).json({ message: 'Address added successfully' });
    } else {
        const newAddress = {
            userId,
            addresses: [{
                addressId : 1,
                name,
                mobileNumber,
                province,
                district,
                city,
                address,
                defaultShippingAddress,
                defaultBillingAddress
            }]
        };
        const firstAddress = new Address(newAddress);
        await firstAddress.save();
        res.status(201).json({ message: 'Address added successfully' });
    }
});

const getSingleAddress = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const addressId = req.params.id;
    const user = await Address.findOne({ userId: userId });
    if (user) {
        const address = user.addresses.find(entry => entry.addressId === parseInt(addressId));
        if(address) {
            res.status(200).json(address);
        } else {
            res.status(404);
            throw new Error('Address not found');
        }
    } else {
        res.status(404);
        throw new Error('Address not found');
    }
});

const getAllAddresses = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await Address.findOne({ userId: userId });
    if (user) {
        res.status(200).json(user.addresses);
    } else {
        res.status(404);
        throw new Error('Address not found');
    }
});

const updateAddress = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const addressId = req.params.id;
    const { name, mobileNumber, province, district, city, address, defaultShippingAddress, defaultBillingAddress } = req.body;
    const user = await Address.findOne({ userId: userId });
    if (user) {
        if(user.addresses.find(entry => entry.addressId === parseInt(addressId))) {
            if(defaultShippingAddress === true) {
                user.addresses.forEach(entry => {
                    entry.defaultShippingAddress = false;
                });
            }
            if(defaultBillingAddress === true) {
                user.addresses.forEach(entry => {
                    entry.defaultBillingAddress = false;
                });
            }
            user.addresses.find(entry => entry.addressId === parseInt(addressId))
                .set({ 
                    addressId : addressId,
                    name,
                    mobileNumber,
                    province,
                    district,
                    city,
                    address,
                    defaultShippingAddress,
                    defaultBillingAddress 
                });
            await user.save();
            res.status(200).json({ message: 'Address updated successfully' });
        } else {
            res.status(404);
            throw new Error('Address not found');
        }
    } else {
        res.status(404);
        throw new Error('Address not found');
    }
});

const deleteAddress = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const addressId = req.params.id;
    const user = await Address.findOne({ userId: userId });
    if (user) {
        const deletingAddress = user.addresses.find(entry => entry.addressId === parseInt(addressId));
        if(deletingAddress) {
            user.addresses = user.addresses.filter(entry => entry.addressId !== parseInt(addressId));
            await user.save();
            res.status(200).json({ message: 'Address deleted successfully' });
        } else {
            res.status(404);
            throw new Error('Address not found');
        }
    } else {
        res.status(404);
        throw new Error('Address not found');
    }
});

export {
    insertAddress,
    getSingleAddress,
    getAllAddresses,
    updateAddress,
    deleteAddress,
}