document.addEventListener('DOMContentLoaded', fetchAnimeDetails);

async function fetchAnimeDetails() {
    const params = new URLSearchParams(window.location.search);
    const animeId = params.get('id');
    console.log('Anime ID:', animeId); // Log the Anime ID for debugging

    if (!animeId) {
        console.error('No anime ID found in the URL');
        document.getElementById('anime-details').innerHTML = '<p>No anime ID found in the URL.</p>';
        return;
    }

    const apiUrl = `http://localhost:8080/api/anime/${animeId}`; // Correct URL with template literal
    console.log('Fetching anime details from:', apiUrl); // Log the API URL for debugging

    try {
        const response = await axios.get(apiUrl);

        if (response.status === 404) {
            console.error('Anime not found');
            document.getElementById('anime-details').innerHTML = '<p>Anime not found.</p>';
            return;
        }

        const anime = response.data;
        const animeDetails = document.getElementById('anime-details');

        animeDetails.innerHTML = `
            <div class="anime-card">
                <div class="anime-image">
                    <img src="${anime.image}" alt="${anime.nameEN}">
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
                        <button class="action-button edit-button" data-id="${animeId}">Edit</button>
                        <button class="action-button delete-button" data-id="${animeId}">Delete</button>
                    </div>
                </div>
            </div>
        `;

        // Attach event listeners to the buttons
        document.querySelector('.edit-button').addEventListener('click', () => editAnime(animeId));
        document.querySelector('.delete-button').addEventListener('click', deleteAnime);
    } catch (error) {
        console.error('Error fetching anime details:', error);
        document.getElementById('anime-details').innerHTML = '<p>Error fetching anime details.</p>';
    }
}

async function editAnime(animeId) {
    const apiUrl = `http://localhost:8080/api/anime/${animeId}`;
    try {
        const response = await axios.get(apiUrl);
        const anime = response.data;

        document.getElementById('anime-id').value = anime.id;
        document.getElementById('anime-nameJP').value = anime.nameJP;
        document.getElementById('anime-nameEN').value = anime.nameEN;
        document.getElementById('anime-releaseDate').value = anime.releaseDate;
        document.getElementById('anime-sourceId').value = anime.sourceID;
        document.getElementById('anime-episodes').value = anime.episodes;
        document.getElementById('anime-description').value = anime.description;
        document.getElementById('anime-studio').value = anime.studio;
        document.getElementById('anime-image').value = anime.image;

        // Redirect to edit page or open edit form
        window.location.href = `./edit.html?id=${anime.id}`;
    } catch (error) {
        console.error('Error fetching anime:', error);
    }
}

async function deleteAnime(event) {
    const animeId = event.target.getAttribute('data-id');
    const apiUrl = `http://localhost:8080/api/anime/${animeId}`;
    try {
        await axios.delete(apiUrl);
        window.location.href = "http://127.0.0.1:5500/views/";
    } catch (error) {
        console.error('Error deleting anime:', error);
    }
}
