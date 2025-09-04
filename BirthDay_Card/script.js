document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
            document.getElementById('welcomeScreen').style.display = 'flex';
        }, 500);
    }, 2000);

    // Initialize variables
    const startBtn = document.getElementById('startBtn');
    const mainCard = document.getElementById('mainCard');
    const musicToggle = document.getElementById('musicToggle');
    const voiceNoteBtn = document.getElementById('voiceNoteBtn');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const voiceNote = document.getElementById('voiceNote');
    const heartButton = document.getElementById('heartButton');
    const surpriseMessage = document.getElementById('surpriseMessage');
    const fireworksBtn = document.getElementById('fireworksBtn');
    const fireworksContainer = document.getElementById('fireworksContainer');
    const gameMessage = document.getElementById('gameMessage');
    const balloonContainer = document.getElementById('balloonContainer');
    
    let musicPlaying = false;
    let currentSlide = 0;
    let balloonsPopped = 0;
    const totalBalloons = 10;
    const messages = [
        "You're amazing! 💖",
        "I love your smile! 😊",
        "You make me happy! 🌈",
        "Your eyes are beautiful! 👀",
        "You're my sunshine! ☀",
        "I'm lucky to have you! 🍀",
        "You're incredible! 🔥",
        "My favorite person! 🥰",
        "You're perfect! 💯",
        "Happy Birthday! 🎂"
    ];

    // Start button event
    startBtn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            document.getElementById('welcomeScreen').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('welcomeScreen').style.display = 'none';
                mainCard.style.display = 'block';
                startAnimations();
                startSlideshow();
                createFloatingElements();
                initializeCountdown();
                createBalloonGame();
            }, 500);
        }, 200);
    });

    // Audio controls
    musicToggle.addEventListener('click', function() {
        if (musicPlaying) {
            backgroundMusic.pause();
            this.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            backgroundMusic.play().catch(e => console.log("Audio play failed:", e));
            this.innerHTML = '<i class="fas fa-pause"></i>';
        }
        musicPlaying = !musicPlaying;
    });

    voiceNoteBtn.addEventListener('click', function() {
        voiceNote.play().catch(e => console.log("Voice note play failed:", e));
    });

    // Heart button event
    heartButton.addEventListener('click', function() {
        surpriseMessage.style.display = 'block';
        setTimeout(() => {
            surpriseMessage.style.opacity = '1';
            surpriseMessage.style.transform = 'translateY(0)';
        }, 10);
    });

    // Fireworks button event
    fireworksBtn.addEventListener('click', function() {
        this.style.display = 'none';
        fireworksContainer.style.display = 'block';
        createFireworks();
        
        setTimeout(() => {
            document.querySelector('.final-message').style.opacity = '1';
            document.querySelector('.final-message').style.transform = 'translate(-50%, -50%) scale(1)';
        }, 1000);
    });

    // Typewriter effect for greeting
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize countdown timer
    function initializeCountdown() {
        // Set the birthday date (September 15, 2025)
        const birthdayDate = new Date('September 15, 2025 00:00:00').getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = birthdayDate - now;
            
            if (distance < 0) {
                document.getElementById('days').innerHTML = '00';
                document.getElementById('hours').innerHTML = '00';
                document.getElementById('minutes').innerHTML = '00';
                document.getElementById('seconds').innerHTML = '00';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
            document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
            document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Start animations
    function startAnimations() {
        // Animate greeting
        typeWriter(document.getElementById('greeting'), "Happy Birthday, Payel! ❤");
        
        // Animate love letter text
        const letterParagraphs = document.querySelectorAll('.typewriter-text');
        letterParagraphs.forEach((para, index) => {
            setTimeout(() => {
                para.style.opacity = '1';
                para.style.transform = 'translateY(0)';
                typeWriter(para, para.textContent, 50);
            }, 1000 + (index * 3000));
        });
    }

    // Slideshow functionality
    function startSlideshow() {
        const slides = document.querySelectorAll('.slide');
        const dotsContainer = document.querySelector('.slide-dots');
        
        // Create dots for slideshow
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => changeSlide(i - currentSlide));
            dotsContainer.appendChild(dot);
        });
        
        // Auto advance slides
        setInterval(() => {
            changeSlide(1);
        }, 5000);
    }

    // Change slide function
    window.changeSlide = function(n) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (currentSlide + n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Create floating elements
    function createFloatingElements() {
        createFloatingElementsByClass('floating-hearts', 15);
        createFloatingElementsByClass('floating-balloons', 10);
        createFloatingElementsByClass('floating-petals', 20);
    }

    function createFloatingElementsByClass(className, count) {
        const container = document.querySelector(`.${className}`);

        
        for (let i = 0; i < count; i++) {
            const element = document.createElement('div');
            element.classList.add(className.slice(9)); // Remove "floating-" prefix
           element.style.left = `${Math.random() * 100}%`;
            element.style.animationDelay = `${Math.random() * 15}s`;
            element.style.fontSize = `${15 + Math.random() * 20}px`;

            container.appendChild(element);
        }
    }

    // Create balloon game
    function createBalloonGame() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffbe0b', '#fb5607', '#8338ec', '#3a86ff', '#38b000', '#f15bb5', '#fee440'];
        
        for (let i = 0; i < totalBalloons; i++) {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            balloon.style.backgroundColor = colors[i];
            balloon.style.animationDelay = `${i * 0.5}s`;

            balloon.innerHTML = i + 1;
            
            balloon.addEventListener('click', function() {
                if (!this.classList.contains('popped')) {
                    this.classList.add('popped');
                    this.style.transform = 'scale(1.1)';
                    this.style.opacity = '0';
                    this.style.transition = 'all 0.3s ease';
                    
                    balloonsPopped++;
                    
                    if (balloonsPopped === totalBalloons) {
                        gameMessage.textContent = "You're amazing! Happy Birthday Payel! 🎉";
                        gameMessage.style.display = 'block';
                    } else {
                        const message = document.createElement('div');
                        message.textContent = messages[i];
                        message.style.position = 'absolute';
                        message.style.top = '-30px';
                        message.style.left = '50%';
                        message.style.transform = 'translateX(-50%)';
                        message.style.whiteSpace = 'nowrap';
                        message.style.fontSize = '14px';
                        message.style.color = '#fff';
                        message.style.textShadow = '0 1px 2px rgba(0,0,0,0.5)';
                        this.appendChild(message);
                        
                        setTimeout(() => {
                            message.remove();
                        }, 1000);
                    }
                }
            });
            
            balloonContainer.appendChild(balloon);
        }
    }

    // Create fireworks
    function createFireworks() {
        const container = document.querySelector('.fireworks-container');
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.classList.add('firework');
                
                const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffbe0b', '#fb5607', '#8338ec', '#3a86ff'];
                firework.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                const size = 2 + Math.random() * 3;
               firework.style.width = `${size}px`;
               firework.style.height = `${size}px`;


                
                const startX = 50 + Math.random() * 50;
                const startY = 50 + Math.random() * 50;
               firework.style.left = `${startX}%`;
               firework.style.top = `${startY}%`;


                
                const tx = (Math.random() - 0.5) * 100;
                const ty = (Math.random() - 0.5) * 100;
                const scale = 10 + Math.random() * 20;
                
                firework.style.setProperty('--tx', `${tx}px`);
                firework.style.setProperty('--ty', `${ty}px`);


                firework.style.setProperty('--s', scale);
                
                container.appendChild(firework);
                
                setTimeout(() => {
                    firework.remove();
                }, 1000);
            }, i * 100);
        }
    }
});