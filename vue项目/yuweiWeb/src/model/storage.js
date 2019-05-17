var storage = {
	
	set(key,value){
		sessionStorage.setItem(key,value);
	},
	getKey(key){
		return sessionStorage.getItem(key);
	},
	remove(key){
		sessionStorage.removeItem(key)
	}
}

export default storage;