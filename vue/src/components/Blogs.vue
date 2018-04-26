<template>
	<div class="blogs">
		<h1>All Blogs</h1>
		<input v-model="search" type="text" class="search" placeholder="Search blog...">
		<article v-for="blog in filtersBlog">
			<header class="blog-header">
				<h2>{{ blog.title }}</h2>
				<button :data-id="blog.id" @click="delBlog">&#10008;</button>
			</header>
			<p>{{ blog.content }}</p>
			<div class="categories">
				<span v-for="category in blog.category">{{ category }} </span>
			</div>
		</article>
	</div>
</template>

<script>
import dbase from '../dbase.js'

const postsRef = dbase.database().ref('posts');

export default {
	
  data () {
    return {
    	blogs: [],
    	search: ''
    }
  },
  computed: {
	filtersBlog: function() {
		return this.blogs.filter(blog => blog.title.match(this.search) || blog.content.match(this.search))
	}
  },
  methods: {
	delBlog: function(e) {

		const delBlogId = e.target.dataset.id;

		this.blogs = this.blogs.filter(blog => blog.id !== delBlogId);
		
		postsRef.child(delBlogId).remove();
	}
  },
  created() {
  	fetch('https://vue-app-1ca0c.firebaseio.com/posts.json')
	.then(resp => resp.json())
	.then(result => {

		for (let id in result) {
			result[id].id = id;
		}

		this.blogs = Object.values(result);

	});
  }


}
</script>

<style scoped lang="less">
	.blogs {
		max-width: 800px;
		margin: 20px auto;
	}

	h1 {
		text-align: center;
	}

	p {
		padding: 0 15px;
	}

	article {
		background: #cccccc40;
		/*padding: 15px;*/
		margin-bottom: 30px;
		color: #35495e;

		h2 {
			margin: 0;
			text-transform: uppercase;
		}
	}

	.blog-header {
		padding: 10px 15px;
		background: #35495e;
		color: #42b983;
		display: flex;
		justify-content: space-between;
		align-items: center;

		button {
			cursor: pointer;
			background: none;
			border: none;
			color: #42b983;
			border: 2px solid #42b983;
			border-radius: 50%;

			&:focus {
				outline: none;
			}
		}
	}

	.categories {
		text-align: right;
		padding: 15px;

		span {
			background: #42b9838c;
			border-radius: 5px;
			padding: 2px 5px;
			margin-left: 5px;
			color: #35495e;
		}
	}

	.search {
		width: 100%;
		margin: 15px 0 30px;
		padding: 15px 20px;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		background: #cccccc40;
		border: none;

		&:focus {
			outline-color: #42b9838c; 
		}
	}
</style>
