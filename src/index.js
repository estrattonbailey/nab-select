var proto = {
	find: function(selector){
		return Select(selector, this.context)
	},
	next: function(selector){
		return Select(selector, this.context)
	},
	closest: function(selector){
		var context = this.context,
				search = context,
				nodes = [];
		
		for (; search;) {
		 	search = search.parentNode;
			
			if (search === document){
				return context;
			}
			
			var match = _matches(selector.charAt(0), search, selector);
			
			if (match){
				nodes.push(match);
				return _bundle(nodes);
			}
		}
	},
	siblings: function(selector){
		var context = this.context;
		var siblings = _array(context.parentNode.children);
		var nodes = [];
		
		if (selector){
			siblings.forEach(function(sib, i){
				if (sib !== context) {
					var match = _matches(selector.charAt(0), sib, selector);
					if (match){
						nodes.push(match)
					}
				}
			});
		} else {
			siblings.forEach(function(sib, i){
				if (sib !== context) {
					nodes.push(sib)
				}
			});
		}
		
		return _bundle(nodes);
	}
}

function _array(nodelist){
	return Array.prototype.slice.call(nodelist);
}

function _matches(t, c, s){
	if (t === '.' && c.classList.contains(s.substr(1))) {
		return c;
	}
	if (t === '#' && c.id === s.substr(1)) {
		return c;
	} 
	if (t === '[' && c.hasAttribute(s.substr(1, s.length - 2))) {
		return c;
	}
	if (c.tagName.toLowerCase() === s) {
		return c;
	}
}

function _bundle(nodes){	
	var select;
	
	select = Object.create(proto);
	select.context = nodes[0];	
	select.length = nodes.length;
	
	nodes.forEach(function(n, i){
		select[i] = n;
	});
	
	return select;
}

function Select(selector, scope){
	var query,
			nodes = [];
	
	if (typeof selector !== 'string'){
		return nodes
	}
	
	if (selector.charAt(0) === '#') {
		query = document.getElementById(selector.substr(1))
	} else {
		query = (scope || document).querySelectorAll(selector)
	}
	
	if (!query) return nodes && console.log('Bad selector '+selector+'. Not found.');
	
	nodes = _array(query);

	return _bundle(nodes);
}

module.exports = Select;
