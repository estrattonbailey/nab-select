var del = document.documentElement || {};
var _match = (del.matches || del.webkitMatchesSelector || del.mozMatchesSelector || del.oMatchesSelector || del.msMatchesSelector || function(){return false;});

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
			
			var match = _match.call(search, selector) ? search : false;
			
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
					var match = _match.call(sib, selector) ? sib : false;
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
	
  if (selector.nodeType && selector.nodeType === 1){
    nodes.push(selector);
  } else {
    query = (scope || document).querySelectorAll(selector)
    
    if (!query) return nodes && console.log('Bad selector '+selector+'. Not found.');
    
    nodes = _array(query);
  }

	return _bundle(nodes);
}

return Select;
