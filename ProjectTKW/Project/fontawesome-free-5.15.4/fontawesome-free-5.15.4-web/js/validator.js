function Validator(options) {
    var selectorRules = {};
    function validate(inputElement,rule) {
        var errorElement = inputElement.closest('div').querySelector(options.errorSelector);
        var errorMessage;
        var rules = selectorRules[rule.selector];
  
        for(var i=0; i<rules.length; ++i) {
            errorMessage = rules[i](inputElement.value);
            if(errorMessage) break;
        }
  
        if(errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        }else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
  
    }
  
    var formElement = document.querySelector(options.form);
  
    if(formElement) {
        formElement.onsubmit = function(e) {
            e.preventDefault();
            options.rules.forEach(function(rule) {
                var inputElement = formElement.querySelector(rule.selector);
                validate(inputElement,rule);
               
            });
            
        }
        options.rules.forEach(function(rule) {
  
            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            }else {
                selectorRules[rule.selector] = [rule.test];
            }
            var inputElement = formElement.querySelector(rule.selector);
            
            if(inputElement) {
  
                inputElement.oninput = function () {
                    var errorElement = inputElement.closest('div').querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
  
    }
  }
  
  Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : message;
        }
    };
  }
  
console.log('hello')
  