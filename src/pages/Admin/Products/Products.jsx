import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faTrash } from '@fortawesome/free-solid-svg-icons'
import axiosInstance from '../../../APIs/config';
import { Link } from 'react-router-dom';
import './Products.css'
import newImage from './../../../assets/images/plus-icon.png';


export default function Products() {
    const [products, setProducts] = useState([]);
    const [renderedProducts, setRenderedProducts] = useState(null);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const dummyImage = 'https://placehold.co/200';


    useEffect(() => {
        window.scrollTo(0, 0);

        axiosInstance.get('products')
            .then((response) => {
                setProducts(response.data);
                setRenderedProducts(response.data);
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

    }, []);

    /**
     * ToRefactor: 
     *      find another way without using eval()  [Security Risk!!]
     */

    /********************** Filters **********************/
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");

    useEffect(() => {
        const filterConditions = [];

        if (searchQuery !== "")
            filterConditions.push("(product.name.toLowerCase()).includes(searchQuery.toLowerCase())");

        if (selectedBrand !== "")
            filterConditions.push("product.brand?.name === selectedBrand")

        if (selectedCategory !== "")
            filterConditions.push("product.category?.name === selectedCategory")

        if (filterConditions.length === 0)
            setRenderedProducts(products);
        else
        {
            setRenderedProducts(products.filter(product =>
                eval(filterConditions.join(' && '))
            ));
        }

    }, [searchQuery, selectedBrand, selectedCategory])

    /********************** Product Deletion **********************/
    const deleteProduct = (product) => {
        const confirmDelete = window.confirm(`Do you want to delete the product: ${product.name} ?`);
        if (confirmDelete)
            axiosInstance.delete(`/product/${product._id}`)
                .then((response) => {
                    setRenderedProducts(renderedProducts => renderedProducts.filter(p => p._id !== product._id));
                })
                .catch(error => error)
    }


    return (
        <div className="products-list mx-3">
            <div className='row mt-4'>
                <div className="col-sm-6 ">
                    <div className="input-group ">
                        <input type="text" className="form-control border-secondary "
                            placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)} />
                        <span className="input-group-text border-secondary " id="basic-addon1">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </span>
                    </div>
                </div>
                <div className="d-flex col-sm-6 mt-3 mt-sm-0 ">
                    <div className="input-group">
                        <select className="form-select border-secondary text-dark-emphasis" defaultValue=""
                            onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value="">All Categories</option>
                            {categories.map((category) => {
                                return (
                                    <option key={category._id} value={category.name}>{category.name}</option>
                                )
                            })}
                        </select>
                        <select className="form-select border-secondary text-dark-emphasis" defaultValue=""
                            onChange={(e) => setSelectedBrand(e.target.value)}>
                            <option value="">All Brands</option>
                            {brands.map((brand) => {
                                return (
                                    <option key={brand._id} value={brand.name}>{brand.name}</option>
                                )
                            })}
                        </select>
                    </div>

                    <Link to={'/Admin/Dashboard/Product'} className='btn btn-light ms-3  border-secondary'>
                        <img src={newImage} alt="" style={{ width: '25px' }} />
                    </Link>
                </div>
            </div>


            <div className="list mt-4">
                <table className="table table-striped table-hover text-center ">
                    <thead className='table-dark'>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!renderedProducts && <tr><td colSpan={6}>No products yet</td></tr>}
                        {renderedProducts && renderedProducts.map(((product) => {
                            return (
                                <tr key={product?.id}>
                                    <td>
                                        <Link to={`/Admin/Dashboard/Product/${product?._id}`}>
                                            <img src={product?.images[0]?.imageUrl || dummyImage} alt="" className='rounded' style={{ width: '50px ' }} />
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/Admin/Dashboard/Product/${product?._id}`}>
                                            {product?.name}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/Admin/Dashboard/Product/${product?._id}`}>
                                            {product?.price + " EGP"}
                                        </Link>
                                    </td>
                                    <td >
                                        <Link to={`/Admin/Dashboard/Product/${product?._id}`}>
                                            {product?.quantity}
                                        </Link>
                                    </td>
                                    <td>
                                        <div className="dropdown">
                                            <button className="dropdown-item" onClick={() => { deleteProduct(product) }}>
                                                <FontAwesomeIcon icon={faTrash} className='text-danger' />
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                            )
                        }))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
