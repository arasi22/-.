document.addEventListener('DOMContentLoaded', (event) => {
    const punchSound = new Audio('https://cdn.discordapp.com/attachments/1259518924022616127/1259791500896894996/1.mp3?ex=668cf7c3&is=668ba643&hm=c2229f11e9f7d99ff519ee029959d69df583eb857fcad97427c14f2ab20d66cc&');

    function playPunchSound() {
        punchSound.play();
    }

    function punch() {
        playPunchSound();
    }

    document.getElementById('punch-button').addEventListener('click', punch);
});

// 宣伝
const credits = document.createElement('p');
credits.textContent = 'by https://www.tiktok.com/@kawano.souta.kousiki';
document.body.appendChild(credits);
