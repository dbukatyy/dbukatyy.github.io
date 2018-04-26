<template>
	<nav>
   <router-link to='/'>Blogs</router-link>
   <router-link to='/add'>Add Blog</router-link>
  </nav>
</template>

<script>
export default {
}
</script>

<style scope lang="less">
  nav {
    background: #42b983;
    padding: 15px;
    text-align: center;

    a {
      text-decoration: none;
      color: #fff;
      text-transform: uppercase;
      padding: 5px 15px;
      display: inline-block;
      background: #35495e;
      border-radius: 10px;
    }
  }

  .router-link-exact-active {
    color:#42b983;
  }
</style>
