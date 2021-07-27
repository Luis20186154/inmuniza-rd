import React from 'react';
import { NavLink } from 'react-router-dom';

export const Tab = ({title, route}) => <NavLink style= {{}} to = {route}>{title}</NavLink>;
