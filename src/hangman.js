class Hangman
{ 
    constructor(word, guesses, guessed = []){
    this.word = word.toLowerCase().split('')
    this.remainingGuesses = guesses
    this.guessed = guessed
    this.status = 'playing'
    }

    get puzzle(){
        let puzzle = ''
        this.word.forEach((letter) => {
        this.guessed.includes(letter) || letter === ' ' ? puzzle += letter : puzzle +='*'
        });
        return  puzzle
    }

    guess(letter){
        if(this.status === 'playing') {
        letter =  letter.toLowerCase()
        if(this.guessed.includes(letter))  
            return
        else 
            {
                this.guessed.push(letter);
                if(!this.word.includes(letter))
                    {
                        this.remainingGuesses--;
                        let svg = document.querySelector(`#svg_${this.remainingGuesses}`)
                        svg.style.visibility='visible'
                    }
                
            }
        this.calculateStatus()
        }
        else return 
    }

    calculateStatus(){
        const finished = this.word.every((letter) => this.guessed.includes(letter) || letter === ' ')

        if(this.remainingGuesses <= 0 )
            this.status = 'failed'

        else if(finished)
            this.status = 'finished'

        else this.status = 'playing'
    }

    get statusMessage(){
        if(this.status === 'playing')
            return `remaining guesses: ${this.remainingGuesses}`
        if(this.status === 'finished'){
            document.querySelectorAll('[id^="svg_"]').forEach((stick)=>{
                stick.style.visibility='hidden'
            })
            
            document.querySelector('#YouWin').style.visibility = 'visible'
            return 'Good job! You guessed the word.'
        }
        if(this.status === 'failed'){
            document.querySelector('#svg_SadFace').style.visibility='visible'
            return `Too bad. You're a loser. The word was \"${this.word.join('')}\"`
        }
    }
}

export {Hangman as default}