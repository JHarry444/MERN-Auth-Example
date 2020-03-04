import React from 'react';
import { JWT } from '../config/config.json';

export default function Test() {
    const token = localStorage.getItem(JWT);
    return (<p>{token}</p>)
}