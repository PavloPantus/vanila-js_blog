'use strict';

const subUrl = '';
const apiKey = 'e9ed8bc1-3f0e-4cdc-b044-c07012220ab8';
const goToPostUrl = (apiUrl) => {
  document.location.href = `${subUrl}/post.html?postApiUrl=${apiUrl}`;
};
let currentPage = 1;

const renderDatatoHTML = (data)=>{

  document.querySelectorAll('.pagination__page')
    .forEach((el, i) => {
      el.innerText = currentPage + (i);
    });

  const postsContainer = document.querySelector('.posts-container');

  postsContainer.innerHTML = '';

  data.response.results
    .forEach((post, i) => {
      console.log(post, i)

      const postCardInnerHtml = `
          <div class="post-card" onclick="goToPostUrl('${post.apiUrl}')" >
            <div class="post-card__main">
              <div class="post-card__headline-container">
                <img src="images/logo.png" class="post-card__logo" />
                <h2 class="post-card__headline">
                  ${post.webTitle.slice(0, 30)}...
                </h2>
              </div>

              <div class="post-card__author-container">
                <img
                  src=${(post.tags[0] || []).bylineImageUrl || '/images/author-photo-layout.png'}
                  class="post-card__author-photo"
                />

                <div class="post-card__author-name-and-position">
                  ${((post.tags[0] || []).bio ? (post.tags[0] || []).bio.match(/<p>([A-z ]){0,}/)[0] : false) || 'The Guardian reporter'}
                </div>
              </div>
            </div>

            <div class="post-card__post-theme">${post.sectionName || 'News'}</div>
            <div class="post-card__headline-bottom"> ${post.webTitle.slice(0, 80)}</div>
            <div class="post-card__post-description">
              ${post.fields.trailText}
            </div>
            <div class="post-card__author-name">${(post.tags[0] || []).webTitle || 'Anonimus reporter'}</div>
          </div>
        `;

      postsContainer.innerHTML += postCardInnerHtml;

      document.querySelector('.pagination').scrollIntoView();

      return data
    });
}

const loadPostsData = (pageNumber) => {
  fetch(`https://content.guardianapis.com/search?page=${pageNumber}&page-size=9&api-key=${apiKey}&show-tags=contributor&show-fields=trailText`)
    .then(response => response.json())
    .then(data => {
      setTimeout(()=>{renderDatatoHTML(data)}, 2000)
    })
};

document.querySelector('.pagination__previous')
  .addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage -= 5;
      loadPostsData(currentPage);
    }
  });

document.querySelector('.pagination__next')
  .addEventListener('click', () => {
    currentPage += 5;
    loadPostsData(currentPage);
  });

document.querySelectorAll('.pagination__page')
  .forEach((el, i) => {
    el.innerText = currentPage + (i);

    el.addEventListener('click', () => {
      console.log(currentPage + i);
      loadPostsData(currentPage + (i));
    });
  });

loadPostsData(1);
