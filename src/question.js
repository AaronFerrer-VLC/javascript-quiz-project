class Question {
    // YOUR CODE HERE:
    constructor(textValue, choicesValue, answerValue, difficultyValue) {
        this.text = textValue
        this.choices = choicesValue
        this.answer = answerValue
        this.difficulty = difficultyValue
    }

    shuffleChoices() {
        for (let i = this.choices.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]];
        }
    }
}