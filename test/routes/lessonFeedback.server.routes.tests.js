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
const Student = mongoose.model('Student');
const LessonFeedback = mongoose.model('LessonFeedback');

import express from '../../config/express';


/**
 * Globals
 */
let app;
let agent;
let group;
let course;
let student;
let lessonModule1;
let lessonModule2;
let lessonFeedback;
let lesson;
/**
 * Unit tests
 */
 /*eslint-disable*/
describe('lessonFeedback Controller Unit Tests:', function () {

  before(done => {
    app = express();
    agent = request.agent(app);
    done();
  })

  beforeEach(done => {

    lessonModule1 = new LessonModule({
      name: 'Tj',
      period: 'Tj',
      textbook: 'Tj',
      exercise: 'Tj',
      test: 'Tj',
      homework: Date.now(),
      memo: 'Tj',
    });

    group = new Group({
      name: '初三1班',
      type: '12人班',
      master: 'TJ',
    });
    lesson = new Lesson({
      lesson_module: lessonModule1,
      group: group,
      date: new Date(2006,0,12),
      process: '未开始',
    });
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
lessonFeedback = {
  student,
  lesson,
  attendance: true,
  score: 100,
  resit: 20,
  perform: '不错',
  homework: '1,2,3',
  error_questions: '没问题',
  teacher_estimation: '老张',
  instrution: '多学习',
  additional_tasks: '222',
}



lessonModule1.save()
.then(doc=>{

  group.save()
}).then(doc=>{
  lesson.save()
}).then(doc =>{
  student.save();
  done()
}).catch(err=>{
  done(err)
})



  });


  it('should be able to save lessonFeedbacks with lesson', done => {
    this.timeout(10000);

    agent.post('/lessonFeedbacks')
    .send(lessonFeedback)
    .expect(200)
    .end((lessonFeedbackSaveErr, lessonFeedbackSaveRes) => {
      if (lessonFeedbackSaveErr) {
        return done(lessonFeedbackSaveErr);
      }
      agent.get('/lessonFeedbacks')
      .expect(200)
      .end((lessonFeedbackGetErr, lessonFeedbackGetRes) => {
        const lessonFeedbacks = lessonFeedbackGetRes.body;
        (lessonFeedbacks[0].lesson.process).should.match('未开始');
        (lessonFeedbacks[0].student.name).should.match('full name');

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
    Group.remove().exec();
    Lesson.remove().exec();
    Student.remove().exec();
    LessonFeedback.remove().exec(done);
  });
});
/*eslint-enable*/
