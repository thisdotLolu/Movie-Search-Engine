createAutoComplete({
    root: document.querySelector('.autocomplete'),
    renderOption(movie) {
        const imgSRC = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `<img src='${imgSRC}'/>${movie.Title} ${(movie.Year)}`
    },
    onOptionSelect(movie) {
        onMovieSelect(movie);
    },
    inputValue(movie){
        return movie.Title
    },
    fetchData: async(searchTerm) => {
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                apikey: 'c05c7bac',
                s: searchTerm
            }
        })
        if (response.data.Error) {
            // console.log(response.data);
            return [];
        }
        return response.data.Search;
    }
})
/*
const utility = ()=>{
    const{render}
    this.respone= createAutoComplete.renderOption
}
*/



onMovieSelect = async(movie) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'c05c7bac',
            i: movie.imdbID
        }
    })
    document.querySelector('#summary').innerHTML = movieTemplate(response.data);
}



const movieTemplate = (movieDetail) => {
    return `
    <article class='media'>
    <figure class='media'>
    <p class='image'>
    <img src='${movieDetail.Poster}' style='margin-right:10px'>
    </p>
    </figure>

    <div class='media-content'>
    <div class='content' style='margin-top:10px'>
    <h1>${movieDetail.Title}</h1>

    <h4>${movieDetail.Genre}</h4>

    <p>${movieDetail.Plot}</p>
    </div>
    </div>
    </article>
    <article class='notification is-primary'>
    <p class='title'>${movieDetail.Awards}</p>
    <p class='subtitle'>Awards</p>
    </article>
    <article class='notification is-primary'>
    <p class='title'>${movieDetail.BoxOffice}</p>
    <p class='subtitle'>BoxOffice</p>
    </article>
    <article class='notification is-primary'>
    <p class='title'>${movieDetail.Metascore}</p>
    <p class='subtitle'>Metascore</p>
    </article>
    <article class='notification is-primary'>
    <p class='title'>${movieDetail.imdbRating}</p>
    <p class='subtitle'>IMDB Rating</p>
    </article>
    <article class='notification is-primary'>
    <p class='title'>${movieDetail.imdbVotes}</p>
    <p class='subtitle'>IMDB Votes</p>
    </article>
    `
}































// const fetchData = async searchTerm => {
//     const response = await axios.get('http://www.omdbapi.com/', {
//       params: {
//         apikey: 'c05c7bac',
//         s: searchTerm
//       }
//     });

//     if (response.data.Error) {
//       return [];
//     }

//     return response.data.Search;
//   };

//   const root = document.querySelector('.autocomplete');
//   root.innerHTML = `
//     <label><b>Search For a Movie</b></label>
//     <input class="input" />
//     <div class="dropdown">
//       <div class="dropdown-menu">
//         <div class="dropdown-content results"></div>
//       </div>
//     </div>
//   `;

//   const input = document.querySelector('input');
//   const dropdown = document.querySelector('.dropdown');
//   const resultsWrapper = document.querySelector('.results');

//   const onInput = async event => {
//     const movies = await fetchData(event.target.value);

//     dropdown.classList.add('is-active');
//     for (let movie of movies) {
//       const option = document.createElement('a');

//       option.classList.add('dropdown-item');
//       option.innerHTML = `
//         <img src="${movie.Poster}" />
//         ${movie.Title}
//       `;

//       resultsWrapper.appendChild(option);
//     }
//   };
//   input.addEventListener('input', debounce(onInput, 500));