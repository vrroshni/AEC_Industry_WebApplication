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
                            <section class="pricing-section" style={{ padding: "0" }}>
                                <div class="container">
                                    <div class="sec-title text-center mt-1" style={{ marginBottom: "0" }}>
                                        <span class="title">Get plan</span>
                                        <h2>Choose a Plan</h2>
                                    </div>

                                    <div class="outer-box">
                                        <div class="row">
                                            <div class="pricing-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp">
                                                <div class="inner-box">
                                                    <div class="icon-box">
                                                        <div class="icon-outer"><i class="fas fa-paper-plane"></i></div>
                                                    </div>
                                                    <div class="price-box">
                                                        <div class="title"> Day Pass</div>
                                                        <h4 class="price">$35.99</h4>
                                                    </div>
                                                    <ul class="features">
                                                        <li class="true">Conference plans</li>
                                                        <li class="true">Free Lunch And Coffee</li>

                                                    </ul>
                                                    <div class="btn-box">
                                                        <a onClick={() => {
                                                           
                                                            Navigate(`/paymentconfirmation/${buy1}`)
                                                        }} class="theme-btn">BUY plan</a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="pricing-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="400ms">
                                                <div class="inner-box">
                                                    <div class="icon-box">
                                                        <div class="icon-outer"><i class="fas fa-gem"></i></div>
                                                    </div>
                                                    <div class="price-box">
                                                        <div class="title">Full Pass</div>
                                                        <h4 class="price">$99.99</h4>
                                                    </div>
                                                    <ul class="features">
                                                        <li class="true">Conference plans</li>
                                                        <li class="true">Free Lunch And Coffee</li>

                                                    </ul>
                                                    <div class="btn-box">
                                                        <a onClick={() => {
                                                            
                                                            Navigate(`/paymentconfirmation/${buy2}`)
                                                        }} class="theme-btn">BUY plan</a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="pricing-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="800ms">
                                                <div class="inner-box">
                                                    <div class="icon-box">
                                                        <div class="icon-outer"><i class="fas fa-rocket"></i></div>
                                                    </div>
                                                    <div class="price-box">
                                                        <div class="title">Group Pass</div>
                                                        <h4 class="price">$199.99</h4>
                                                    </div>
                                                    <ul class="features">
                                                        <li class="true">Conference plans</li>
                                                        <li class="true">Free Lunch And Coffee</li>

                                                    </ul>
                                                    <div class="btn-box">
                                                        <a onClick={() => {
                                                            
                                                            Navigate(`/paymentconfirmation/${buy3}`)
                                                        }} class="theme-btn">BUY plan</a>
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