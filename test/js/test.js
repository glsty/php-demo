

function observe(data,asRoot){
	if(!data || typeof data !=='object'){
		return;
	}
	/*Object.keys(data).forEach(function(key){
		observeProperty(data,key,data[key]);
	})*/
	return new Observer(data);
}
function Observer(val){
	this.val = val;
	this.walk(val);
}
Observer.prototype = {
	walk:function(obj){
		var self = this;
		Object.keys(obj).forEach(function(key){
			self.observeProperty(obj,key,obj[key]);
		})
	},
	observeProperty:function (obj,key,val){
		observe(val);
		Object.defineProperty(obj,key,{
			enumerable: false,
			configurable: false,
			get:function(){
				if (Dep.target) {
		          dep.depend();
		        }
		        if (childOb) {
		          childOb.dep.depend();
		        }
		        return val;
			},
			set:function(newval){
				if(val === newval||(newval !== newval&&val !==val)){
					return;
				}
				console.log('更新',val,'=>',newval);
				 // 监听子属性
		        childOb = observe(newVal);
		        // 通知数据变更
		        dep.notify();
			}
		})
	},


}

var uid =0;
function Dep(){
	this.id = uid++;
	// array 存储Watcher
  	this.subs = [];
}
Dep.target = null;
Dep.prototype = {
/**
   * [添加订阅者]
   * @param  {[Watcher]} sub [订阅者]
   */
   addSub: function (sub) {
    this.subs.push(sub);
  },
  /**
   * [移除订阅者]
   * @param  {[Watcher]} sub [订阅者]
   */
  removeSub: function (sub) {
    let index = this.subs.indexOf(sub);
    if (index !== -1) {
      this.subs.splice(index ,1);
    }
  },
  //通知数据变更
  notify: function () {
    this.subs.forEach(function(sub){
      // 执行sub的update更新函数
      sub.update();
    });
  },
  // add Watcher
  depend: function () {
    Dep.target.addDep(this);
  }
}
// 结合Watcher
/** 
* Watcher.prototype = {
*   get: function () {
*     Dep.target = this;
*     let value = this.getter.call(this.vm, this.vm);
*     Dep.target = null;
*     return value;
*   },
*   addDep: function (dep) {
*     dep.addSub(this);
*   }
* }
*/
function Compile (el, value) {
  this.$val = value;
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);
  if (this.$el) {
    this.compileElement(this.$el);
  }
}

Compile.prototype = {
	compileElement:function(el){
		var self = this;
		var childNodes = el.childNodes;
		[].slice.call(childNodes).forEach(function(node){
			var text =node.textContent;
			var reg = /\{\{((?:.|\n)+?)\}\}/;
			if(self.isElementNode(node)){
				self.compile(node);
			}else if(self.isTextNode(node)&&reg.test(text)){
				self.compileText(node,RegExp.$1.trim());
			}
			if(node.childNodes&&node.childNodes.length){
				self.compileElement(node);
			}

		})
	},
	compile:function(node){
		var nodeAttrs = node.attributes;
		var self = this;
		[].slice.call(nodeAttrs).forEach(function(attr){
			var attrName = attr.name;
			if(self.isDirective(attrName)){
				var exp = attr.value;
				node.innerHTML = typeof this.$val[exp] ==='undefined' ?'':this.$val[exp];
				node.removeAttribute(attrName);
			}
		})
	},
	compileText:function(node,exp){
		node.textContent = typeof this.$val[exp] === 'undefined' ? '' :this.$val[exp];
	},
	// element节点
	isElementNode: function (node) {
	    return node.nodeType === 1;
	  },
	// text纯文本
	isTextNode: function (node) {
	    return node.nodeType === 3
	  },
	// x-XXX指令判定
	isDirective: function (attr) {
	    return attr.indexOf('x-') === 0;
	  }
}






