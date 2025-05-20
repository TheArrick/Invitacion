
const numMariposas = 30;
const mariposaImg1 = "images/R.png"; // Cambia por tu imagen
const mariposaImg2 = "images/R2.png"; // Cambia por tu imagen
const mariposaImg3 = "images/R3.png"; // Cambia por tu imagen
const mariposaImg4 = "images/R4.png";
const mariposaImg6 = "images/R6.png";
const mundo = document.getElementById("mundo");

// Crear mariposas
for (let i = 0; i < numMariposas; i++) {
    crearMariposa(mariposaImg1);
    crearMariposa(mariposaImg2);
    crearMariposa(mariposaImg3);
    crearMariposa(mariposaImg4);
    crearMariposa(mariposaImg6);
}

function crearMariposa(mariposaT) {
    const mariposa = document.createElement("img");
    mariposa.className = "mariposa";
    mariposa.src = mariposaT;

    // Posición y velocidad inicial aleatoria
    let x = Math.random() * mundo.offsetWidth;
    let y = Math.random() * mundo.offsetHeight;
    let velX = (Math.random() - 0.5) * 3;
    let velY = (Math.random() - 0.5) * 3;
    let rotacion = Math.random() * 360;

    mariposa.style.left = `${x}px`;
    mariposa.style.top = `${y}px`;
    mariposa.style.setProperty("--rotacion", `${rotacion}deg`);

    mundo.appendChild(mariposa);

    // Animación
    function animar() {
        x += velX;
        y += velY;

        // Rebote en los bordes del mundo (no del viewport)
        if (x <= 0 || x >= mundo.offsetWidth - 60) {
            velX *= -1;
            rotacion = Math.atan2(velY, velX) * (180 / Math.PI);
        }
        if (y <= 0 || y >= mundo.offsetHeight - 60) {
            velY *= -1;
            rotacion = Math.atan2(velY, velX) * (180 / Math.PI);
        }

        mariposa.style.left = `${x}px`;
        mariposa.style.top = `${y}px`;
        mariposa.style.setProperty("--rotacion", `${rotacion}deg`);

        requestAnimationFrame(animar);
    }

    animar();
}
// Countdown
function updateCountdown() {
    const countDownDate = new Date("Jun 7, 2025 17:30:00").getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").querySelector('.number').textContent = days;
    document.getElementById("hours").querySelector('.number').textContent = hours;
    document.getElementById("minutes").querySelector('.number').textContent = minutes;
    document.getElementById("seconds").querySelector('.number').textContent = seconds;

    // Efecto de flip en los cambios
    const units = ['days', 'hours', 'minutes', 'seconds'];
    units.forEach(unit => {
        const element = document.getElementById(unit);
        element.classList.add('flipping');
        setTimeout(() => element.classList.remove('flipping'), 600);
    });
}

setInterval(updateCountdown, 1000);
updateCountdown(); // Ejecutar inmediatamente

// Animaciones al hacer scroll
function checkScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Efecto hover más suave para los botones
const buttons = document.querySelectorAll('.btn, .submit-btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px)';
        button.style.boxShadow = '0 7px 20px rgba(0,0,0,0.3)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    });
});
//base

document.getElementById("rsvp-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const data = {
        nombre: document.getElementById("nombre").value,
        numero: document.getElementById("numero").value,
        mensaje: document.getElementById("mensaje").value
    };

    fetch("https://script.google.com/macros/s/AKfycbzYBcMIqy2h_doPxireRTzKvSR_R63aHm_a7AVNyQXDHQOt3JZCv9enS6GRCaRpE-1Rvg/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(text => {
            alert("Gracias por confirmar. " + text);
            document.getElementById("rsvp-form").reset();
        })
        .catch(error => {
            alert("Error al enviar: " + error);
        });
});

