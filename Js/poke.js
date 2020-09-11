var pokemons = ["1", "4", "7"];
var secretoId = "";

$(document).ready(function() {
    jsBehindPage().loadPokemons();
});

var jsBehindPage = function() {
    var controler = function() {
        return {
            pokemons: "#pokemons",
            modal: "#modal"
        }
    }

    var mostrarLoading = function() {
        $(controler().modal).css('display', 'block');
    }

    var removerLoading = function() {
        $(controler().modal).css('display', 'none');
    }

    var loadPokemons = function() {
        mostrarLoading();
        for (var i in pokemons) {
            $.ajax({
                type: "Get",
                url: "https://pokeapi.co/api/v2/pokemon/" + pokemons[i],
                cache: false
            }).done(function(data) {
                if (data) {
                    $(controler().pokemons).append('<div class="pokemonSelect col-md-4" onclick="jsBehindPage().gotcha(' + data.id + ')"><h2 class="text-center PokemonTitulo">' + data.name + '</h2>' +
                        '<img src=' + data.sprites.front_default + ' style="width:100%;" /></div >');
                } else {
                    alert('Nenhum pokemon encontrado...');
                }


                if (i == 2) {
                    removerLoading();
                }
            }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
                alert('Nenhum pokemon encontrado...');
            });
        }
    }

    var secreto = function() {
        mostrarLoading();
        $.ajax({
            type: "Get",
            url: "https://pokeapi.co/api/v2/pokemon/" + secretoId,
            cache: false
        }).done(function(data) {
            if (data) {
                $(controler().pokemons).append('<div class="pokemonSelect col-md-4" onclick="jsBehindPage().gotcha(' + data.id + ')"><h2 class="text-center PokemonTitulo">' + data.name + '</h2>' +
                    '<img src=' + data.sprites.front_default + ' style="width:100%;" /></div >');
            } else {
                alert('Nenhum pokemon encontrado...');
            }
            removerLoading();
        }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
            alert('Nenhum pokemon encontrado...');
            removerLoading();
        });
    }

    return {
        loadPokemons: loadPokemons,
        secreto: secreto
    }
}