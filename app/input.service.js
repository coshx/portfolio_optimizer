System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var InputService;
    return {
        setters:[],
        execute: function() {
            InputService = (function () {
                function InputService() {
                }
                InputService.prototype.getInput = function () {
                    return ["Course1", "Course2", "Course3"];
                };
                return InputService;
            }());
            exports_1("InputService", InputService);
        }
    }
});
//# sourceMappingURL=input.service.js.map