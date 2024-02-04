import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {

  title: string = ""
  imageSrc: string = '';
  text: string = ""

  questions: any
  questionSelected: any

  answers: string[] = []
  answerSelected: any;

  questionIndex: number = 0
  questionMaxIndex: number = 0

  finished: boolean = false

  constructor() { }

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
      this.imageSrc = this.questionSelected.image;

      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    }
  }

  playerChoose(value: string) {
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep() {
    this.questionIndex += 1

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer: string = await this.checkResult(this.answers)
      this.finished = true
      const result = quizz_questions.results[0] as {
        [key: string]: {
          text: string;
          img: string;
        };
      };
      this.answerSelected = result[finalAnswer];
    }
  }

  async checkResult(answers: string[]) {
    //Frequency of results at array in [ A, B, C, D or E ] 
    const result = answers.reduce((previous, current, index, array) => {
      if (array.filter(item => item === previous).length > array.filter(item => item === current).length) {
        return previous
      } else {
        return current
      }
    })
    return result
  }

  remakeQuizz() {
    this.answers = [];
    this.questionIndex = 0;
    this.finished = false;

    this.questionSelected = this.questions[this.questionIndex];
    this.answerSelected = '';
    this.imageSrc = '';
  }

}
