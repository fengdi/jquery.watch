# jquery.watch
watch dom change



##usage

检测节点变化
$(elem).watch(selector, callback, options)


    $('body').watch('.test-1 p', function(elem){
      //在body下面检测 .test-1 p
      //当节点变化后出现满足要求的节点触发

    });

options可以设置 loadfirst true|false（默认false）
loadfirst为true时，会先检测selector是否存在（存在就会触发callback）再进行监视

支持链式写法，

    $('body').watch('.test-1 p', function(elem){
      //todo
    }, {loadfirst:true})
    .watch('.test-2 p', function(elem){
      //todo
    }, {loadfirst:true});
