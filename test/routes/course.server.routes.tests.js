/**
 * Module dependencies.
 */
const should = require('should');
const request = require('supertest');
const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const LessonModule = mongoose.model('LessonModule');

import express from '../../config/express';


/**
 * Globals
 */
let app;
let agent;
let course;
let lessonModule1;
let lessonModule2;
/**
 * Unit tests
 */
 /*eslint-disable*/
describe('Course Controller Unit Tests:', function () {

  before(done => {
    app = express();
    agent = request.agent(app);
    done();
  })

  beforeEach(done => {
    course = {
      name: '春季课程',
      lesson_modules: [],
      period: '春季',
      memo: '挺好的课',
    };
    lessonModule1 = new LessonModule({
      name: 'Tj',
      period: 'Tj',
      textbook: 'Tj',
      exercise: 'Tj',
      test: 'Tj',
      homework: Date.now(),
      memo: 'Tj',
    });
    lessonModule2 = new LessonModule({
      name: 'Tj1',
      period: 'Tj1',
      textbook: 'Tj1',
      exercise: 'Tj1',
      test: 'Tj1',
      homework: Date.now(),
      memo: 'Tj1',
    });

    lessonModule1.save(err => {
      lessonModule2.save(err => {
        done();
      })
    })

  });


  it('should be able to save couse with 2 lessonModule', done => {
    this.timeout(10000);
    course.lesson_modules.push(lessonModule1);
    course.lesson_modules.push(lessonModule2);
    agent.post('/courses')
    .send(course)
    .expect(200)
    .end((courseSaveErr, courseSaveRes) => {
      if (courseSaveErr) {
        return done(courseSaveErr);
      }
      agent.get('/courses')
      .expect(200)
      .end((courseGetErr, courseGetRes) => {
        const courses = courseGetRes.body;
        (courses[0].lesson_modules[0].name).should.match('Tj');
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
    LessonModule.remove().exec();
    Course.remove().exec(done);
  });
});
/*eslint-enable*/
