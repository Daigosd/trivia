class TriviaGame {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.questions = [
            {
                question: "¿Cuál es el planeta más cercano al Sol?",
                options: ["Tierra", "Mercurio", "Venus", "Marte"],
                correct: 1
            },
            {
                question: "¿Cuál es el planeta más grande del sistema solar?",
                options: ["Saturno", "Júpiter", "Urano", "Neptuno"],
                correct: 1
            },
            {
                question: "¿Qué es la Vía Láctea?",
                options: ["Un planeta", "Una galaxia", "Una estrella", "Un cometa"],
                correct: 1
            },
            {
                question: "¿Cuál es el satélite natural de la Tierra?",
                options: ["Marte", "Venus", "La Luna", "El Sol"],
                correct: 2
            },
            {
                question: "¿Qué planeta es conocido como el 'planeta rojo'?",
                options: ["Venus", "Marte", "Júpiter", "Saturno"],
                correct: 1
            },
            {
                question: "¿Cuál es la estrella más cercana a la Tierra?",
                options: ["Sirio", "El Sol", "Proxima Centauri", "Alfa Centauri"],
                correct: 1
            },
            {
                question: "¿Qué es un meteorito?",
                options: ["Una estrella", "Un planeta", "Un fragmento de roca espacial", "Una galaxia"],
                correct: 2
            },
            {
                question: "¿Cuál es el primer planeta en ser explorado por una nave espacial?",
                options: ["Marte", "Venus", "Mercurio", "Júpiter"],
                correct: 1
            },
            {
                question: "¿Qué significa NASA?",
                options: ["National Aeronautics and Space Administration", "North American Space Agency", "National Space Administration", "North Atlantic Space Association"],
                correct: 0
            },
            {
                question: "¿Cuál es el planeta más caliente del sistema solar?",
                options: ["Mercurio", "Venus", "Tierra", "Marte"],
                correct: 1
            }
        ];

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateProgress();
    }

    bindEvents() {
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('restart-btn').addEventListener('click', () => this.restartGame());
        
        // Agregar event listeners a las opciones
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectAnswer(e));
        });
    }

    startGame() {
        this.showScreen('question-screen');
        this.loadQuestion();
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    loadQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.endGame();
            return;
        }

        const question = this.questions[this.currentQuestion];
        
        document.getElementById('question-text').textContent = question.question;
        document.getElementById('question-number').textContent = `Pregunta ${this.currentQuestion + 1}`;
        document.getElementById('score').textContent = `Puntuación: ${this.score}`;
        
        // Actualizar opciones
        const optionsContainer = document.querySelector('.options');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.dataset.correct = index === question.correct;
            button.addEventListener('click', (e) => this.selectAnswer(e));
            optionsContainer.appendChild(button);
        });

        // Limpiar feedback anterior
        document.getElementById('feedback').className = 'feedback';
        document.getElementById('feedback').textContent = '';
        
        this.updateProgress();
    }

    selectAnswer(event) {
        const selectedButton = event.target;
        const isCorrect = selectedButton.dataset.correct === 'true';
        
        // Deshabilitar todos los botones
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.correct === 'true') {
                btn.classList.add('correct');
            } else if (btn === selectedButton && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });

        // Mostrar feedback
        const feedback = document.getElementById('feedback');
        if (isCorrect) {
            this.score++;
            feedback.textContent = '¡Correcto! 🎉';
            feedback.className = 'feedback correct show';
        } else {
            feedback.textContent = 'Incorrecto. La respuesta correcta está marcada en verde.';
            feedback.className = 'feedback incorrect show';
        }

        // Actualizar puntuación
        document.getElementById('score').textContent = `Puntuación: ${this.score}`;

        // Continuar después de 2 segundos
        setTimeout(() => {
            this.currentQuestion++;
            this.loadQuestion();
        }, 2000);
    }

    updateProgress() {
        const progress = (this.currentQuestion / this.questions.length) * 100;
        document.querySelector('.progress-fill').style.width = `${progress}%`;
    }

    endGame() {
        document.getElementById('final-score').textContent = this.score;
        
        let message = '';
        if (this.score >= 9) {
            message = '¡Excelente! Eres un experto en astronomía! 🌟';
        } else if (this.score >= 7) {
            message = '¡Muy bien! Tienes buenos conocimientos del espacio! 🚀';
        } else if (this.score >= 5) {
            message = '¡Bien! Sabes lo básico sobre el espacio! 🌍';
        } else {
            message = '¡Sigue aprendiendo! El espacio es fascinante! 📚';
        }
        
        document.getElementById('score-message').textContent = message;
        this.showScreen('result-screen');
    }

    restartGame() {
        this.currentQuestion = 0;
        this.score = 0;
        this.showScreen('start-screen');
    }
}

// Inicializar el juego cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
    new TriviaGame();
});
