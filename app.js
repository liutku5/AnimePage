const apiUrl = 'http://localhost:8080/api/anime';

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
                            <img src="${anime.image}" alt="Anime Image">
                        </div>
                        <div class="anime-details">
                            <h3 class="anime-name-jp">${anime.nameJP}</h3>
                            <h4 class="anime-name-en">${anime.nameEN}</h4>
                            <p class="release-date"><strong>Release Date:</strong> ${anime.releaseDate}</p>
                            <p class="source-id"><strong>Source ID:</strong> ${anime.sourceID}</p>
                            <p class="episodes"><strong>Episodes:</strong> ${anime.episodes}</p>
                            <p class="description">${anime.description}</p>
                            <p class="studio"><strong>Studio:</strong> ${anime.studio}</p>
                            <div class="actions">
                                <button class="action-button">Action 1</button>
                                <button class="action-button">Action 2</button>
                            </div>
                        </div>
                    `;
                    
                    animeList.appendChild(animeCard);
                });
        editDeleteButtons();
    } catch (error) {
        console.error('Error fetching anime:', error);
    }
}

async function saveAnime(event) {
    console.log("Save");
    event.preventDefault();

    const id = document.getElementById('anime-id').value;
    const nameJP = document.getElementById('anime-nameJP').value;
    const nameEN = document.getElementById('anime-nameEN').value;
    const releaseDate = document.getElementById('anime-releaseDate').value;
    const sourceId = document.getElementById('anime-sourceId').value;
    const episodes = document.getElementById('anime-episodes').value;
    const description = document.getElementById('anime-description').value;
    const studio = document.getElementById('anime-studio').value;
    const image = document.getElementById('anime-image').value;

    console.log(id);
    try {
        if (id) {
            await axios.put(`${apiUrl}/${id}`, { nameJP, nameEN, releaseDate, sourceId, episodes, description, studio, image });
        } else {
            await axios.post(apiUrl, { nameJP, nameEN, releaseDate, sourceId, episodes, description, studio, image });
        }
        
        window.location.href = "http://127.0.0.1:5500/views/";
    } catch (error) {
        console.error('Error saving anime:', error);
    }
}

async function editAnime() {
    console.log("Update");
    let id = document.URL.split("=").pop();
    console.log(id);
    try {
        const response = await axios.get(`${apiUrl}/${id}`);
        const anime = response.data;

        document.getElementById('anime-id').value = anime.id;
        document.getElementById('anime-nameJP').value = anime.nameJP;
        document.getElementById('anime-nameEN').value = anime.nameEN;
        document.getElementById('anime-releaseDate').value = anime.releaseDate;
        document.getElementById('anime-sourceId').value = anime.sourceId;
        document.getElementById('anime-episodes').value = anime.episodes;
        document.getElementById('anime-description').value = anime.description;
        document.getElementById('anime-studio').value = anime.studio;
        document.getElementById('anime-image').value = anime.image;

    } catch (error) {
        console.error('Error fetching anime:', error);
    }
}

async function deleteAnime(event) {
    const id = event.target.value;
    try {
        await axios.delete(`${apiUrl}/${id}`);
        fetchAnime();
    } catch (error) {
        console.error('Error deleting anime:', error);
    }
}

function editDeleteButtons() {
    let buttonsDelete = document.querySelectorAll(".delete");
    for (let i = 0; i < buttonsDelete.length; i++) {
        buttonsDelete[i].addEventListener("click", deleteAnime);
    }
}

try {
    document.querySelector("#anime-form").addEventListener("submit", saveAnime);
} catch (Exception) {}