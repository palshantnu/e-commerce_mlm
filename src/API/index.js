// var ServerURL = 'http://mlm.propertyindholera.com/api';
var ServerURL = 'https://mlm.propertyindholera.com/api';
var ServerURL1 = 'https://mlm.propertyindholera.com/api';


//var axios = require('axios');
import axios from 'axios';

export const ProductImage =
  'http://mlm.propertyindholera.com/public/product/images/';

export const CategoryImage =
  'http://mlm.propertyindholera.com/public/images/sections/main/';
export const SubCategoryImage =
  'http://mlm.propertyindholera.com/public/images/sections/category/';

export const BannerImage =
  'http://mlm.propertyindholera.com/public/images/sliders/';

const getData = async url => {
  try {
    const response = await fetch(`${ServerURL}/${url}`);
    const result = response.json();
    return result;
  } catch (e) {
    // console.log("error",e);
    return null;
  }
};
const getData1 = async url => {
  try {
    const response = await fetch(`${ServerURL1}/${url}`);
    const result = response.json();
    return result;
  } catch (e) {
    // console.log("error",e);
    return null;
  }
};

const postData = async (url, body) => {
  try {
    const response = await fetch(`${ServerURL}/${url}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify(body),
    });

    const result = await response.json();
    return result;
  } catch (e) {
    // console.log(">>>>>>",e)
    return e;
  }
};

const postFormData = async (url, body) => {
  try {
    const response = await fetch(`${ServerURL}/${url}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json;'},
      body: body,
    });

    const result = await response.json();
    return result;
  } catch (e) {
    console.log('>>>>>>', e);
    return null;
  }
};

const postDataAndImage = async (url, formData) => {
  var config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  try {
    const response = await axios.post(`${ServerURL1}/${url}`, formData, config);
    const result = await response.data;
    return result;
  } catch (e) {
    console.log('error', e);
    return null;
  }
};

//api call
const apiCall = async (route, method, data) => {
  // eslint-disable-next-line no-undef
  const url = `${ServerURL}/${route}`;
  let options = {
    method,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: JSON.stringify(data),
  };
  return await fetch(url, options);
};

export {ServerURL, getData,getData1, postDataAndImage, postData, apiCall, postFormData};
