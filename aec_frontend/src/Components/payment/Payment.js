import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './css/paymentcss.css'
import { useLocation } from 'react-router-dom'
import QueryString from 'query-string'
import { topremium } from '../../actions/userActions'
import { useDispatch } from 'react-redux'

const buy1 = 20
const buy2 = 60
const buy3 = 100

function Payment() {

    const location = useLocation()
    const dispatch = useDispatch()


    const Navigate = useNavigate()

    useEffect(() => {
        const values = QueryString.parse(location.search)
        if (values.success) {
            dispatch(topremium(values.price))
            Navigate('/success')
        }

        if (values.canceled) {
            Navigate("/cancelled")
        }
    }, []);

    return (
        <div>
            <div className="row justify-content-center h-100 align-items-center">
                <div className="col-lg-12">
                    <div className="card text-center" style={{ padding: "0" }}>

                        <div className="card-body" style={{ padding: "0" }}>
                            <section className="pricing-section" style={{ padding: "0" }}>
                                <div className="container">
                                    <div className="sec-title text-center mt-1" style={{ marginBottom: "0" }}>
                                        <span className="title">Get plan</span>
                                        <h2>Choose a Plan</h2>
                                    </div>

                                    <div className="outer-box">
                                        <div className="row">
                                            <div className="pricing-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp">
                                                <div className="inner-box">
                                                    <div className="icon-box">
                                                        <div className="icon-outer"><i className="fas fa-paper-plane"></i></div>
                                                    </div>
                                                    <div className="price-box">
                                                        <div className="title"> Day Pass</div>
                                                        <h4 className="price">$35.99</h4>
                                                    </div>
                                                    <ul className="features">
                                                        <li className="true">Conference plans</li>
                                                        <li className="true">Free Lunch And Coffee</li>

                                                    </ul>
                                                    <div className="btn-box">
                                                        <a onClick={() => {
                                                           
                                                            Navigate(`/paymentconfirmation/${buy1}`)
                                                        }} className="theme-btn">BUY plan</a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pricing-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="400ms">
                                                <div className="inner-box">
                                                    <div className="icon-box">
                                                        <div className="icon-outer"><i className="fas fa-gem"></i></div>
                                                    </div>
                                                    <div className="price-box">
                                                        <div className="title">Full Pass</div>
                                                        <h4 className="price">$99.99</h4>
                                                    </div>
                                                    <ul className="features">
                                                        <li className="true">Conference plans</li>
                                                        <li className="true">Free Lunch And Coffee</li>

                                                    </ul>
                                                    <div className="btn-box">
                                                        <a onClick={() => {
                                                            
                                                            Navigate(`/paymentconfirmation/${buy2}`)
                                                        }} className="theme-btn">BUY plan</a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pricing-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="800ms">
                                                <div className="inner-box">
                                                    <div className="icon-box">
                                                        <div className="icon-outer"><i className="fas fa-rocket"></i></div>
                                                    </div>
                                                    <div className="price-box">
                                                        <div className="title">Group Pass</div>
                                                        <h4 className="price">$199.99</h4>
                                                    </div>
                                                    <ul className="features">
                                                        <li className="true">Conference plans</li>
                                                        <li className="true">Free Lunch And Coffee</li>

                                                    </ul>
                                                    <div className="btn-box">
                                                        <a onClick={() => {
                                                            
                                                            Navigate(`/paymentconfirmation/${buy3}`)
                                                        }} className="theme-btn">BUY plan</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment