angular.module("app").service("customerSrvc", function($http) {
  var baseUrl = "https://secure.workbooks.com/crm/organisations.api?";
  var apiKey =
    "api_key=49591-ebf97-35abc-82f3f-e2179-97b60-eb671-5832c&client=api&api_version[]=1";
  var getColumns = '&_select_columns=["name","id","lock_version"]';

  var filterNameHead = '&_filter_json=[["name","ct","';
  var filterNameTail = '"]]';

  var filterIdHead = '&_filter_json=[["id","eq","';
  var filterIdTail = '"]]';

  var url = "";
  var self = this;

  var apiMethod = "";

  // Return all customers
  this.getAllCustomers = function() {
    return $http.get("/api/customers").then(function(response) {
      console.log("used new endpoint");
      return response.data;
    });
  };

  // Return customers filtered by name
  this.getCustomers = function(filterStr) {
    console.log(
      "Filter in service: " + filterNameHead + filterStr + filterNameTail
    );
    return $http
      .get("/api/customersbyname/?name=" + filterStr)
      .then(function(response) {
        self.customers = response.data;
        return response.data;
      });
  };

  // Return customers info for one ID
  this.getCustomerDetail = function(id) {
    console.log("Detail for ID: " + id + " (from service)");
    return $http
      .get(baseUrl + apiKey + filterIdHead + id + filterIdTail)
      .then(function(response) {
        self.customerDetail = response.data;
        return self.customerDetail;
      });
  };

  var updateCustomerBaseUrlHead =
    "https://secure.workbooks.com/crm/organisations.api?api_key=49591-ebf97-35abc-82f3f-e2179-97b60-eb671-5832c&client=api&api_version[]=1&lock_version[]=";
  var updateCustomerBase2 = "&id[]=";
  var updateCustomerBase3 = "&name[]=";
  var updateCustomerBase4 = "&_ff[]=id&_ft[]=eq&_fc[]=";
  var updateCustomerBaseUrlTail = "&_method=PUT";
  var updateAddress = "&main_location[street_address][]=";
  var updateCity = "&main_location[town][]=";
  var updateState = "&main_location[county_province_state][]=";
  var updateZip = "&main_location[postcode][]=";
  var updatePhone = "&main_location[telephone][]=";

  // Update Customer
  this.updateCustomer = function(custForApi) {
    var buildUrl =
      updateCustomerBaseUrlHead +
      custForApi.lock_version +
      updateCustomerBase2 +
      custForApi.id +
      updateCustomerBase3 +
      custForApi.name +
      updateCustomerBase4 +
      custForApi.id +
      updateCustomerBaseUrlTail +
      updateAddress +
      custForApi.address +
      updateCity +
      custForApi.city +
      updateState +
      custForApi.state +
      updateZip +
      custForApi.zip +
      updatePhone +
      custForApi.phone;

    console.log(
      "Update Customer ID: " +
        custForApi.id +
        " with lock version: " +
        custForApi.lock_version +
        " to name " +
        custForApi.name +
        " (log from service)" +
        updatePhone +
        custForApi.phone
    );
    return $http({
      method: "POST",
      url: buildUrl,
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function(response) {
      //  console.log(response)
      //  console.log(response.data.affected_objects[0])
      return response.data.affected_objects[0];
    });
  };

  var deleteCustomerBaseUrlHead =
    "https://secure.workbooks.com/crm/organisations.api?api_key=49591-ebf97-35abc-82f3f-e2179-97b60-eb671-5832c&client=api&api_version[]=1&lock_version[]=";
  var deleteCustomerBase2 = "&id[]=";
  // var deleteCustomerBase3 = '&name[]='
  var deleteCustomerBase4 = "&_ff[]=id&_ft[]=eq&_fc[]=";
  var deleteCustomerBaseUrlTail = "&_method=DELETE";

  // Delete Customer
  this.deleteCustomer = function(id, lock_version) {
    var buildUrl =
      deleteCustomerBaseUrlHead +
      lock_version +
      deleteCustomerBase2 +
      id +
      deleteCustomerBase4 +
      id +
      deleteCustomerBaseUrlTail;
    console.log(
      "DELETE Customer ID: " +
        id +
        " with lock version: " +
        lock_version +
        " (log from service)"
    );
    return $http({
      method: "POST",
      url: buildUrl,
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function(response) {
      console.log(response);
      //  console.log(response.data.affected_objects[0])
      return response.data.affected_objects[0];
    });
  };

  var addUrl =
    "https://secure.workbooks.com/crm/organisations.api?api_key=49591-ebf97-35abc-82f3f-e2179-97b60-eb671-5832c&client=api&api_version=1&name=";
  // Add New Customer
  this.addNewCustomer = function(name) {
    console.log("Create New Customer: " + name + "(log from service)");
    return $http.post(addUrl + name).then(function(response) {
      self.newCustomer = response;
      return self.newCustomer;
    });
  };

  var testurl =
    "https://cors-anywhere.herokuapp.com/https://secure.workbooks.com/crm/organisations.api?api_key=49591-ebf97-35abc-82f3f-e2179-97b60-eb671-5832c&client=api&api_version=1";
  var testurl2 =
    "https://secure.workbooks.com/crm/organisations.api?api_key=49591-ebf97-35abc-82f3f-e2179-97b60-eb671-5832c&client=api&api_version=1";
});
