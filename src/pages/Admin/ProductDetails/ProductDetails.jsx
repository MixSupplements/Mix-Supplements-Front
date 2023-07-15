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
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        brand: ""
    });
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [imageFlag, setImageFlag] = useState(false);


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
    }, [id, imageFlag])

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    /**************** name change ****************/
    const handleNameChange = (e) => {
        setProduct({ ...product, name: e.target.value })
    }

    /**************** description change ****************/
    const handleDescriptionChange = (e) => {
        setProduct({ ...product, description: e.target.value })
    }

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
        } else
        {
            setImageError("");
        }

        if (image.size > 3145728)    // smaller than 3 MB
        {
            setImageError('Images must be smaller than 3 MB');
            return;
        } else
        {
            setImageError("");
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

    /**************** Inventory - Price ****************/
    const [priceErrorMessage, setPriceErrorMessage] = useState('');
    const handlePriceChange = (e) => {
        if (isNaN(e.target.value))
        {
            setPriceErrorMessage("Only numbers allowed");
            return;
        }
        else
            setPriceErrorMessage('');

        setProduct({ ...product, price: parseInt(e.target.value) });
    }

    /**************** Inventory - Quantity ****************/
    const [quantityErrorMessage, setQuantityErrorMessage] = useState('');
    const handleQuantityChange = (e) => {
        if (isNaN(e.target.value))
        {
            setQuantityErrorMessage("Only numbers allowed");
            return;
        }
        else
            setQuantityErrorMessage('');

        setProduct({ ...product, quantity: parseInt(e.target.value) });
    }

    /**************** Category ****************/
    const handleCategoryChange = (e) => {
        setProduct({ ...product, category: e.target.value });
    }

    /**************** Brand ****************/
    const handleBrandChange = (e) => {
        setProduct({ ...product, brand: e.target.value });
    }

    /******************* *******************/
    const [saveErrors, setSaveErrors] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const handleSave = (e) => {
        setSaveErrors('');

        let errors = '';

        if (product.name === '')
            errors += 'Product Name is Required -';

        if (product.description === '')
            errors += 'Product Description is Required -';

        if (product.price === '')
            errors += 'Product Price is Required -';

        if (product.quantity === '')
            errors += 'Product Quantity is Required -';

        if (product.category === '')
            errors += 'Product Category is Required -';

        if (product.brand === '')
            errors += 'Product Brand is Required -';

        if (errors !== '')
        {
            setSaveErrors(errors);
            window.scrollTo(0, document.documentElement.scrollHeight);
            return;
        }

        if (id)
            axiosInstance.patch(`/product/${id}`, product)
                .then((response) => {
                    setSuccessMessage(response.data.message);
                })
                .catch(error => console.log(error))
        else
            axiosInstance.post('/product', product)
                .then((response) => {
                    setSuccessMessage(response.data.message);
                })
                .catch(error => console.log(error))

    }



    return (
        <div className='product-details pt-3 px-2'>
            <span className='back-icon me-3' onClick={goBack}><FontAwesomeIcon icon={faSquareCaretLeft} size='2xl' /></span>
            <div className="row">
                <div className='col-lg-8 mt-3 '>
                    {/* Name */}
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label fw-bold ">Product Name</label>
                        <input type="text" className="form-control border-secondary "
                            id="productName" value={product.name}
                            onChange={handleNameChange}
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <label htmlFor="productDescription" className="form-label fw-bold ">Product Description</label>
                        <textarea className="form-control border-secondary"
                            id="productDescription" rows="5"
                            value={product.description}
                            onChange={handleDescriptionChange}
                        />
                    </div>

                    {/* Image */}
                    <div className="mb-3 add-image">
                        <div className="d-flex justify-content-between mb-1 align-items-baseline">
                            <label className="form-label fw-bold">Product Images</label>
                            {imageError && <span className='alert alert-danger p-1 m-0'>{imageError}</span>}
                        </div>
                        <div className="form-control border-secondary product-images d-flex flex-wrap ">
                            {product?.images?.map(image =>
                                <ProductImageCard key={image.publicId} productId={id}
                                    image={image} className="col-5 col-lg-3 m-2"
                                    setImageFlag={setImageFlag}
                                />)}

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
                </div>

                <div className="col-12 col-lg-4 ">
                    <div className="mb-3">
                        <div className=' fw-bold mb-1'>Inventory</div>
                        <div className="card p-3 border-dark">

                            {/* Price */}
                            <div className="row mb-3">
                                <span className='fw-bold col-6 col-sm-3 col-lg-4 align-self-center'>Price</span>
                                <div className="col-6 col-sm-3 col-lg-4 ">
                                    <input type="text"
                                        className="form-control border-secondary text-center "
                                        value={product.price}
                                        onChange={handlePriceChange}
                                    />
                                </div>
                                {priceErrorMessage && <div className="alert mx-auto my-4 my-sm-0  alert-danger text-center m-0 p-1 col-10 col-sm-4 col-lg-10  my-lg-3">{priceErrorMessage}</div>}
                            </div>

                            {/* Quantity */}
                            <div className="row">
                                <span className='fw-bold col-6 col-sm-3 col-lg-4 align-self-center'>Quantity</span>
                                <div className="col-6 col-sm-3 col-lg-4 ">
                                    <input type="text"
                                        className="form-control border-secondary text-center "
                                        value={product.quantity}
                                        onChange={handleQuantityChange}
                                    />
                                </div>
                                {quantityErrorMessage && <div className="alert mx-auto my-4 my-sm-0  alert-danger text-center m-0 p-1 col-10 col-sm-4 col-lg-10  my-lg-3">{quantityErrorMessage}</div>}
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className=' fw-bold mb-1'>Organize</div>
                        <div className="card p-3 border-dark">

                            {/* Category */}
                            <div className="row mb-3">
                                <span className='fw-bold col-6 col-sm-3 col-lg-6 col-xl-4 align-self-center'>Category</span>
                                <div className="col-6 col-sm-3 col-lg-6 ">
                                    <select className="form-select border-secondary text-dark-emphasis"
                                        onChange={handleCategoryChange} value={product.category}>
                                        <option value="">--</option>
                                        {categories.map((category) => {
                                            return (
                                                <option key={category._id} value={category._id}
                                                >{category.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>

                            {/* Brand */}
                            <div className="row">
                                <span className='fw-bold col-6 col-sm-3 col-lg-6 col-xl-4 align-self-center'>Brand</span>
                                <div className="col-6 col-sm-3 col-lg-6 ">
                                    <select className="form-select border-secondary text-dark-emphasis"
                                        onChange={handleBrandChange} value={product.brand}>
                                        <option value="">--</option>
                                        {brands.map((brand) => {
                                            return (
                                                <option key={brand._id} value={brand._id}
                                                >{brand.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='text-center mb-3'>
                        <button className='btn btn-success' onClick={handleSave}> Save</button>
                    </div>

                    {saveErrors && <div className="alert alert-danger p-2 mb-2">
                        {saveErrors.split('-').map((error, index) => {
                            return (
                                <div key={'error' + index}>{error}</div>
                            )
                        })}
                    </div>}

                    {successMessage && <div className="alert alert-success p-2 mb-2">{successMessage}</div>}
                </div>
            </div>
        </div >
    )
}
