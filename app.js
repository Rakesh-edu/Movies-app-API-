const searchform=document.querySelector('form');
const moviecontainer=document.querySelector('.movie-container');
const inputbox=document.querySelector('.inputbox');


// Function to fetch data from OMDB API
const getMovieInfo=async (movie)=>{
    const apikey="1ee0b4eb";
    const url=`http://www.omdbapi.com/?apikey=${apikey}&t=${movie}`;
    const response=await fetch(url);
    const data=await response.json();
    showMovieData(data);
}


// function to show movie data 
const showMovieData=(data)=>{
    moviecontainer.innerHTML="";
    // destructurin the data
    const {Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster}=data;
    const movieelement=document.createElement('div');
    movieelement.classList.add('movie-info');
    movieelement.innerHTML=`<h2>${Title}</h2>
                            <p><strong>Rating: &#11088</strong>${imdbRating}</p>` 
    moviecontainer.appendChild(movieelement);
    const movieGenreelement=document.createElement('div')
    movieGenreelement.classList.add('movie-genre');

    Genre.split(",").forEach(element => {
        const p=document.createElement('p');
        p.innerHTML=element;
        movieGenreelement.appendChild(p);
    });
    movieelement.appendChild(movieGenreelement);
    movieelement.innerHTML+=`<p><strong>Relaese Date:</strong>${Released}</p>
                            <p><strong>Duration:</strong>${Runtime}</p>
                            <p><strong>Cast:</strong>${Actors}</p> 
                            <p><strong>Plot:</strong>${Plot}</p>`;
    const movieposter=document.createElement('div')
    movieposter.classList.add('movie-poster');
    movieposter.innerHTML=`<img src="${Poster}">`;
    moviecontainer.appendChild(movieposter);
    moviecontainer.appendChild(movieelement);
}


// adding event listener to search form
searchform.addEventListener('submit',(e)=>{
    e.preventDefault();
    let moviename=inputbox.value.trim();
    if(moviename !== '')
    {
        getMovieInfo(moviename);
    }
    else{
        moviecontainer.innerHTML=`<h2>Enter movie name to get info..</h2>`
    }
})