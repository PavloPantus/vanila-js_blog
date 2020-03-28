'use strict';

fetch('https://content.guardianapis.com/search?page-size=9&api-key=e9ed8bc1-3f0e-4cdc-b044-c07012220ab8')
  .then(response => response.json())
  .then(data => {
    const postsContainer = document.querySelector('.posts-container');

    data.response.results
      .forEach(post => {
        const postCardLinkWrapper = document.createElement('a');

        postCardLinkWrapper.href = `/post.html?postApiUrl=${post.apiUrl}`;

        const postCard = document.createElement('div');

        postCard.classList.add('post-card');
        postCard.innerText = post.webTitle;

        postCardLinkWrapper.appendChild(postCard);

        postsContainer.appendChild(postCardLinkWrapper);
      });
  });
