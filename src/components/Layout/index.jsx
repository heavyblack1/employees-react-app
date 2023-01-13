import './layout.css';
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div className='App' name="layout-body">
            <div className="Page" name="outlet-body">
                {/* Outlet will insert pages of  web app */}
                <Outlet />
            </div>
        </div>
    );
}