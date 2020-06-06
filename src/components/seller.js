import React, { useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux"
import {Link} from "react-router-dom"

import {storeProductDetails,storeSellerDetails,showSpecs} from "../actions/index"

import logo from "../images/logo.png"
import pin from "../images/pin.svg"
import bigPhone from "../images/BigPhone.png"
import booknow from "../images/booknow.svg"
import addTocart from "../images/addTocart.svg"
import pickfromhome from "../images/pickfromhome.svg"
import calendarDelivery from "../images/calendar.svg"

export default function Seller() {

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.products)
    const sellerDetails = useSelector(state => state.sellers)
    const displaySpecs = useSelector(state => state.specs)

    useEffect(() => {
        fetch("http://35.225.50.138:9091/productDetail?sellerId=12&productId=9&variantId=6")
        .then(res => res.json())
        .then(data => dispatch(storeProductDetails(data)))
    }, []);

    useEffect(() => {
        fetch("http://35.225.50.138:9091/otherSellers?productId=9&variantId=6")
        .then(res => res.json())
        .then(data => dispatch(storeSellerDetails(data)))
    }, []);

    var singleSeller
    if(productDetails.details.productDetail && sellerDetails.sellerDetails.otherSellerList){
        singleSeller = sellerDetails.sellerDetails.otherSellerList.map( seller => {
            var PriceMRP = seller.mrp
            var PriceLocal = seller.sellerPrice
            var difference = (seller.mrp - seller.sellerPrice)
            var Discount = difference*100/seller.mrp
            return(
                <>  
                    <div className="singleSeller">
                        <div className="singleSellerfirst">
                            <input type="radio"></input>
                            <span>
                                <img src={seller.sellerDetails.sellerResources[0].resourceURL}></img>
                            </span>
                            <div>
                                <p>{seller.sellerDetails.name}</p>
                                <p>{seller.sellerDetails.area}</p>
                            </div>
                        </div>

                        <div className="pricing">
                            <h3 style={{fontSize:"30px"}}>{"₹"+PriceLocal}</h3>
                            <h3 style={{fontSize:"20px"}}>{"₹"+PriceMRP}</h3>
                            <h3 style={{fontSize:"20px"}}>{Discount.toFixed(0) + "% off"}</h3>
                        </div>
                    </div>
                </>
            )
        })
    }

    return (
        <>
            <nav className="navbar">
                <div style={{flexGrow:1}}>
                    <img src={logo} alt="logo" id="logo" />
                </div>
                <div className="navElements" style={{width:"40%"}}>
                    <div>
                        <img src={pin} alt="pin" id="pin"/>
                        <p>Bangalore</p>
                    </div>
                    <div>
                        <p>Become Seller</p>
                    </div>
                    <div>
                        <p>Login</p>
                    </div>
                    <div id="signUpbtn">
                        <p>Sign Up</p>
                    </div>
                </div>
            </nav>

            {/* PATH */}

            { productDetails.details.productDetail ?
                <>
                    <div className="path">
                        <section className="pathSection">
                            <Link to ="/" style={{textDecoration:"none",color:"inherit"}}>
                                <p>{"< Return to product"}</p>
                            </Link>
                        </section>
                        <div>
                            <span>
                                <img src={bigPhone} alt="variant" id="bigPhone1" />
                            </span>
                            <h3>{productDetails.details.productDetail.productName}</h3>
                        </div>
                    </div>

                    <div className="sellerInfoTable">
                        <h3>Seller Information</h3>
                        <h3>{"Price & Offers"}</h3>
                    </div>

                    <hr className="divider" />

                    <div className="sellerInfoList">
                        {singleSeller}
                    </div>

                </>
                :
                <>

                </>
            }

            <footer className="footer">
                <div className="buttons footerBTNS">
                    <button>
                        <span>
                            <img src={booknow} />
                        </span>
                        buy now
                    </button>
                    <button>
                        <span>
                            <img src={addTocart} />
                        </span>
                        add to cart
                    </button>
                    <button>
                        <span>
                            <img src={pickfromhome} />
                        </span>
                        Pickup from store
                    </button>
                    <button>
                        <span>
                            <img src={calendarDelivery} />
                        </span>
                        Calendar delivery
                    </button>
                </div>
            </footer>

        </>
    )
}
