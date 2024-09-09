import React from 'react';
import { Button } from '@mantine/core';
import { useState } from 'react';
import CustomButton from './CustomButton.js'
import '../common.css';
import money from '../common.js';
import './Shop.css';

const Shop = ({ scaleValue, setIncrementAmt, incrementAmt, mps, setMps, points, setPoints }) => {
    const [shop1Price, setShop1Price] = useState(25.0);
    const [shop2Price, setShop2Price] = useState(100.0);
    const handleShop1 = () => {
        if (points >= shop1Price) {
            setIncrementAmt(prevIncrementAmt => prevIncrementAmt + 1.0);
            setPoints(prevPoints => prevPoints - shop1Price);
            setShop1Price(prevShop1Price => prevShop1Price * 1.05 + 1.0);
        }
    }
    const handleShop2 = () => {
        if (points >= shop2Price) {
            setMps(prevMps => prevMps + 1.0);
            setPoints(prevPoints => prevPoints - shop2Price);
            setShop2Price(prevShop2Price => prevShop2Price * 1.05 + 1.0);
        }
    }
    return (
        <div className="shop-root vertical">
            <div className="stats-window">
                <p className="stats">Money per click: <span className="bold">${money(incrementAmt)}</span></p>
                <p className="stats">Money per second: <span className="bold">${money(mps)}</span></p>
            </div>
            <div className="shop-title-container">
                <p className="shop-title">Shop</p>
            </div>
            <div className="button-group vertical">
                <Button
                    className={`custom-button`}
                    radius="xl"
                    size="xl"
                    style={{
                        '--scale-value': scaleValue,
                    }}
                    onClick={handleShop1}
                >
                    Upgrade Button Click: <span className="bold">${money(shop1Price)}</span>
                </Button>
                <Button
                    className={`custom-button`}
                    radius="xl"
                    size="xl"
                    style={{
                        '--scale-value': scaleValue,
                    }}
                    onClick={handleShop2}
                >
                    Upgrade Passive Income: <span className="bold">${money(shop2Price)}</span>
                </Button>
            </div>
        </div >
    )
};

export default Shop;