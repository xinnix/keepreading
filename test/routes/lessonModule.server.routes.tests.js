/**
 * Module dependencies.
 */
const should = require('should');
const request = require('supertest');
const mongoose = require('mongoose');
const LessonModule = mongoose.model('LessonModule');

import express from '../../config/express';


/**
 * Globals
 */
let app;
let agent;
let lessonModule;
/**
 * Unit tests
 */
 /*eslint-disable*/
describe('LessonModule Controller Unit Tests:', function () {

  before(done => {
    app = express();
    agent = request.agent(app);
    done();
  })

  beforeEach(done => {

    lessonModule = {
      name: 'Tj',
      period: 'Tj',
      textbook: 'Tj',
      exercise: 'Tj',
      test: 'Tj',
      homework: Date.now(),
      memo: 'Tj',
    };



    done();
  });


  it('should be able to save LessonModule', done => {
    this.timeout(10000);
    agent.post('/LessonModules')
    .send(lessonModule)
    .expect(200)
    .end((LessonModuleSaveErr, LessonModuleSaveRes) => {
      if (LessonModuleSaveErr) {
        return done(LessonModuleSaveErr);
      }
      agent.get('/LessonModules')
      .expect(200)
      .end((LessonModuleGetErr, LessonModuleGetRes) => {
        const LessonModules = LessonModuleGetRes.body;
        (LessonModules[0].name).should.match('Tj');
        done();
      });
    });
  });
  // it('should be able to update student', done => {
  //   this.timeout(10000);
  //   agent.post('/students')
  //   .send(student)
  //   .expect(200)
  //   .end((studentSaveErr, studentSaveRes) => {
  //     if (studentSaveErr) {
  //       return done(studentSaveErr);
  //     }
  //     student.address = '王曲';
  //     agent.put('/students/'+studentSaveRes.body._id)
  //     .send(student)
  //     .expect(200)
  //     .end((studentUpdateErr, studentUpdateRes) => {
  //       if (studentUpdateErr) {
  //         return done(studentUpdateErr);
  //       }
  //       (studentUpdateRes.body.student_id).should.equal(student.student_id);
  //       (studentUpdateRes.body.address).should.match('王曲');
  //       done();
  //     });
  //
  //   });
  // });
  // it('should be able to delete student', done => {
  //   this.timeout(10000);
  //   agent.post('/students')
  //   .send(student)
  //   .expect(200)
  //   .end((studentSaveErr, studentSaveRes) => {
  //     if (studentSaveErr) {
  //       return done(studentSaveErr);
  //     }
  //     agent.delete('/students/'+studentSaveRes.body._id)
  //     .send(student)
  //     .expect(200)
  //     .end((studentDeleteErr, studentDeleteRes) => {
  //       if (studentDeleteErr) {
  //         return done(studentDeleteErr);
  //       }
  //       (studentDeleteRes.body._id).should.equal(studentSaveRes.body._id);
  //       done();
  //     });
  //
  //   });
  // });
  //

  afterEach(function (done) {
    LessonModule.remove().exec(done);
  });
});
/*eslint-enable*/
