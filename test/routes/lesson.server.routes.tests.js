/**
 * Module dependencies.
 */
const should = require('should');
const request = require('supertest');
const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const LessonModule = mongoose.model('LessonModule');
const Lesson = mongoose.model('Lesson');
const Group = mongoose.model('Group');

import express from '../../config/express';


/**
 * Globals
 */
let app;
let agent;
let group;
let course;
let lessonModule1;
let lessonModule2;
let lesson;
/**
 * Unit tests
 */
 /*eslint-disable*/
describe('Lesson Controller Unit Tests:', function () {

  before(done => {
    app = express();
    agent = request.agent(app);
    done();
  })

  beforeEach(done => {
    course = new Course({
      name: '春季课程',
      lesson_modules: [],
      period: '春季',
      memo: '挺好的课',
    });
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
    group = new Group({
      name: '初三1班',
      type: '12人班',
      master: 'TJ',
    });
    lesson = {
      date: new Date(2006,0,12),
      process: '未开始',
    }
    // lessonModule1.save(err => {
    //   lessonModule2.save(err => {
    //     course.lesson_modules.push(lessonModule1);
    //     course.lesson_modules.push(lessonModule2);
    //     course.save((err)=>{
    //         if(err){
    //           done(err);
    //         }
    //         done();
    //     });
    //   });
    // });
lessonModule1.save()
.then(doc =>{
  lessonModule2.save();
}).then(doc =>{
  course.lesson_modules.push(lessonModule1);
  course.lesson_modules.push(lessonModule2);
  course.save();
}).then(doc=>{
  group.course = course;
  group.save()
}).then(doc =>{
  done()
}).catch(err=>{
  done(err)
})



  });


  it('should be able to produce lessons with group', done => {
    this.timeout(10000);
    lesson.group = group;
    lesson.lesson_module = group.course.lesson_modules[0];
    // console.log(lesson);
    agent.post('/lessons')
    .send(lesson)
    .expect(200)
    .end((lessonSaveErr, lessonSaveRes) => {
      if (lessonSaveErr) {
        return done(lessonSaveErr);
      }
      agent.get('/lessons')
      .expect(200)
      .end((lessonGetErr, lessonGetRes) => {
        const lessons = lessonGetRes.body;
        (lessons[0].lesson_module.name).should.match('Tj');
        (lessons[0].group.name).should.match('初三1班');
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
    Course.remove().exec();
    Group.remove().exec();
    Lesson.remove().exec(done);
  });
});
/*eslint-enable*/
