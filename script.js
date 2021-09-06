// variables

const form = document.getElementById('form');
const search = document.getElementById('search');


//API call

apiURL = 'http://api.lyrics.ovh';




form.addEventListener('submit', e => {
    e.preventDefault();
    searchValue =  search.value.trim();
    
    if(!searchValue){
        alert('nothing to search, Enter a song title or artiste name' );
    }

    else{
        //searchSong(searchValue);
        console.log(searchValue);
    }
})


// Search Function

 
