<template>
	<!--富文本编辑器拓展之后-->
	<div>
	    <quill-editor ref="myTextEditor" :options="quillOption" style="height: 500px; width: 900px;margin: 10px 0 150px 235px; border-radius: 50px;"
	              v-model="context">
	    </quill-editor>
	    
  </div>
</template>

<script>
	import quillConfig from '@/model/quill-config.js'
	export default {
		data() {
			return {
				 context: '',
				 quillOption: quillConfig,
			}
		}
	}
</script>

<style>

</style>