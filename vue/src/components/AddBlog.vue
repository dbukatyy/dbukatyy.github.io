<template>
  <div id="add-blog">
  	<h1>Add a new blog</h1>

    <form>
    	<label for="blog-title">Blog title:</label>
    	<input v-model="blog.title" id="blog-title" type="text" required>
    	<label for="blog-text">Blog info:</label>
    	<textarea v-model="blog.content" id="blog-text"></textarea>

    	<div v-for="category in categories" class="checkbox">
    		<label>
    			<span>{{ category }}</span>
    			<input v-model="blog.category" :value="category" type="checkbox">
    			<span class="checkbox__field"><i>&#10004;</i></span>
    		</label>
    	</div>
    </form>
    <button class="blog-add" @click="addBlog">Add</button>

    <article class="blog-prev">
    	<h2>Preview Blog</h2>
    	<p>Blog title:</p>
    	<h3>{{ blog.title }}</h3>
    	<p>Blog content:</p>
    	<div>{{ blog.content }}</div>
    	<p>Blog category:</p>
    	<ul>
    		<li v-for="category in blog.category">{{ category }}</li>
    	</ul>
    </article>

    <div class="notify" v-if="notify">
    	Blog successfully added
    </div>

  </div>
</template>

<script>
export default {
  
  data () {
    return {
		blog: {
			title: '',
			content:'',
			category: []
		},
		categories: ['Politic', 'It', 'Interesting'],
		notify: false
    }
  },
  methods: {
  	addBlog: function() {
  		fetch('https://vue-app-1ca0c.firebaseio.com/posts.json', {
		    method: 'POST',
		    body: JSON.stringify(this.blog)
		})
		.then(resp => resp.json())
		.then(result => {
			this.notify = true;

			setTimeout(() => {
				this.notify = false;				
			}, 1500)

			this.blog = {
				title: '',
				content:'',
				category: []
			};
		});
  	}

  }
}
</script>

<style scoped lang="less">
	#add-blog {
		max-width: 500px;
		margin: 20px auto;
	}

	h1 {
		text-align: center;
	}

	.notify{
		position: fixed;
		top: 60px;
		right: 0;
		padding: 10px 15px;
		background: #35495e;
		color: #42b983;
	}

	.blog {

		&-prev {
			margin-top: 30px;
			padding: 8px;
			border: 1px dashed #ccc;

			h2 {
				margin: 0;
			}
		}

		&-add {
			background: #35495e;
			color: #42b983;
			border: none;
			padding: 10px 15px;
			display: block;
			margin: auto;
			width: 100%;
			cursor: pointer;
			text-transform: uppercase;

			&:focus {
				outline: none;
			}
		}
	}

	input, textarea {
		display: block;
		width: 100%;
		margin: 10px 0;
		padding: 5px 10px;
	}

	input:focus, textarea:focus {
		outline-color: #42b983;
	}
	
	.checkbox {
		display: inline-block;
		margin-right: 30px;
		margin-bottom: 20px;

		&__field {
			cursor: pointer;
			display: inline-block;
			border: 1px solid #35495e;
			width: 15px;
			height: 15px;
			line-height: 15px;
			font-size: 14px;
			color: #42b983;
			text-align: center;

			i {
				opacity: 0;
			}
		}

		input {
			display: none;

			&:checked + .checkbox__field i {
				opacity: 1;
			}
		}
	}

</style>
