async function searchReddit() {
    const username = document.getElementById('username').value;

    if (username.trim() === '') {
        alert('Please enter a valid Reddit username.');
        return;
    }

    const apiUrl = `https://www.reddit.com/user/${username}/submitted.json`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        displayResults(data.data.children);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching Reddit data. Please try again.');
    }
}

function displayResults(posts) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (posts.length === 0) {
        resultsContainer.innerHTML = '<p>No posts found for the given username.</p>';
        return;
    }

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `<h3>${post.data.title}</h3><p>${post.data.selftext}</p>`;
        resultsContainer.appendChild(postElement);
    });
}
