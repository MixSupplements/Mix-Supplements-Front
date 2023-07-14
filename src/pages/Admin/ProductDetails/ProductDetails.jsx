import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretLeft } from '@fortawesome/free-regular-svg-icons';
import ProductImageCard from '../../../components/Admin/ProductImageCard/ProductImageCard';

import axiosInstance from '../../../APIs/config';
import newImage from './../../../assets/images/image-add-icon.png';
import './ProductDetails.css';

export default function ProductDetails() {

    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {

        if (id)
            axiosInstance.get(`product/${id}`)
                .then((response) => {
                    setProduct(response.data);
                })
                .catch(error => console.log(error))

        axiosInstance.get('categories')
            .then((response) => {
                setCategories(response.data);
            })
            .catch(error => console.log(error))

        axiosInstance.get('brands')
            .then((response) => {
                setBrands(response.data);
            })
            .catch(error => console.log(error))
    }, [id])

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    /**************** image upload ****************/
    const imageInputRef = useRef(null);
    const [imageError, setImageError] = useState('');

    const handleButtonClick = () => {
        imageInputRef.current.click()
    }
    const handleFileChange = (e) => {
        const image = e.target.files[0];

        if (!image.type.startsWith('image/'))
        {
            setImageError("Only images allowed");
            return;
        }

        if (image.size > 3145728)    // smaller than 3 MB
        {
            setImageError('Images must be smaller than 3 MB');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        axiosInstance.patch(`/product/${product._id}/upload`, formData)
            .then(() => {
                axiosInstance.get(`product/${id}`)
                    .then((response) => {
                        setProduct(response.data);
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error.response.data))
    }


    return (
        <div className='product-details pt-3 px-2'>
            <span className='back-icon me-3' onClick={goBack}><FontAwesomeIcon icon={faSquareCaretLeft} size='2xl' /></span>
            <div className='col-lg-8 mt-3 '>
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label fw-bold ">Product Name</label>
                    <input type="text" className="form-control border-secondary " id="productName" value={product.name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="productDescription" className="form-label fw-bold ">Product Description</label>
                    <textarea className="form-control border-secondary" id="productDescription" rows="5" value={product.description} />
                </div>
                <div className="mb-3 add-image">
                    <label className="form-label fw-bold ">Product Images</label>
                    <div className="form-control border-secondary product-images d-flex flex-wrap ">
                        {product?.images?.map(image =>
                            <ProductImageCard key={image.publicId} productId={id} image={image} className="col-5 col-lg-3 m-2" />)}

                        {/* Image Upload */}
                        <div className="card border-secondary-subtle col-5 col-lg-3 m-2" style={{ minHeight: '150px' }} >
                            <div className="card-body d-flex justify-content-center align-items-center "
                                style={{ cursor: 'pointer' }} onClick={handleButtonClick}>
                                <img src={newImage} alt="" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    ref={imageInputRef}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <div className=' fw-bold '>Inventory</div>
                    <div className="card">
                        <span className='fw-bold col-3'>Price</span>
                        <input type="text" className="col-9 form-control border-secondary " id="productName" value={product.price} />
                    </div>
                </div>

            </div>
        </div >
    )
}