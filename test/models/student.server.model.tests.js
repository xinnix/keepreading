
/**
 * Module dependencies.
 */

const should = require('should');
const mongoose = require('mongoose');
const Student = mongoose.model('Student');

/*eslint-disable */
/**
 * Globals
 */
let student;
/**
 * Unit tests
 */
describe('Student Model Unit Tests:', function () {

  beforeEach(done => {
    student = new Student({
      student_id: '10000',
      name: 'full name',
      gender: 'male',
      grade: '初三',
      school: '西工大',
      phone: '15349216763',
      birthday: Date.now(),
      address: '长安中路',
      password: 'tj',
    });
    done();
  });

  it('should be able to save without problems', done => {
    this.timeout(10000);
    return student.save(err => {
      should.not.exist(err);
      done();
    });
  });

  it('should be able to show an error when try to save group with num', done =>{
    this.timeout(10000);
    student.group = 123;
    return student.save(function (err) {
      should.exist(err);
      done();
    });
  });


  afterEach(function (done) {
    Student.remove().exec(done);
  });
});

/*eslint-enable */
