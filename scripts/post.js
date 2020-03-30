'use strict';

let searchParams = new URLSearchParams(window.location.search)

let postApiUrl = searchParams.get('postApiUrl');

let apiKey = 'e9ed8bc1-3f0e-4cdc-b044-c07012220ab8'

fetch(`${postApiUrl}?api-key=${apiKey}&show-tags=contributor,keyword&show-fields=trailText,main&show-blocks=all&show-elements=all`)
  .then(response=>response.json())
  .then(data=>{
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

    let post = data.response.content;

    let postElement = document.querySelector('.post');

    let blocksInnerHtml = '';

    post.blocks.body
      .forEach((block)=>{
        blocksInnerHtml += `
          <div class="post__article">
            <div class="post__publication-container">
              <div class="post__author-name">${(block.contributors|| [])[0]  || 'Anonimus reporter'}</div>
              <div class="post__publication-date">${new Date(block.publishedDate).getDate()} ${month[new Date(block.publishedDate).getMonth()]}, ${new Date(block.publishedDate).getFullYear()}</div>
            </div>
            ${block.bodyTextSummary}
          </div>
`;
      })

    let postContent = `
      <div class="post__main">
        <div class="post__main-wrapper wrapper">
          <div class="post__headline-container">
          <img src="images/logo-big.png" class="post__logo" />
          <h2 class="post__headline">
             ${post.webTitle}
          </h2>
        </div>

         <div class="post__author-container">
           <img
             src=${(post.tags.filter(tag=>tag.type==='contributor')[0] || []).bylineImageUrl || '/images/author-photo-layout.png'}
             class="post__author-photo"
           />

           <div class="post__author-name-and-position">
             ${((post.tags[0] || []).bio ? (post.tags[0] || []).bio.match(/<p>([A-z ]){0,}/)[0] : false) || 'The Guardian reporter'}
           </div>
         </div>
        </div>
      </div>

       <div class="wrapper">
        <div class="post__post-theme">${post.sectionName || 'News'}</div>

        <div class="post__headline-bottom"> ${post.webTitle}</div>

        <div class="post__publication-container">
         <div class="post__author-name">${(post.tags.filter(tag=>tag.type==='contributor')[0] || []).webTitle || 'Anonimus reporter'}</div>
         <div class="post__publication-date">${new Date(post.webPublicationDate).getDate()} ${month[new Date(post.webPublicationDate).getMonth()]}, ${new Date(post.webPublicationDate).getFullYear()}</div>
        </div>

        <div class="post__body">
          info
          ${post.fields.main}

          ${blocksInnerHtml}
        </div>

        <div class="post__keywords">
          ${
            [...(new Set(post.tags.filter(tag=>tag.type==='keyword').map(tag=>tag.sectionName)))]
              .reduce((acc, el)=>{return acc + `<div class="post__key-word">${el}</div>`}, ' ')
           }
        </div>
      </div>
    `

    postElement.innerHTML = postContent;


   /* postContent.innerHTML = data.response.content.fields.main

    postContent.innerHTML += data.response.content.blocks.main.bodyHtml

    data.response.content.blocks.body
    .forEach((block)=>{
     postContent.innerHTML += block.bodyHtml;
    })*/
  })
