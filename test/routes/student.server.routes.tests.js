/**
 * Module dependencies.
 */
const should = require('should');
const request = require('supertest');
const mongoose = require('mongoose');
const Student = mongoose.model('Student');
const Group = mongoose.model('Group');

import express from '../../config/express';


/**
 * Globals
 */
let app;
let agent;
let student;
let group;
/*eslint-disable*/
/**
 * Unit tests
 */
describe('Student Controller Unit Tests:', function () {

  before(done => {
    app = express();
    agent = request.agent(app);
    done();
  })

  beforeEach(done => {

    group = new Group({
      name: '初三1班',
      type: '12人班',
      master: 'TJ',
    })
    student = {
      student_id: '10000',
      name: 'full name',
      gender: 'male',
      grade: '初三',
      school: '西工大',
      phone: '15349216763',
      birthday: Date.now(),
      address: '长安中路',
      password: 'tj',
    };
    done();
  });


  it('should be able to save student', done => {
    this.timeout(20000);
    group.save((err,group)=>{
      student.group = group
      agent.post('/students')
      .send(student)
      .expect(200)
      .end((studentSaveErr, studentSaveRes) => {
        if (studentSaveErr) {
          return done(studentSaveErr);
        }
        agent.get('/students')
        .expect(200)
        .end((studentGetErr, studentGetRes) => {
          const students = studentGetRes.body;
          (students[0].student_id).should.equal(student.student_id);
          (students[0].name).should.match('full name');
          (students[0].group.name).should.match('初三1班');

          done();
        });
      });
    });
  });
  it('should be able to update student', done => {
    this.timeout(10000);
    agent.post('/students')
    .send(student)
    .expect(200)
    .end((studentSaveErr, studentSaveRes) => {
      if (studentSaveErr) {
        return done(studentSaveErr);
      }
      student.address = '王曲';
      agent.put('/students/'+studentSaveRes.body._id)
      .send(student)
      .expect(200)
      .end((studentUpdateErr, studentUpdateRes) => {
        if (studentUpdateErr) {
          return done(studentUpdateErr);
        }
        (studentUpdateRes.body.student_id).should.equal(student.student_id);
        (studentUpdateRes.body.address).should.match('王曲');
        done();
      });

    });
  });
  it('should be able to delete student', done => {
    this.timeout(10000);
    agent.post('/students')
    .send(student)
    .expect(200)
    .end((studentSaveErr, studentSaveRes) => {
      if (studentSaveErr) {
        return done(studentSaveErr);
      }
      agent.delete('/students/'+studentSaveRes.body._id)
      .send(student)
      .expect(200)
      .end((studentDeleteErr, studentDeleteRes) => {
        if (studentDeleteErr) {
          return done(studentDeleteErr);
        }
        (studentDeleteRes.body._id).should.equal(studentSaveRes.body._id);
        done();
      });

    });
  });


  afterEach(function (done) {
    Group.remove().exec();
    Student.remove().exec(done);
  });
});
/*eslint-enable*/
