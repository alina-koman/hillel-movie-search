const searchInput = document.querySelector('.search-input')
const searchBox = document.querySelector('.search-result')
const searchCheckbox = document.querySelector('.search-checkbox')

const TIMER = 2000
let timerId = 0

const liveSearch = (url) =>
    fetch(url)
        .then((res) => res.json())
        .then((data) => data.Search)
        .catch((err) => console.log(err))

const changeHandler = () => { if (!searchCheckbox.checked) searchBox.innerHTML = '' }

const timerInput = (input) => {
    timerId = setTimeout(() => {
        liveSearch(`https://www.omdbapi.com/?apikey=72ff0777&s=${input}`).then((movies) => {
            if (!movies) return
                changeHandler()
            movies.forEach((movie) => searchMovies(movie))
        }
        )
    }, TIMER)
}

const renderListMovies = (item) => {
    if (searchCheckbox.checked) {
        searchBox.prepend(item)
    } else {
        searchBox.append(item)
    }
}

const searchMovies = ({Poster: poster, Title: title, Year: year, Type: type}) => {
    const item = document.createElement('div')
    const img = document.createElement('img')
    const desc = document.createElement('p')

    item.classList.add('search-item')

    img.classList.add('search-img')
    img.src = (poster && poster !== 'N/A') ? poster : 'src/images/image-not-found.webp'
    img.alt = `${title} ${year} ${type}`
    img.title = `${title} ${year} ${type}`

    desc.classList.add('search-desc')
    desc.innerHTML = `${title} ${year} ${type}`

    item.append(img)
    item.append(desc)

    renderListMovies(item)
}

const inputHandler = (e) => {
    const input = e.target.value.trim()

    clearTimeout(timerId)

    if (!input) {
        changeHandler()
        return
    }

    timerInput(input)
}

searchInput.addEventListener('input', inputHandler)
searchCheckbox.addEventListener('change', changeHandler)