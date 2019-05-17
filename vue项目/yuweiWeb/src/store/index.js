import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


const state = {
	token: '',
	name: '',
	
}

const store = new Vuex.Store({
	state,
})

export default store;