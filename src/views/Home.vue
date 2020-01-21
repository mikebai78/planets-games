<template>
  <div class="home">
    <table style="width:100%">
      <tr>
        <th>Name</th>
        <th>Short Description</th>
        <th>Date Created</th>
        <th>Created By</th>
        <th>Host Days</th>
        <th>Password</th>
      </tr>
      <tr v-for="game in joiningGame" :key="game.id">
        <td>{{ game.name }}</td>
        <td>{{ game.shortdescription }}</td>
        <td>{{ game.datecreated }}</td>
        <td>{{ game.createdby }}</td>
        <td>{{ game.hostdays }}</td>
        <td>{{ game.haspassword ? "ps" : "" }}</td>
      </tr>
    </table>

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
  computed: {
    joiningGame() {
      return this.games.filter(game => game.statusname == "Joining");
    }
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
        console.log(jsonData);
      });
  }
};
</script>
