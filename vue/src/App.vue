<template>
	<div>
		<AppHeader></AppHeader>	
  	<router-view></router-view>	
  </div>
</template>

<script>
import AddBlog from './components/AddBlog.vue';
import Blogs from './components/Blogs.vue';
import Header from './components/Header.vue';


export default {
	components: {
		'AddBlog': AddBlog,
		'Blogs': Blogs,
		'AppHeader': Header
	}, 
  data () {
    return {
    }
  }
}
</script>

<style lang="less">

	* {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	body {
		margin: 0;
		padding: 0;
		color: #35495e;
	}

</style>
