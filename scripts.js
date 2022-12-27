class Customer {
  constructor(name, city, state, email) {
    this.name = name;
    this.city = city;
    this.state = state;
    this.email = email;
  }
  get isCustomerValid() {
    let isValid = true;
    const states = [
      "NE",
      "IA",
      "MN",
      "WI",
      "MI",
      "IL",
      "IN",
      "OH",
      "PA",
      "MD",
      "NJ",
    ];
    //since state comes from a select box, a state will always be selected, and only ever one from the list
    const pattern = new RegExp("^[w.-]+@[w.-]+.[a-zA-Z]+$");
    if (this.name == null || this.name == "") {
      isValid = false;
      $("#name_error").text("Please enter a name.");
    }
    if (this.city == null || this.city == "") {
      isValid = false;
      $("#city_error").text("Please enter a city.");
    }
    if (this.email == null || this.email == "") {
      isValid = false;
      $("#email_error").text("Please enter a valid email.");
    }
    if (pattern.test(this.email)) {
      isValid = false;
      $("#email_error").text("Please enter a valid email.");
    }
    if (isValid) {
      return true;
    } else {
      return false;
    }
  }
}
const cust1 = new Customer('Thomas Anderson', 'Lower Downtown', 'NE', 'Thechosen@mail.com');
const cust2 = new Customer('Trinity', 'Upper Downtown', 'IL', 'FirstMate@nebuchadnezzar.com');

let customerArray = [cust1, cust2];
$(document).ready(() => {
  $("#add").click(() => {
    // console.log('hi');
    let newCustomer = new Customer(
      $("#name").val(),
      $("#city").val(),
      $("#state").val(),
      $("#email").val()
    );
    if (newCustomer.isCustomerValid == true) {
      console.log("its good");
      let customerExists = false;
      customerArray.forEach((Customer) => {
        if (newCustomer.email.toLowerCase() == Customer.email.toLowerCase()) {
          $("#customer_error").text("There is already a user with this email");
          customerExists = true;
        }
      });
      if (customerExists == false) {
        $("#customer_error").text("");
        customerArray.push(newCustomer);
      }
      $("#name").val("");
      $("#city").val("");
      $("#state").val("NE");
      $("#email").val("");
      $("#name_error").text("");
      $("#city_error").text("");
      $("#state_error").text("");
      $("#email_error").text("");
    } else {
      console.log("not good");
      newCustomer = new Customer();
    }
    $("#list").empty();
    customerArray.forEach((Customer) => {
      $("#list").append(
        "<li>" +
          Customer.email +
          "</li><ul><li>" +
          Customer.name +
          "</li><li>" +
          Customer.city +
          ", " +
          Customer.state +
          "</li></ul>"
      );
    });
  });
});
