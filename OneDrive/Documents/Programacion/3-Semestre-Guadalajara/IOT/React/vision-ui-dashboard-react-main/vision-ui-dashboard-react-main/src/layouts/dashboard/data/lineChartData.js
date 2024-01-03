/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { useState, useEffect } from 'react';
import database from './database'; // Adjust the path based on your project structure
import { ref, onValue } from 'firebase/database';

export const fetchData = (path) => {
  return new Promise((resolve, reject) => {
    const dataRef = ref(database, path);

    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      resolve(data);
    }, {
      onlyOnce: true, // Use onlyOnce to resolve the promise once with the initial data
    });
  });
};




export const lineChartDataDashboard = [
  {
    name: "Santiago Gutiérrez",
    data: [9, 8, 8, 10, 8, 14, 3, 8, 9],
  },
  {
    name: "Antoine Ganem",
    data: [4,5,4,10,7,3,4,5,6],
  },
];
