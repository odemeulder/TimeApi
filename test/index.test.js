const axios = require('axios')

describe("Time Api Test", function() {

  describe("Returns a time", function() {

    var url = "http://localhost:3000/time";

    it("returns status 200", function() {
      axios.get(url).then(function(error, response, body) {
          expect(response.statusCode).to.equal(200)
        }).catch(() => {})
    })
  })

  describe("return not found error", function() {
    var url = "http://localhost:3000/something"

    it("returns status 403", function() {
      axios.get(url).then(function(error, response, body) {
        expect(response.statusCode).to.equal(403)
      }).catch(() => {})
    })
  })
})