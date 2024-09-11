import React from 'react';
import { Button } from '@mantine/core';
import { useState, useEffect } from 'react';
import CustomButton from './CustomButton'
import '../common.css';
import money from '../common.js';
import './Shop.css';

const Shop = ({ scaleValue, setIncrementAmt, incrementAmt, mps, setMps, points, setPoints, shopPrices, setShopPrices }) => {
    const handleShop0 = () => {
        if (points >= shopPrices[0]) {
            setIncrementAmt(prevIncrementAmt => prevIncrementAmt + 1.0);
            setPoints(prevPoints => prevPoints - shopPrices[0]);
            setShopPrices(prevShopPrices => {
                const newPrices = [...prevShopPrices];
                newPrices[0] = newPrices[0] * 1.05 + 1.0;
                return newPrices;
            });
        }
    };

    const handleShop1 = () => {
        if (points >= shopPrices[1]) {
            setMps(prevMps => prevMps + 1.0);
            setPoints(prevPoints => prevPoints - shopPrices[1]);
            setShopPrices(prevShopPrices => {
                const newPrices = [...prevShopPrices];
                newPrices[1] = newPrices[1] * 1.05 + 1.0;
                return newPrices;
            });
        }
    }
    return (
        <div className="shop-root vertical">
            <div className="stats-window">
                <p className="stats">Money per click (mpc): <span className="bold">${money(incrementAmt)}</span></p>
                <p className="stats">Money per second (mps): <span className="bold">${money(mps)}</span></p>
            </div>
            <div className="shop-title-container">
                <p className="shop-title">Shop</p>
            </div>
            <div className="button-group vertical gap">
                <Button
                    className={`custom-button ${points >= shopPrices[0] ? undefined : 'disabled'}`}
                    radius="xl"
                    size="xl"
                    style={{
                        '--scale-value': scaleValue,
                    }}
                    onClick={handleShop0}
                >
                    Upgrade Button Click (+1 mpc): <span className="bold">${money(shopPrices[0])}</span>
                </Button>
                <Button
                    className={`custom-button ${points >= shopPrices[1] ? undefined : 'disabled'}`}
                    radius="xl"
                    size="xl"
                    style={{
                        '--scale-value': scaleValue,
                    }}
                    onClick={handleShop1}
                >
                    Upgrade Passive Income (+1 mps): <span className="bold">${money(shopPrices[1])}</span>
                </Button>
            </div>
        </div >
    )
};

export default Shop;