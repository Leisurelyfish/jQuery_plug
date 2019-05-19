;(function(global, factory, plug){
  factory.call(global, global.jQuery, plug);
})(this, function($, validator){
  // 默认值常量
  var __DEFS__ = {
    raise: "change", //最常用的设为默认值
  }

  // 校验规则
  var __RULES__ = {
    require: function(){
      const val = this.val();
      return val!=""&&val!=null&&val!=undefined; 
    },
    email: function(){
      return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.text(this.val());
    },
    regex: function(val){
      
    }
  }
  $.fn[validator] = function(ops){
    if(!this.is('form')){
      throw new Error("Type error[require form tag]");
    }
    this.$fields = this.find("input,textarea,select")
      .not("input[type=button],input[type=submit],input[type=reset],input[type=image]");
    $.extend(this, __DEFS__, ops);
    this.$fields.on(this.raise, function(){
      var $fields = $(this);
      // console.log($(this))
      var __err__ = true; //校验结果默认为rue
      $.each(__RULES__, function(rule, valid){
        if($fields.data("bv-" + rule)){
          __err__ = valid.call($fields);
          return __err__;
        }
      })
    })
  }
}, 'bootstrapValidate')
