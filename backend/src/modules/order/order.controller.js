const autoBind = require("auto-bind");

class OrderController {
  #services;
  constructor() {
    autoBind(this);
  }

  
}

module.exports = new OrderController();
