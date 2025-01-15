const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Canvas boyutunu ayarlamak için fonksiyon
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let particles = [];
const MAX_PARTICLES = 500; // Maksimum parçacık sayısı

// Particle sınıfı
class Particle {
    constructor(x, y, color, velocity, size) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = velocity;
        this.size = size;
        this.opacity = 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.opacity -= 0.01;
        if (this.opacity <= 0) {
            return false; // Parçacık görünür değilse silinir
        }
        return true;
    }
}

// Havai fişek oluşturma fonksiyonu
function createFirework(x, y) {
    const colors = [
        '255, 99, 71',   // Red-orange
        '135, 206, 250', // Sky blue
        '255, 215, 0',   // Gold
        '50, 205, 50'    // Lime green
    ];

    for (let i = 0; i < 100; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;
        particles.push(new Particle(
            x,
            y,
            colors[Math.floor(Math.random() * colors.length)],
            { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
            Math.random() * 3 + 1
        ));
    }

    // Parçacık sayısını kontrol et
    if (particles.length > MAX_PARTICLES) {
        particles.splice(0, particles.length - MAX_PARTICLES); // Fazla parçacıkları kaldır
    }
}

// Animasyon fonksiyonu
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        if (!particle.update()) {
            particles.splice(index, 1); // Parçacık silindiğinde diziden çıkar
        } else {
            particle.draw();
        }
    });

    requestAnimationFrame(animate);
}

// İlk patlama ekranın ortasında
function initialFirework() {
    const textX = canvas.width / 2;
    const textY = canvas.height / 2;
    createFirework(textX, textY);
}

// Tıklama ile havai fişek oluşturma
canvas.addEventListener('click', (e) => {
    createFirework(e.clientX, e.clientY);
});

// İlk patlama ve animasyon başlatma
initialFirework();
animate();
