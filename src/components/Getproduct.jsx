import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import ImageCarousel from "./Carousel";

const Getproducts = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const img_url = "https://taliban.pythonanywhere.com/static/images/";

    const getproducts = async () => {
        setLoading(true);
        setLoadingMessage("Please wait, we are retrieving the products...");
        try {
            const response = await axios.get("https://taliban.pythonanywhere.com/api/vegetables");
            setProducts(response.data);
        } catch (error) {
            setError("There was an error retrieving products.");
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        getproducts();
    }, []);

    const filteredProducts = products.filter((product) =>
        product.vegetable_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const addToCart = (product) => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        existingCart.push(product);
        localStorage.setItem("cart", JSON.stringify(existingCart));
    
        // 🔔 Notify other components that cart was updated
        window.dispatchEvent(new Event("cartUpdated"));
    
        alert(`Added "${product.vegetable_name}" to cart.`);
      };

     
    return (
        <div className="row">
            <ImageCarousel/>

            {/* Spinner Loader */}
            {loading && (
                <div className="text-center my-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>{loadingMessage}</p>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="alert alert-danger text-center">{error}</div>
            )}

            {/* Search input */}
           <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6 mt-2">
            <input 
                type="text" 
                placeholder="Search for a product..." 
                className="form-control mb-3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            </div>
            <div className="col-md-3"></div>
           </div>

            {/* Products List */}
            {!loading && filteredProducts.map((product) => (
                <div className="col-md-3 justify-content-center mb-4" key={product.id}>
                    <div className="card shadow card-margin">
                        <img 
                            className="product_img mt-4"
                            src={img_url + product.vegetable_image} 
                            alt="missing"
                        />
                        <div className="card-body">
                            <h5 className="mt-2">{product.vegetable_name}</h5>
                            <p className="text-muted">{product.vegetable_description.slice(0, 50)}</p>
                            <b className="text-warning">{product.vegetable_cost} KES</b> <br />
                            <button
                    className="btn btn-outline-danger mt-2 w-100 fw-semibold"
                    onClick={() => addToCart(product)}
                  >
                    <i className="bi bi-cart-plus me-2"></i>Add to Cart
                  </button>
                        </div>
                    </div>
                </div>
            ))}

            <Footer/>
        </div>
    );
};

export default Getproducts;
