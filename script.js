// variables

const form = document.querySelector('#form');
const search = document.querySelector('#search');
const results = document.querySelector('#results');
const errorMessage = document.querySelector('.error');





//API call
const apiURL = 'https://api.lyrics.ovh'



form.addEventListener('submit', e => {
    e.preventDefault();
    searchValue =  search.value.trim();
    
    if(!searchValue){
        displayError('nothing to search, Enter a song title or artiste name' );
    }

    else{
        fetch(`${apiURL}/suggest/${searchValue}`)
        .then(response => {
            // error check
            if (!response.ok) {
                throw new Error('Something went wrong.Please recheck your input !');
              }
              return response.json();
        })
           
        .then(songs => {
            displayData(songs);
            console.log(songs);   
        })
        .catch(error => {
            displayError(error);
          });
    
    }
})


// Display Data Funtion

function displayData(songs){
    results.innerHTML = 
    `<ul class = "songs">
    ${
        songs.data.map(song => 
             `<li>
                     <div>
                        <strong> ${song.artist.name} </strong> - ${song.title}
                     </div>
                     <span song-artiste = "${song.artist.name}"  song-title = "${song.title}">
                         get lyrics
                     </span>
             </li>`             
    
        ).join('')
           
    }
    </ul>`
    ;
  
}


// check for button click and get Lyrics 

results.addEventListener('click' , e => {
    const clickedElement = e.target;

    // check get lyrics button
    if ( clickedElement.tagName === 'SPAN'){
        const artiste = clickedElement.getAttribute('song-artiste');
        const songTitle = clickedElement.getAttribute('song-title');

        getLyrics(artiste, songTitle);
    }
    

})


// main getLyrics function

function getLyrics(artisteName, songTitle){

        fetch(`${apiURL}/v1/${artisteName}/${songTitle}`)
         .then(response => response.json())
         .then( lyricsData => {
            formatLyrics(artisteName, songTitle, lyricsData)
        
        })
}

// format and display lyrics
function formatLyrics(artisteName, songTitle, lyricsData){
    const formatedLyrics =  lyricsData.lyrics.split('\n').join('<br />');
    console.log(formatedLyrics);
    results.innerHTML = ` <h2> <strong>${artisteName}</strong> - ${songTitle}</h2>
                         <p>${formatedLyrics}</p>
    `
}
 

function displayError(message){
     // inform user of error
     errorMessage.innerHTML = `<h2> ${message}</h2>`
     errorMessage.style.display = 'block';
     setTimeout(() =>{
        errorMessage.style.display = 'none';
     },2500);
   
}
