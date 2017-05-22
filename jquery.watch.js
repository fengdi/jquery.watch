//https://github.com/fengdi/jquery.watch
//jquery.watch.js
//v1.0.1

;(function($){
var config = { childList: true, subtree:true };

var MutationObserver =  window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;

function createObserver(callback){
  if(MutationObserver){
    callback = callback || $.noop;
    return new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        callback.call(this, mutation)
      });
    });
  }else{
    throw new Error('window.MutationObserver is undefined');
  }
}

$.fn.extend({
  initObserver:function(){
    this.each(function(index, elem){
      if( !$(elem).data('$observer') ){
        var ob = createObserver(function(mutation){
          $(elem).trigger('observer', mutation);
        });
        $(elem).data('$observer', ob);
        ob.observe(this, config);
      }
    });
    return this;
  },
  unObserver: function(){
    this.each(function(index, elem){
      var observer = $(this).data('$observer');
      if(observer){
        observer.disconnect();
        $(this).removeData('$observer');
      }
    });
    return this;
  },
  watch: function(selector, callback, options){

    var self = this;
    options = $.extend({
        'loadfirst' : false        //优先检测是否存在
    }, options || {});

    self.initObserver();
    callback = callback || $.noop;
    self.each(function(index, elem){
      $(elem).on('observer', function(e, mutation){
        var $find = $(elem).find(selector);
        //当选择器查询到，并且observer观察到的新增元素 是同一个元素时
        mutation.addedNodes.forEach(function(el){
          if($find.is(el)){
            callback($(el), mutation);
          }
        });
      });

      if(options.loadfirst){
        var $find = $(elem).find(selector);
        if($find.length){
          callback($find, null);
        }
      }

    });
    return this;
  }
});

})(jQuery);
