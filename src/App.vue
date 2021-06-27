<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" class='has-text-success'>🐸 Have U Read This</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <hr/>
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap');
hr {
  border: 0.5px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
}
#app {
  font-family: 'Source Code Pro', monospace;
  font-size: 0.9em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 15px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
