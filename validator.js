;(function(global, factory, plug){
  factory.call(global, global.jQuery, plug);
})(this, function($, validator){
  // 默认值常量
  var __DEFS__ = {
    raise: "change", //最常用的设为默认值
    errorMsg: "* 校验失败",
    extendRule: function(rule){
      $.extend(__RULES__, rule);
    }
  }

  // 校验规则
  var __RULES__ = {
    require: function(){
      const val = this.val();
      return val!=""&&val!=null&&val!=undefined; 
    },
    email: function(){
      return /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/.test(this.val());
    },
    regexp: function(config){
      return new RegExp(config).test(this.val());
    }
  }
  $.fn[validator] = function(ops){
    if(!this.is('form')){
      throw new Error("Type error[require form tag]");
    }
    this.$fields = this.find("input,textarea,select")
      .not("input[type=button],input[type=submit],input[type=reset],input[type=image]");
    $.extend(this, __DEFS__, ops);
    var that = this;
    this.$fields.on(this.raise, function(){
      var $fields = $(this);
      var $group = $fields.parent(".form-group");//父元素
      $group.removeClass('has-success has-error');
      $group.find('.help-block').remove();
      var config,error,__err__ = true; //校验结果默认为rue
      $.each(__RULES__, function(rule, valid){
        config = $fields.data("bv-" + rule);
        if(config){
          __err__ = valid.call($fields, config);
          $group.addClass(__err__?'has-success':'has-error');
          if(!__err__){
            error = $fields.data('bv-'+rule+'-error')|| that.errorMsg;
            $fields.after('<span class="help-block">'+error+'</span>')
          }
          return __err__;
        }
      })
    })
    return this;
  }
}, 'bootstrapValidate')
