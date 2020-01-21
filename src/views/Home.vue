<template>
  <div class="home">
    <div v-for="game in games" :key="game.id">
      {{ game.id }} - {{ game.name }}
    </div>
    <GameList />
  </div>
</template>

<script>
// @ is an alias to /src
import GameList from "@/components/GameList.vue";

export default {
  name: "home",
  components: {
    GameList
  },
  data() {
    return {
      games: []
    };
  },
  methods: {},
  mounted: function() {
    console.log("home mounted");
    fetch("http://api.planets.nu/games/list", {
      method: "get"
    })
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        this.games = jsonData;
      });
  }
};
</script>
