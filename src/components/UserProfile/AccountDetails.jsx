import { useState, useEffect } from "react";

import axiosInstance from "../../APIs/config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faPenToSquare,
    faPlus,
    faTrashCan,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

import styles from "../../styles/userProfile/accountDetails.module.css";

const AccountDetails = () => {
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        addresses: [],
        phoneNumbers: [],
    });

    const [newDetails, setNewDetails] = useState({
        firstName: "",
        lastName: "",
        addresses: [],
        phoneNumbers: [],
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        phoneNumbers: [],
        addresses: [],
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        axiosInstance
            .get("/user", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setUserDetails(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleEdit = () => {
        setNewDetails(JSON.parse(JSON.stringify(userDetails)));
        setErrors({
            firstName: "",
            lastName: "",
            phoneNumbers: [],
            addresses: [],
        });
        setIsEditing(true);
    };

    const handelCancel = () => {
        setNewDetails(JSON.parse(JSON.stringify(userDetails)));
        setErrors({
            firstName: "",
            lastName: "",
            phoneNumbers: [],
            addresses: [],
        });
        setIsEditing(false);
    };

    const handleNameChange = (e, field) => {
        const { value } = e.target;
        if (value === "") {
            setErrors({ ...errors, [field]: `${field} must not be empty` });
        } else if (value.trim() === "") {
            setErrors({ ...errors, [field]: `${field} shouldn't have any leading spaces` });
        } else if (value.length < 3) {
            setErrors({ ...errors, [field]: `${field} must be at least 3 characters` });
        } else if (!/^[a-zA-Z+]+$/.test(value)) {
            setErrors({ ...errors, [field]: `${field} can only contain letters` });
        } else {
            setErrors({ ...errors, [field]: "" });
        }
        setNewDetails({ ...newDetails, [field]: value });
    };

    const handleAddressChange = (e, field, index) => {
        const { value } = e.target;
        const addresses = [...newDetails.addresses];
        addresses[index][field] = value;

        const errorsAddresses = [...errors.addresses];
        errorsAddresses[index] = errorsAddresses[index] ? errorsAddresses[index] : {};
        if (value === "" || value.trim() === "") {
            errorsAddresses[index][field] = `Address ${index + 1}: ${field} must not be empty`;
        } else {
            errorsAddresses[index][field] = "";
        }
        setErrors({ ...errors, addresses: [...errorsAddresses] });
        setNewDetails({ ...newDetails, addresses });
    };

    const handlePhoneChange = (e, index) => {
        const { value } = e.target;
        const phoneNumbers = [...newDetails.phoneNumbers];
        phoneNumbers[index] = value;
        const errorPhoneNumbers = [...errors.phoneNumbers];
        if (value === "" || value.trim() === "") {
            errorPhoneNumbers[index] = `Phone Number ${index + 1}: Number must not be empty`;
        } else if (!/^\+20\d{10}$/.test(value)) {
            errorPhoneNumbers[index] = `Phone Number ${
                index + 1
            }: Number must starts with (+20) and 10 digits`;
        } else {
            errorPhoneNumbers[index] = "";
        }
        setErrors({ ...errors, phoneNumbers: [...errorPhoneNumbers] });
        setNewDetails({ ...newDetails, phoneNumbers });
    };

    const handleAddAddress = () => {
        if (isEditing === false) setIsEditing(true);
        const errorsAddresses = [...errors.addresses];
        errorsAddresses[newDetails.addresses.length] = {
            governorate: `Address ${
                newDetails.addresses.length + 1
            }: governorate must not be empty`,
            city: `Address ${newDetails.addresses.length + 1}: city must not be empty`,
            street: `Address ${newDetails.addresses.length + 1}: street must not be empty`,
        };
        setErrors({
            ...errors,
            addresses: [...errorsAddresses],
        });
        setNewDetails({
            ...newDetails,
            addresses: [...newDetails.addresses, { city: "", street: "", governorate: "" }],
        });
    };

    const handleAddPhoneNumber = () => {
        const errorsPhoneNumbers = [...errors.phoneNumbers];
        errorsPhoneNumbers[newDetails.phoneNumbers.length] = `Phone Number ${
            newDetails.phoneNumbers.length + 1
        }: Number must not be empty`;
        setErrors({
            ...errors,
            phoneNumbers: [...errorsPhoneNumbers],
        });
        setNewDetails({
            ...newDetails,
            phoneNumbers: [...newDetails.phoneNumbers, ""],
        });
    };

    const handleAddressDelete = (index) => {
        const addresses = newDetails.addresses.filter((_, i) => i !== index);
        let errorAddresses = [...errors.addresses];
        errorAddresses = errorAddresses
            .filter((_, i) => i !== index)
            .map((obj, index) => {
                const result = {};
                if (obj) {
                    if (obj.governorate)
                        result.governorate = `Address ${index + 1}: governorate must not be empty`;
                    if (obj.city) result.city = `Address ${index + 1}: city must not be empty`;
                    if (obj.street)
                        result.street = `Address ${index + 1}: street must not be empty`;
                    return result;
                } else return obj;
            });
        setErrors({ ...errors, addresses: [...errorAddresses] });
        setNewDetails({ ...newDetails, addresses });
    };

    const handlePhoneDelete = (index) => {
        const phoneNumbers = newDetails.phoneNumbers.filter((_, i) => i !== index);
        let errorPhoneNumbers = [...errors.phoneNumbers];
        errorPhoneNumbers = errorPhoneNumbers
            .filter((_, i) => i !== index)
            .map((msg, index) => {
                if (msg) {
                    if (msg.includes("+20"))
                        return `Phone Number ${
                            index + 1
                        }: Number must starts with (+20) and 10 digits`;
                    return `Phone Number ${index + 1}: Number must not be empty`;
                } else return msg;
            });
        setErrors({ ...errors, phoneNumbers: [...errorPhoneNumbers] });
        setNewDetails({ ...newDetails, phoneNumbers });
    };

    const handleSave = (e) => {
        if (
            errors.firstName ||
            errors.lastName ||
            errors.addresses.some((addr) => addr?.governorate || addr?.city || addr?.street) ||
            errors.phoneNumbers.some((phone) => phone)
        ) {
            window.scrollTo(0, 0);
            e.preventDefault();
            return;
        }
        axiosInstance
            .patch(`/user/${userDetails._id}`, newDetails, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then(() => {
                setUserDetails(JSON.parse(JSON.stringify(newDetails)));
                setIsEditing(false);
            })
            .catch((error) => console.log(error));
    };
    return (
        <>
            {errors.firstName ||
            errors.lastName ||
            errors.addresses.some((addr) => addr?.governorate || addr?.city || addr?.street) ||
            errors.phoneNumbers.some((phone) => phone) ? (
                <div
                    className={`${styles["main-field"]} alert fade show`}
                    role="alert"
                    style={{ backgroundColor: "var(--clr-accent-500)" }}
                >
                    <ul className="m-0">
                        {errors.firstName && <li>{errors.firstName}</li>}
                        {errors.lastName && <li>{errors.lastName}</li>}
                        {errors.phoneNumbers?.map((errorMsg) => {
                            return (
                                errorMsg && (
                                    <li
                                        key={"phone-" + Date.now() + Math.random() * 100}
                                    >{`${errorMsg}`}</li>
                                )
                            );
                        })}
                        {errors.addresses?.map((obj) => {
                            return (
                                <>
                                    {obj?.governorate && (
                                        <li
                                            key={"governorate-" + Date.now() + Math.random() * 100}
                                        >{`${obj?.governorate}`}</li>
                                    )}
                                    {obj?.city && (
                                        <li
                                            key={"city-" + Date.now() + Math.random() * 100}
                                        >{`${obj?.city}`}</li>
                                    )}
                                    {obj?.street && (
                                        <li
                                            key={"street-" + Date.now() + Math.random() * 100}
                                        >{`${obj?.street}`}</li>
                                    )}
                                </>
                            );
                        })}
                    </ul>
                </div>
            ) : null}
            <div>
                <div style={{ marginBottom: "var(--size-500)" }}>
                    <h4 className={styles["field-title"]}>Name</h4>
                    <div className={styles["main-field"]}>
                        {isEditing ? (
                            <>
                                {
                                    <div className={`${styles["inner-field"]}`}>
                                        <div className="d-flex gap-3 align-items-center">
                                            <div className="form-group">
                                                <label htmlFor="firstName" className="ms-1">
                                                    First Name:
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${
                                                        errors.firstName
                                                            ? styles["error-input"]
                                                            : styles["profile-input"]
                                                    }`}
                                                    value={newDetails.firstName}
                                                    onChange={(e) =>
                                                        handleNameChange(e, "firstName")
                                                    }
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="lastName" className="ms-1">
                                                    Last Name:
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${
                                                        errors.lastName
                                                            ? styles["error-input"]
                                                            : styles["profile-input"]
                                                    }`}
                                                    value={newDetails.lastName}
                                                    onChange={(e) =>
                                                        handleNameChange(e, "lastName")
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                }
                            </>
                        ) : (
                            <div className={`${styles["main-field"]} ${styles["inner-field"]}`}>
                                <span>{`${userDetails.firstName} ${userDetails.lastName}`}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div style={{ marginBottom: "var(--size-500)" }}>
                    <h4 className={styles["field-title"]}>Email</h4>
                    <p className={`${styles["main-field"]} ${styles["inner-field"]}`}>
                        {userDetails.email}
                    </p>
                </div>
                <div style={{ marginBottom: "var(--size-500)" }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className={styles["field-title"]}>Addresses</h4>
                        {isEditing || userDetails.addresses?.length === 0 ? (
                            <div
                                className={`btn ${styles["profile-btn"]} ${styles["flex-btn"]} ${styles["add-btn"]}`}
                                onClick={handleAddAddress}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                                New Address
                            </div>
                        ) : null}
                    </div>
                    <div className={styles["main-field"]}>
                        {isEditing ? (
                            <>
                                {newDetails.addresses?.map((address, index, addresses) => {
                                    return (
                                        <div key={index} className={`${styles["inner-field"]}`}>
                                            <div className="d-flex gap-3 align-items-center">
                                                <div className="form-group">
                                                    <label htmlFor="governorate" className="ms-1">
                                                        Governorate:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${
                                                            errors.addresses[index]?.governorate
                                                                ? styles["error-input"]
                                                                : styles["profile-input"]
                                                        }`}
                                                        value={address.governorate}
                                                        onChange={(e) =>
                                                            handleAddressChange(
                                                                e,
                                                                "governorate",
                                                                index
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="city" className="ms-1">
                                                        City:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${
                                                            errors.addresses[index]?.city
                                                                ? styles["error-input"]
                                                                : styles["profile-input"]
                                                        }`}
                                                        value={address.city}
                                                        onChange={(e) =>
                                                            handleAddressChange(e, "city", index)
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="street" className="ms-1">
                                                        Street:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${
                                                            errors.addresses[index]?.street
                                                                ? styles["error-input"]
                                                                : styles["profile-input"]
                                                        }`}
                                                        value={address.street}
                                                        onChange={(e) =>
                                                            handleAddressChange(e, "street", index)
                                                        }
                                                    />
                                                </div>
                                                {addresses.length > 1 ? (
                                                    <FontAwesomeIcon
                                                        icon={faTrashCan}
                                                        className="btn btn-outline-danger mt-4"
                                                        onClick={() => handleAddressDelete(index)}
                                                    />
                                                ) : null}
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        ) : (
                            <>
                                {userDetails.addresses?.map((address, index) => (
                                    <div key={index} className={`${styles["inner-field"]}`}>
                                        <span>{`${address.governorate}, ${address.city}, ${address.street}`}</span>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
                <div style={{ marginBottom: "var(--size-500)" }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className={styles["field-title"]}>Phone Numbers</h4>
                        {isEditing ? (
                            <div
                                className={`btn ${styles["profile-btn"]} ${styles["flex-btn"]} ${styles["add-btn"]}`}
                                onClick={handleAddPhoneNumber}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                                New Number
                            </div>
                        ) : null}
                    </div>
                    <div className={styles["main-field"]}>
                        {isEditing ? (
                            <>
                                {newDetails.phoneNumbers?.map(
                                    (phoneNumber, index, phoneNumbers) => {
                                        return (
                                            <div key={index} className={`${styles["inner-field"]}`}>
                                                <div className="d-flex gap-3 align-items-center">
                                                    <div className="form-group flex-grow-1">
                                                        <input
                                                            type="text"
                                                            className={`form-control ${
                                                                errors.phoneNumbers[index]
                                                                    ? styles["error-input"]
                                                                    : styles["profile-input"]
                                                            }`}
                                                            value={phoneNumber}
                                                            onChange={(e) =>
                                                                handlePhoneChange(e, index)
                                                            }
                                                        />
                                                    </div>
                                                    {phoneNumbers.length > 1 ? (
                                                        <FontAwesomeIcon
                                                            icon={faTrashCan}
                                                            className="btn btn-outline-danger"
                                                            onClick={() => handlePhoneDelete(index)}
                                                        />
                                                    ) : null}
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </>
                        ) : (
                            <>
                                {userDetails.phoneNumbers?.map((phoneNumber, index) => (
                                    <div key={index} className={`${styles["inner-field"]}`}>
                                        <span>{phoneNumber}</span>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
                {isEditing ? (
                    <div className={styles["flex-control"]}>
                        <div
                            className={`btn ${styles["profile-btn"]} ${styles["flex-btn"]}`}
                            onClick={handleSave}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                            Save
                        </div>
                        <div
                            className={`btn btn-outline-danger ${styles["flex-btn"]}`}
                            onClick={handelCancel}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                            Cancel
                        </div>
                    </div>
                ) : (
                    <div className={`${styles["flex-control"]}  justify-content-between`}>
                        <div
                            className={`btn ${styles["profile-btn"]} ${styles["flex-btn"]}`}
                            onClick={handleEdit}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} className={styles["icon"]} />
                            <span>Edit</span>
                        </div>
                        <div className="btn btn-danger">Delete Account</div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AccountDetails;
