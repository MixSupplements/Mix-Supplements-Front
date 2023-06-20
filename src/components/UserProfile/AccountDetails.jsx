import { useState } from "react";

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
    const [isEditing, setIsEditing] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: "hamda kawetsh",
        email: "kawetsh@example.com",
        addresses: [
            { city: "cairo", street: "main st", building: "shrouk building" },
            { city: "alex", street: "gaafer st", building: "fun building" },
            { city: "mans", street: "nasr st", building: "karezma building" },
        ],
        phoneNumbers: ["123-456-7890", "987-654-3210", "325-433-4343"],
    });
    const [newDetails, setNewDetails] = useState({
        ...userDetails,
        addresses: userDetails.addresses.map((address) => ({ ...address })),
    });

    const handleEdit = () => {
        setNewDetails({
            ...userDetails,
            addresses: userDetails.addresses.map((address) => ({ ...address })),
        });
        setIsEditing(true);
    };

    const handleSave = (e) => {
        if (
            !newDetails.name.trim() ||
            newDetails.addresses.every(({ city }) => !city.trim()) ||
            newDetails.phoneNumbers.every((phone) => !phone.trim())
        ) {
            e.preventDefault();
        } else {
            const addresses = newDetails.addresses.filter((address) => address.city.trim());
            const phoneNumbers = newDetails.phoneNumbers.filter((phoneNumber) =>
                phoneNumber.trim()
            );
            setUserDetails({
                ...newDetails,
                addresses,
                phoneNumbers,
            });
            setIsEditing(false);
        }
    };

    const handelCancel = () => {
        setNewDetails({
            ...userDetails,
            addresses: userDetails.addresses.map((address) => ({ ...address })),
        });
        setIsEditing(false);
    };

    const handleNameChange = (e) => {
        const { value } = e.target;
        setNewDetails({ ...newDetails, name: value });
    };

    const handleAddressChange = (e, field, index) => {
        const addresses = [...newDetails.addresses];
        addresses[index][field] = e.target.value;
        setNewDetails({ ...newDetails, addresses });
    };

    const handlePhoneChange = (e, index) => {
        const phoneNumbers = [...newDetails.phoneNumbers];
        phoneNumbers[index] = e.target.value;
        setNewDetails({ ...newDetails, phoneNumbers });
    };

    const handleAddAddress = () => {
        setNewDetails({
            ...newDetails,
            addresses: [...newDetails.addresses, { city: "", street: "", building: "" }],
        });
    };

    const handleAddPhoneNumber = () => {
        setNewDetails({
            ...newDetails,
            phoneNumbers: [...newDetails.phoneNumbers, ""],
        });
    };

    const handleAddressDelete = (index) => {
        const addresses = newDetails.addresses.filter((address, i) => i !== index);
        setNewDetails({ ...newDetails, addresses });
    };

    const handlePhoneDelete = (index) => {
        const phoneNumbers = newDetails.phoneNumbers.filter((phone, i) => i !== index);
        setNewDetails({ ...newDetails, phoneNumbers });
    };

    return (
        <div>
            <div style={{ marginBottom: "var(--size-500)" }}>
                <h4 className={styles["field-title"]}>Name</h4>
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            className={`form-control ${
                                newDetails.name.trim()
                                    ? styles["profile-input"]
                                    : styles["error-input"]
                            }`}
                            value={newDetails.name}
                            onChange={handleNameChange}
                        />
                    </>
                ) : (
                    <div className={`${styles["main-field"]} ${styles["inner-field"]}`}>
                        <span>{userDetails.name}</span>
                    </div>
                )}
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
                    {isEditing ? (
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
                            {newDetails.addresses.map((address, index, addresses) => {
                                return (
                                    <div key={index} className={`${styles["inner-field"]}`}>
                                        <div className="d-flex gap-3 align-items-center">
                                            <div className="form-group">
                                                <label htmlFor="city" className="ms-1">
                                                    City:
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${
                                                        addresses.length == 1 &&
                                                        !address.city.trim()
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
                                                    className={`form-control ${styles["profile-input"]}`}
                                                    value={address.street}
                                                    onChange={(e) =>
                                                        handleAddressChange(e, "street", index)
                                                    }
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="building" className="ms-1">
                                                    Building:
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${styles["profile-input"]}`}
                                                    value={address.building}
                                                    onChange={(e) =>
                                                        handleAddressChange(e, "building", index)
                                                    }
                                                />
                                            </div>
                                            {addresses.length > 1 ? (
                                                <FontAwesomeIcon
                                                    icon={faTrashCan}
                                                    size=""
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
                            {userDetails.addresses.map((address, index) => (
                                <div key={index} className={`${styles["inner-field"]}`}>
                                    <span>{`${address.city}, ${address.street}, ${address.building}`}</span>
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
                            {newDetails.phoneNumbers.map((phoneNumber, index, phoneNumbers) => {
                                return (
                                    <div key={index} className={`${styles["inner-field"]}`}>
                                        <div className="d-flex gap-3 align-items-center">
                                            <div className="form-group flex-grow-1">
                                                <input
                                                    type="text"
                                                    className={`form-control ${
                                                        phoneNumbers.length == 1 &&
                                                        !phoneNumber.trim()
                                                            ? styles["error-input"]
                                                            : styles["profile-input"]
                                                    }`}
                                                    value={phoneNumber}
                                                    onChange={(e) => handlePhoneChange(e, index)}
                                                />
                                            </div>
                                            {phoneNumbers.length > 1 ? (
                                                <FontAwesomeIcon
                                                    icon={faTrashCan}
                                                    size=""
                                                    className="btn btn-outline-danger"
                                                    onClick={() => handlePhoneDelete(index)}
                                                />
                                            ) : null}
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    ) : (
                        <>
                            {userDetails.phoneNumbers.map((phoneNumber, index) => (
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
    );
};

export default AccountDetails;
