import React, { useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux"
import {Link} from "react-router-dom"

import {storeProductDetails,storeSellerDetails,showSpecs} from "../actions/index"

import logo from "../images/logo.png"
import pin from "../images/pin.svg"
import cart from "../images/shopping_bag.svg"
import share from "../images/share.svg"
import wishlist from "../images/wishlist.svg"
import bigPhone from "../images/BigPhone.png"
import smallPhone1 from "../images/SmallPhone1.png"
import smallPhone2 from "../images/SmallPhone2.png"
import smallPhone3 from "../images/SmallPhone3.png"
import color1 from "../images/color1.png"
import color2 from "../images/color2.png"
import booknow from "../images/booknow.svg"
import addTocart from "../images/addTocart.svg"
import pickfromhome from "../images/pickfromhome.svg"
import calendarDelivery from "../images/calendar.svg"
import seller from "../images/Seller.svg"
import shippingfee from "../images/shippingfee.png"
import bestPrice from "../images/bestPrice.png"
import pickupservice from "../images/pickupservice.png"
import requestyourProduct from "../images/requestyourProduct.png"
import icon1 from "../images/icon1.svg"
import icon2 from "../images/icon2.svg"
import icon3 from "../images/icon3.svg"
import icon4 from "../images/icon4.svg"
import icon5 from "../images/icon5.svg"
import pune from "../images/pune.svg"
import footer from "../images/footer.png"
import paypal from "../images/paypal.svg"
import visa from "../images/visa.svg"
import mastercard from "../images/mastercard.svg"
import payment from "../images/payment.svg"

import StarRateIcon from '@material-ui/icons/StarRate';
import Rating from '@material-ui/lab/Rating';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

export default function Product() {

  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.products)
  const sellerDetails = useSelector(state => state.sellers)
  const displaySpecs = useSelector(state => state.specs)

  useEffect(() => {
      console.log("calling store products function...")
      fetch("http://35.225.50.138:9091/productDetail?sellerId=12&productId=9&variantId=6")
      .then(res => res.json())
      .then(data => dispatch(storeProductDetails(data)))
  }, []);

  useEffect(() => {
      console.log("calling store products function...")
      fetch("http://35.225.50.138:9091/otherSellers?productId=9&variantId=6")
      .then(res => res.json())
      .then(data => dispatch(storeSellerDetails(data)))
  }, []);

  console.log(productDetails)
  console.log(sellerDetails.sellerDetails.otherSellerList)

  var keyFeatures
  if(productDetails.details.productDetail){
    keyFeatures = productDetails.details.productDetail.productKeyFeatures.map( key => {
        return(
            <>  
                <div className="singlekeyFeatures">
                    <span></span>
                    <p>{key}</p>
                </div>
            </>
        )
    })
  }

  var PriceMRP = 0
  var PriceLocal = 0
  var Discount = 0
  var sellerIMG = ""
  var sellerName = ""
  var totalSellers = 0
  if(productDetails.details.productDetail && sellerDetails.sellerDetails.otherSellerList){
    totalSellers = sellerDetails.sellerDetails.otherSellerList.length
    sellerDetails.sellerDetails.otherSellerList.map(seller => {
        if(seller.sellerDetails.id == productDetails.details.productDetail.sellerId){
            sellerName = seller.sellerDetails.name
            PriceMRP = seller.mrp
            PriceLocal = seller.elocalsPrice
            seller.sellerDetails.sellerResources.map(res => {
                if(res.orderRender == 1){
                    sellerIMG = res.resourceURL
                }
            })
            var difference = (seller.mrp - seller.elocalsPrice)
            Discount = difference*100/seller.mrp
        }
    })
  }

  
  const ref = React.createRef();
  const handleClick = () =>
        ref.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

  return (
      <>
        <nav className="navbar">
            <div style={{flexGrow:1}}>
                <img src={logo} alt="logo" id="logo" />
            </div>
            <div className="navElements">
                <div>
                    <img src={pin} alt="pin" id="pin"/>
                    <p>Bangalore</p>
                </div>
                <div>
                    <img src={cart} alt="cart" id="cart"/>
                </div>
                <div>
                    <img src="https://i.picsum.photos/id/2/300/300.jpg" alt="user" id="user"/>
                </div>
            </div>
        </nav>

        {/* PATH */}

        <section className="pathSection">
            <p>home > mobiles ></p>
        </section>

        {/* SINGLE PRODUCT */}

        <section className="singlePRparent">

            <div className="singlePRfirsthalf">

                <div className="singlePRimages">
                    <div className="singlePRicons">
                        <img src={share} />
                        <img src={wishlist} />
                    </div>
                    <div className="singlePRphoneImages">
                        <div>
                            <span>
                                <img src={smallPhone1} alt="variant" id="smallPhone1" />
                            </span>
                            <span>
                                <img src={smallPhone3} alt="variant" id="smallPhone3"/>
                            </span>
                            <span>
                                <img src={bigPhone} alt="variant" id="bigPhone1" />
                            </span>
                            <span>
                                <img src={smallPhone3} alt="variant" id="smallPhone3"/>
                            </span>
                            <span>
                                <h2>5 +</h2>
                                <p>more</p>
                            </span>
                        </div>
                        <div>
                            <img src={bigPhone} alt="big phone" id="bigPhone"/>
                        </div>
                    </div>
                    <div className="sellerDetailsParent">
                        <div className="sellerDetails">
                            <span>
                                <img src={sellerIMG} alt="seller" id="seller"/>
                            </span>
                            <div>
                                <h3>seller</h3>
                                <h3>{sellerName}</h3>
                            </div>
                        </div>
                        <div className="moreSellersBTN">
                            <Link to="/seller" style={{textDecoration:"none"}}>
                                <h3>View more sellers ({totalSellers})</h3>
                            </Link>
                            <span>
                                <img src={seller} alt="seller" id="seller"/>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="singlePRspecs">
                    {
                        productDetails.details.productDetail ?
                        <>
                            <h3>{productDetails.details.productDetail.productName}</h3>
                            <div className="keyFeatures">
                                {keyFeatures}
                            </div>
                            <div className="colors">
                                <h3>Color</h3>
                                <span>
                                    <img src={color1} alt="variant" id="color1" />
                                </span>
                                <span>
                                    <img src={color2} alt="variant" id="color2" />
                                </span>
                                <h3 id="qty">Quantity</h3>
                                <input type="number"></input>
                            </div>
                            <div className="pricing">
                                <h3>{"₹"+PriceLocal}</h3>
                                <h3>{"₹"+PriceMRP}</h3>
                                <h3>{Discount.toFixed(0) + "% off"}</h3>
                            </div>
                            <p id="afterPrice">Inclusive of all taxes</p>
                            <div className="facilities">
                                <span>
                                    <h3>Delivery in 24 hrs</h3>
                                </span>
                                <span>
                                    <h3>EMI options available</h3>
                                </span>
                                <span>
                                    <h3>Pay later</h3>
                                </span>
                            </div>
                            <div className="buttons" ref={ref}>
                                <button onClick={handleClick}>
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
                            </div>
                            <div className="calendarDelivery">
                                <span>
                                    <img src={calendarDelivery} alt="calendar" />
                                </span>
                                <h3>
                                    Calendar delivery
                                </h3>
                            </div>
                            <div className="features">
                                <div>
                                    <span>
                                        <img src={shippingfee} alt="shippingfee"/>
                                    </span>
                                    <div className="featuresText">
                                        <h3>Shipping fee</h3>
                                        <h3>Free</h3>
                                    </div>
                                </div>
                                <div>
                                    <span>
                                        <img src={bestPrice} alt="shippingfee"/>
                                    </span>
                                    <div className="featuresText">
                                        <h3>Best Price</h3>
                                        <h3>Always</h3>
                                    </div>
                                </div>
                                <div>
                                    <span>
                                        <img src={pickupservice} alt="shippingfee"/>
                                    </span>
                                    <div className="featuresText">
                                        <h3>Pickup Service</h3>
                                        <h3>One Hour</h3>
                                    </div>
                                </div>
                                <div>
                                    <span>
                                        <img src={requestyourProduct} alt="shippingfee"/>
                                    </span>
                                    <div className="featuresText">
                                        <h3>Request your product</h3>
                                        <h3>Get Anything</h3>
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <h3>...</h3>
                    }
                </div>
            </div>

            <div className="specsAndDesc">
            {
                 productDetails.details.productDetail?
                 <>
                    {displaySpecs?
                        <>
                            <div className="specsAndDescHeader">
                                <h3 onClick={() => dispatch(showSpecs("specs"))} style={{color:"#0F5EEA",borderBottom:"#0F5EEA solid 1px"}}>Specifications</h3>
                                <h3 onClick={() => dispatch(showSpecs(""))} style={{color:"#000000",borderBottom:"none"}}>Description</h3>
                            </div>
                            <div className="specsAndDescData">
                                <div>
                                    <h3>OS</h3>
                                    <h3>{productDetails.details.productDetail.productSpecification.OS}</h3>
                                </div>
                                <div>
                                    <h3>Batteries</h3>
                                    <h3>{productDetails.details.productDetail.productSpecification.Batteries}</h3>
                                </div>
                                <div>
                                    <h3>RAM</h3>
                                    <h3>{productDetails.details.productDetail.productSpecification.RAM}</h3>
                                </div>
                                <h3 id="seeMore">See More</h3>
                            </div>
                        </>
                        :
                        <>
                            <div className="specsAndDescHeader">
                                <h3 onClick={() => dispatch(showSpecs("specs"))} style={{color:"#000000",borderBottom:"none"}}>Specifications</h3>
                                <h3 onClick={() => dispatch(showSpecs(""))} style={{color:"#0F5EEA",borderBottom:"#0F5EEA solid 1px"}}>Description</h3>
                            </div>
                            <div className="specsAndDescData description">
                                <h3>
                                    {productDetails.details.productDetail.productDescription}
                                </h3>
                            </div>
                        </>
                    }
                 </>
                 :
                 null
            }
            </div>

            {/* REVIEW */}
            
            <div className="reviewsection">
                <div className="reviewHeader">
                    <h3>24 reviews</h3>
                    <Rating name="review" value={4} readOnly />
                </div>    
                <div className="reviewComments">
                    <div>
                        <div className="reviewCommentsfirst">
                            <span>
                                R
                            </span>
                            <p>
                                The product just received today. The item sold by Supercomnet says 10 day replacement. But after delivery the return option is withdrawn from details of order and says if any problem arises contact local Apple service centre. It is a clear fraud for the customers who buy such a high priced handset. Customer be careful about that. My set is running fine but it is not my question.Why an online store like Flipkart close the option of return without informing the customer?
                            </p>
                        </div>
                        <div className="reviewCommentssecond">
                            <div>
                                <h3>Rohit Rehana</h3>
                                <span>
                                    <p>5</p>
                                    <StarRateIcon />
                                </span>
                                <p id="address">Lal Mahal, pune</p>
                            </div>
                            <p id="commentTime">a week ago</p>
                        </div>
                    </div>
                    <div>
                        <div className="reviewCommentsfirst">
                            <span>
                                S
                            </span>
                            <p>
                                Phone is good and excellent but price is so high😭😭    
                            </p>
                        </div>
                        <div className="reviewCommentssecond">
                            <div>
                                <h3>Sourabh</h3>
                                <span>
                                    <p>5</p>
                                    <StarRateIcon />
                                </span>
                                <p id="address">Lal Mahal, pune</p>
                            </div>
                            <p id="commentTime">a month ago</p>
                        </div>
                    </div>
                </div>
                <h3 id="seeMore">See More</h3>
            </div>

        </section>

        <section className="requestPR"> 
            <h3>
                Couldn't found what you are looking for ?
            </h3>
            <div>
                <span>
                    <img src={icon1} ></img>
                </span>
                <span>
                    <img src={icon2} ></img>
                </span>
                <span>
                    <img src={icon3} ></img>
                </span>
                <span>
                    <img src={icon4} ></img>
                </span>
                <span>
                    <img src={icon5} ></img>
                </span>
            </div>
            <button>
                Request product
            </button>
        </section>

        <section className="support">
            <h3>Any questions in mind ?</h3>
            <h3>Click here for quick support</h3>
            <i class="fab fa-whatsapp fa-6x"></i>
        </section>

        <footer>
            <div className="productFooter">
                <div className="productFooterCity">
                    <span>
                        <img src={footer} ></img>
                    </span>
                    <h3>Cities we are in</h3>
                    <span>
                        <img src={pune} ></img>
                    </span>
                </div>
                <div className="productFooterData">
                    <div className="productFooterDataFirst">
                        <div className="productFooterFollowUs">
                            <h3>Follow Us</h3>
                            <p>We are driven by the excitement of building technologies, inventing products, and providing services that change our local shopping experience.</p>
                            <div>
                                <i class="fab fa-facebook-f"></i>
                                <i class="fab fa-twitter"></i>
                                <i class="fab fa-linkedin-in"></i>
                                <i class="fab fa-instagram"></i>
                                <i class="fab fa-whatsapp"></i>
                                <i class="fab fa-youtube"></i>
                            </div>
                        </div>
                        <div className="productFooterFollowUs" style={{width:"40%"}}>
                            <h3 style={{marginBottom:"20px"}}>Contact Us</h3>
                            <p style={{margin:"0"}}>Location: Pune, Maharashtra</p> 
                            <p style={{margin:"0"}}>Phone: +91 7004831994</p>
                            <p style={{margin:"0"}}>Email: digitalservices@elocals.in</p>
                        </div>
                    </div>

                    <hr className="divider" />

                    <div className="productFooterDataSecond">
                        <div>
                            <h3>Useful Links</h3>
                            <p>About us</p>
                            <p>Contact us</p>
                            <p>Sitemap</p>
                        </div>
                        <div>
                            <h3>Service</h3>
                            <p>Payment</p>
                            <p>Shipping</p>
                            <p>Cancelleation</p>
                        </div>
                        <div>
                            <h3>Infomation</h3>
                            <p>FAQ</p>
                            <p>Privacy Policy</p>
                            <p>{"Terms & Conditions"}</p>
                        </div>
                    </div>
                </div>
                <div className="copyrights">
                    <p>© Locals Digital Services Pvt. Ltd. | ALL RIGHTS RESERVED</p>
                    <div>
                        <span>
                            <img src={paypal} ></img>
                        </span>
                        <span>
                            <img src={visa} ></img>
                        </span>
                        <span>
                            <img src={mastercard} ></img>
                        </span>
                        <span>
                            <img src={payment} ></img>
                        </span>
                    </div>
                </div>
            </div>
        </footer>

      </>
  )
}
