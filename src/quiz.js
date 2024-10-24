class Quiz {
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions
        this.timeLimit = timeLimit
        this.timeRemaining = timeRemaining
        this.correctAnswers = 0
        this.currentQuestionIndex = 0
    }

    getQuestion() {
        return this.questions[this.currentQuestionIndex]
    }

    moveToNextQuestion() {
        this.currentQuestionIndex++
    }
    // this.question.sort(() => .5 - Math.random());

    shuffleQuestions() {
        this.questions.sort(() => .5 - Math.random());
    }

    checkAnswer(answerToCheck) {
        const correctAnswer = this.getQuestion().answer
        if (answerToCheck === correctAnswer) {
            this.correctAnswers++
        }
    }

    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length
    }

    filterQuestionsByDifficulty(difficulty) {

        if (difficulty >= 1 && difficulty <= 3) {
            this.questions = this.questions.filter(eachQuestion =>
                eachQuestion.difficulty === difficulty
            )
        }
    }
    averageDifficulty() {

        const sumDifficulty = this.questions.reduce((acc, eachQuestion) => {
            return acc + eachQuestion.difficulty
        }, 0)
        return sumDifficulty / this.questions.length
    }

}