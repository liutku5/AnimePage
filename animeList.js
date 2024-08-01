const apiUrl = 'http://localhost:8080/api/anime';

document.addEventListener('DOMContentLoaded', (event) => {
    fetchAnime();
});

async function fetchAnime() {
    try {
        const response = await axios.get(apiUrl);
        const animeData = response.data;
        const animeList = document.getElementById('anime-list');
        animeList.innerHTML = '';

        animeData.forEach(anime => {
            const animeCard = document.createElement('div');
            animeCard.classList.add('anime-card');
            animeCard.innerHTML = `
                <div class="anime-image">
                    <img src="${anime.image}" alt="${anime.nameEN}" data-id="${anime.id}">
                </div>
                <div class="anime-details">
                    <h3 class="anime-name-en">${anime.nameEN}</h3>
                </div>
            `;

            animeCard.querySelector('.anime-image img').addEventListener('click', () => {
                window.location.href = `./details.html?id=${anime.id}`;
            });

            animeList.appendChild(animeCard);
        });
    } catch (error) {
        console.error('Error fetching anime:', error);
    }
}