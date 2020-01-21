<template>
  <div class="container">
    <h2>Planets Games</h2>
    <table class="table">
      <tr>
        <th>Name</th>
        <th>Short Description</th>
        <th>Date Created</th>
        <th>Created By</th>
        <th>Host Days</th>
        <th>Password</th>
      </tr>
      <tr
        class="row"
        v-for="game in joiningGames"
        :key="game.id"
        @click="openGame(game.id)"
      >
        <td>{{ game.name }}</td>
        <td>{{ game.shortdescription }}</td>
        <td>{{ game.datecreated | dateFormat }}</td>
        <td>{{ game.createdby === "none" ? "" : game.createdby }}</td>
        <td>{{ game.hostdays }}</td>
        <td v-if="game.haspassword"><lock-icon /></td>
        <td v-else></td>
      </tr>
    </table>
  </div>
</template>
<script>
import moment from "moment";
import LockIcon from "vue-material-design-icons/Lock.vue";

export default {
  name: "home",
  components: {
    LockIcon
  },
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
  methods: {
    openGame: function(id) {
      window.open("http://api.planets.nu/games/list?ids=" + id, "_blank");
    }
  },
  mounted: function() {
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

<style scoped>
.container {
  padding: 15px;
}
.table {
  width: 100%;
}
table,
th,
td {
  border: 1px solid #616161;
  border-collapse: collapse;
}
th,
td {
  padding: 10px;
}
.row:nth-child(even) {
  background-color: #f2f2f2;
}
.row:hover {
  background-color: #bae8f2;
  cursor: pointer;
}
</style>
