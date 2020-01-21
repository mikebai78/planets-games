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
      <tr v-for="game in joiningGames" :key="game.id">
        <td>{{ game.name }}</td>
        <td>{{ game.shortdescription }}</td>
        <td>{{ game.datecreated | dateFormat }}</td>
        <td>{{ game.createdby === "none" ? "" : game.createdby }}</td>
        <td>{{ game.hostdays }}</td>
        <td>{{ game.haspassword ? "ps" : "" }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from "moment";

export default {
  name: "home",

  data() {
    return {
      games: []
    };
  },
  filters: {
    dateFormat: function(value) {
      let date = moment(value).format("MMMM Do, YYYY");
      return date;
    }
  },
  computed: {
    joiningGames() {
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
