import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import "./ProductImageCard.css"
import axiosInstance from '../../../APIs/config';

export default function ProductImageCard({ image, className, productId }) {
    const [imageView, setImageView] = useState(false);

    const deleteImage = (e) => {
        e.stopPropagation();
        const confirmDelete = window.confirm('Do you want to delete the image?');
        if (confirmDelete)
        {
            axiosInstance.patch(`/product/${productId}/unload/${image.publicId}`)
                .then(() => {
                    console.log('Done');
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <div className={"card border-secondary-subtle d-flex justify-content-center align-items-center p-3 " + className}>
            <img src={image?.imageUrl} className="card-img" alt="" />
            <div class="card-img-overlay p-0 m-2 d-flex flex-row-reverse" onClick={() => setImageView(true)}>
                <button className="btn btn-close bg-light" onClick={deleteImage}></button>
            </div>

            <Modal size="md" show={imageView} onHide={() => setImageView(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Image Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={image?.imageUrl} alt="" />
                </Modal.Body>
            </Modal>
        </div>
    )
}
