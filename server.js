const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express()
const PORT = 4000

app.use(cors())

app.get("/pokemon/:name", async (req,res) => {
    const pokemonName = req.params.name;

    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        const response = await axios.get(url);
        const pokemon = response.data;

        const pokemonData = {
            name: pokemon.name,
            id: pokemon.id,

            image: pokemon.sprites.front_default,
            imageBack: pokemon.sprites.back_default,

            order: pokemon.order,
            types: pokemon.types.map((type) => type.type.name).join(", "),
            base_experience: pokemon.base_experience,
            height: pokemon.height / 10,
            weight: pokemon.weight / 10,
            abilities : pokemon.abilities.map((ability) => ability.ability.name).join(", "),

            imageShiny: pokemon.sprites.front_shiny, 
            imageShinyBack: pokemon.sprites.back_shiny,

            stats: pokemon.stats.map((stat) => stat.stat.name).join(", "),
            held_items: pokemon.held_items.map((item) => item.item.name).join(", "),
            moves: pokemon.moves.map((move) => move.move.name).join(", ")
        }

        res.json(pokemonData);

    } catch (error) {
        res.status(500).json({error: "ERRO AO BUSCAR POKEMON!!!"});
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})