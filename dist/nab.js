(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ }
/******/ ])
});
;