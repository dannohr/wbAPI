const axios = require("axios");
const { apiKey } = require("../config");

const baseUrl = "https://secure.workbooks.com/crm/organisations.api?";

const filterIdHead = '&_filter_json=[["id","eq","';
const filterIdTail = '"]]';
const filterNameHead = '&_filter_json=[["name","ct","';
const filterNameTail = '"]]';
const updateCustomerBaseUrlHead =
  "https://secure.workbooks.com/crm/organisations.api?api_key=49591-ebf97-35abc-82f3f-e2179-97b60-eb671-5832c&client=api&api_version[]=1&lock_version[]=";
const updateCustomerBase2 = "&id[]=";
const updateCustomerBase3 = "&name[]=";
const updateCustomerBase4 = "&_ff[]=id&_ft[]=eq&_fc[]=";
const updateCustomerBaseUrlTail = "&_method=PUT";
const updateAddress = "&main_location[street_address][]=";
const updateCity = "&main_location[town][]=";
const updateState = "&main_location[county_province_state][]=";
const updateZip = "&main_location[postcode][]=";
const updatePhone = "&main_location[telephone][]=";

module.exports = {
  getAllCustomers: (req, res, next) => {
    axios
      .get(baseUrl + apiKey)
      .then(response => {
        res.status(200).json(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },

  getCustomerByID: (req, res, next) => {
    axios
      .get(baseUrl + apiKey + filterIdHead + req.query.id + filterIdTail)
      .then(response => {
        res.status(200).json(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },

  getCustomerByName: (req, res, next) => {
    console.log(req.query);
    axios
      .get(baseUrl + apiKey + filterNameHead + req.query.name + filterNameTail)
      .then(response => {
        res.status(200).json(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
