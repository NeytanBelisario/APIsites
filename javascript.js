const inputPesquisa = document.querySelector('.inputPesquisa');
const botaoPesquisa = document.querySelector('.botaoPesquisa');
// const informacoesFilme = document.querySelector('.informacoesFilme')
var poster = document.querySelector('.poster')
var titulo = document.querySelector('.titulo')
var tipo = document.querySelector('.tipo')
var genero = document.querySelector('.genero')
var data = document.querySelector('.data')
var nota = document.querySelector('.nota')
var atores = document.querySelector('.atores')
var resumo = document.querySelector('.resumo')
var duracao = document.querySelector('.duracao')
var temporadas = document.querySelector('.temporadas')

function resultados(filmes){
    fetch(`https://www.omdbapi.com/?s=${filmes}&page=1&apikey=ec2d782a`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Filme/série não encontrado`)
        }
        return response.json();
    })
    .then(function(informacoesFilmes){
        console.log(informacoesFilmes)
        var id = informacoesFilmes.Search[0].imdbID;
        fetch(`https://www.omdbapi.com/?i=${id}&apikey=ec2d782a`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Filme/série não encontrado`)
            }
            return response.json();
        })
        .then(function(mostrarFilmes){
            console.log(mostrarFilmes)
            var posterFilme = mostrarFilmes.Poster
            var atoresFilme = mostrarFilmes.Actors
            var generoFilme = mostrarFilmes.Genre
            var notaFilme = mostrarFilmes.imdbRating
            var resumoFilme = mostrarFilmes.Plot
            var dataFilme = mostrarFilmes.Released
            var duracaoFilme = mostrarFilmes.Runtime
            var tituloFilme = mostrarFilmes.Title
            var tipoFilme = mostrarFilmes.Type
            var temporadasSerie = mostrarFilmes.totalSeasons
            var filmesPesquisa = document.querySelector('.filmesPesquisa')
            var footer = document.querySelector('.footer')

            footer.style.position = "unset"
            footer.style.marginTop = "5vh"
            footer.style.marginBottom = "5vh"
            filmesPesquisa.style.display = "flex"
            poster.innerHTML = `<img src="${posterFilme}"></img>`
            atores.innerHTML = `<h4>${atoresFilme}</h4>`
            genero.innerHTML = `<h4>${generoFilme}</h4>`
            nota.innerHTML = `<h4>${notaFilme}</h4>`
            resumo.innerHTML = `<h4>${resumoFilme}</h4>`
            data.innerHTML = `<h4>${dataFilme}</h4>`
            duracao.innerHTML = `<h4>${duracaoFilme}</h4>`
            titulo.innerHTML = `<h2>${tituloFilme}</h2>`
            if(tipoFilme == 'series'){
                tipo.innerHTML = `<h4>${tipoFilme} - ${temporadasSerie} seasons </h4>`
            }
            else{
                tipo.innerHTML = `<h4>${tipoFilme}</h4>`
            }
        })
    })
}

inputPesquisa.addEventListener('keypress', enter)

function enter(event) {
    key = event.keyCode
    if (key === 13) {
        resultados(inputPesquisa.value)
    }
}
