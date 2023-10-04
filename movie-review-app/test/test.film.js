let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../app')

// Assertion Style
chai.should()

chai.use(chaiHttp);


describe('Film Api', ()=>{
    
    // Test Get All Route
    describe("GET /film/get_all", () => {
        it("It should GET all the Fims", (done) => {
            chai.request(server)
                .get("/film/get_all")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.data.should.be.a('array');
                done();
                });
        });

    })


    // Test Get By Id Route
    describe("GET /film/get_by_id/:id", () => {
            it("It should GET Film By Id", (done) => {
                const filmId = '601e4bcd6453c30015439ec0';
                chai.request(server)
                    .get("/film/get_by_id/"+filmId)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.data[0].should.have.property('name');
                        response.body.data[0].should.have.property('description');
                        response.body.data[0].should.have.property('realeaseDate');
                        response.body.data[0].should.have.property('rating');
                        response.body.data[0].should.have.property('ticketPrice');
                        response.body.data[0].should.have.property('country');
                        response.body.data[0].should.have.property('genre');
                    done();
                    });
            });
    
    
        });
    

})