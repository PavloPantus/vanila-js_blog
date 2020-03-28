'use strict';

let searchParams = new URLSearchParams(window.location.search)

let postApiUrl = searchParams.get('postApiUrl');

let apiKey = 'e9ed8bc1-3f0e-4cdc-b044-c07012220ab8'

console.log(searchParams)

fetch(`${postApiUrl}?api-key=${apiKey}&show-fields=all&show-tags=all&show-blocks=all&show-elements=all&show-references=author`)
  .then(response=>response.json())
  .then(data=>{
    let postContent = document.querySelector('.post__content');

    postContent.innerHTML = data.response.content.fields.main

    postContent.innerHTML = data.response.content.blocks.main.bodyHtml

    data.response.content.blocks.body
    .forEach((block)=>{
     postContent.innerHTML += block.bodyHtml;
    })
  })
