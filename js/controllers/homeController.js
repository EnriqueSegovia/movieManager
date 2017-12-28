(function () {
    'use strict';

    angular
        .module('filmsApp')
        .controller('homeController', homeController);

    homeController.$inject = ['$http', '$scope', 'pelisFactory','$sce'];

    function homeController($http, $scope, pelisFactory, $sce) {
        var vm = this;

        ///// FUNCIONES /////

        $scope.pelisPop = pelisPop;
        $scope.pelisProx = pelisProx;
        $scope.toSearch = toSearch;
        $scope.cargarGens = cargarGens;
        $scope.details = details;
        $scope.youtubeUrl = youtubeUrl;
        $scope.addgenre = addgenre;
        $scope.isSelected = isSelected;
        $scope.gensFilter = gensFilter;
        $scope.filterClear = filterClear;


        //// VARIABLES SCOPE /////

        $scope.filmDetails = [];
        $scope.generos = [];
        $scope.films = [];
        $scope.searchParams = {};
        $scope.searchFilm = '';
        $scope.searchGenres = '';
        $scope.actualAction = 'homePage';
        $scope.modalState = 'off';
        $scope.filter_genres = [];
        $scope.filmsFav = [];
        $scope.filmsLate = [];
        $scope.filmsViews = [];
        
        //// VARIEBLES NO SCOPE ////

        var cambio = ['popular', 'upcoming'];

        activate();

        ////////////////

        function activate() {
            pelisPop();
            cargarGens();

        }

        function cargarGens() {
            pelisFactory.searchGens()
                .then(gensLoaded, gensError);
        }

        function gensLoaded(thatGens) {
            $scope.generos = thatGens;
            console.log(thatGens)
        }

        function gensError() {
            console.log('Fallo al cargar Generos')
        }



        function pelisPop(pop) {
            pelisFactory.damePelis(cambio[0])
            .then(filmsLoaded, filmsError);
            // console.log(cambio[0])

        }


        function filmsLoaded(thatFilms) {
            $scope.films = thatFilms;
            $scope.filter_genres = [];
            // console.log(thatFilms)
        }

        function filmsError() {
            console.log("EXPLOUSHION!!")
        }

        function pelisProx(prox) {
            pelisFactory.damePelis(cambio[1])
            .then(filmsLoaded, filmsError);
            // console.log(cambio[1])

        }

        function toSearch() {
            pelisFactory.searchPelis($scope.searchParams.searchFilm)
                .then(filmsSearched, filmsError);
            console.log($scope.searchParams.searchFilm)
        }

        function filmsSearched(thisFilm) {
            $scope.films = thisFilm;
            if($scope.searchParams.searchFilm == ''){
                pelisPop()
            }
            console.log(thisFilm)
        }
        
        function details(movie_id) {
            pelisFactory.moviesDetails(movie_id)
            .then(movieFinded, filmsError);
            $scope.modalState = 'on';
            
        }
        
        function movieFinded(movie) {
            movie.youtube_Url = 'https://www.youtube.com/embed/'+ movie.videos.results[0].key;
            $scope.filmDetails = movie;
            console.log($scope.filmDetails)
        }
        
        function youtubeUrl(url){
            return $sce.trustAsResourceUrl(url);
        }

        function addgenre(id) {
            if ($scope.filter_genres.length == 0) {
                $scope.filter_genres.push(id);
            } 
            else {
                for (var i = 0; i < $scope.filter_genres.length; i++) {
                    if ($scope.filter_genres[i] == id) {
                        $scope.filter_genres.splice(i, 1);
                        return;
                    }
                }
                $scope.filter_genres.push(id);
            }
        }

        function isSelected(id) {

            if ($scope.filter_genres.indexOf(id) != -1){ 
                return true
            }
            else{ 
                return false
            }

        }

        function gensFilter(){
            pelisFactory.getFilteredGens($scope.filter_genres)
            .then(genresLoaded, filmsError);
            
        }

        function genresLoaded(byGenres){
            $scope.films = byGenres;
        }

        function filterClear(){
            $scope.filter_genres = [];
            pelisPop()
        }


    }
})();