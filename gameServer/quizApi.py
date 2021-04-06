from flask import Flask, request, Response
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask import jsonify
import os
from sqlalchemy import and_
from flask_sqlalchemy import SQLAlchemy



app = Flask(__name__)
# SQLAlchemy config. Read more: https://flask-sqlalchemy.palletsprojects.com/en/2.x/
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Quiz.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

cors = CORS(app)
ma = Marshmallow(app)


with app.app_context():
    db.create_all()

class Quiz(db.Model):
    __tablename__ = "quiz"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    subject = db.Column(db.Text, nullable=False)
    topic = db.Column(db.Text, nullable=False)
    cert = db.Column(db.Text, nullable=False)
    questions = db.relationship("Question", backref="questions", lazy='dynamic')
    def __init__(self,title, subject,topic,cert):
        self.title = title
        self.subject = subject
        self.topic = topic
        self.cert = cert



class Question(db.Model):
    __tablename__ = "questions"
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
    correctAnswer = db.Column(db.Text, nullable=False)
    answer1 = db.Column(db.Text, nullable=False)
    answer2 = db.Column(db.Text, nullable=False)
    answer3 = db.Column(db.Text, nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz.id'))
    quiz = db.relationship('Quiz')
    def __init__(self, question,correctAnswer,answer1,answer2,answer3):
        self.question = question
        self.correctAnswer = correctAnswer
        self.answer1 = answer1
        self.answer2 = answer2
        self.answer3 = answer3
    


class QuestionSchema(ma.Schema):
    class Meta:
        model = Question
        fields = ("question", "correctAnswer", "answer1", "answer2", "answer3")


class QuizSchema(ma.Schema):
    class Meta:
        model = Quiz
        fields = ("id","title","subject","topic", "cert")


quizSchema = QuizSchema(many=True)
questionSchema = QuestionSchema(many=True)






@app.route('/createQuiz', methods=['POST'])
def createQuiz():
    print('hello')
    content = request.json
    title = content['title']

    subject=content['subject']
    topic=content['topic']
    cert=content['cert']
    questions=content['questions']
    quiz=Quiz(title=title,subject=subject,topic=topic,cert=cert)
    for q in questions:
        question=Question(question=q['question'],correctAnswer=q['correctAnswer'],answer1=q['answer1'],answer2=q['answer2'],answer3=q['answer3'])
        quiz.questions.append(question)
        db.session.add(question)
    db.session.add(quiz)
    db.session.commit()
    schema=QuizSchema()
    return 'Created Quiz', 200
        
@app.route('/getQuizs', methods=['GET'])
def getQuizs():
    print('hello')

    content = request.args['subject']
    results = Quiz.query.filter(Quiz.subject.ilike(content)).limit(15).all()
    quizData=quizSchema.dump(results)
    print(quizData)
    return jsonify(quizData)
        
@app.route('/getQuizQuestions', methods=['GET'])
def getQuestions():
  
    print('content')

    content = request.args['id']
    print(content)

    results = Question.query.filter(Question.quiz_id==content).all()
    print(results)
    questionData=questionSchema.dump(results)
    print(questionData)
    return jsonify(questionData)
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=85)
