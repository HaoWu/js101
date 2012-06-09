/**
 * Created with IntelliJ IDEA.
 * User: HaoWu
 * Date: 6/9/12
 * Time: 4:23 PM
 */
TestCase('js basic test', {
    'test variable is case sensitive': function(){
        var variable = 1;
        var Variable = 2;

        assertEquals(1, variable);
        assertEquals(2, Variable);
    },
    'test redeclare variable overwritten previous one': function() {
        var variable = 1;
        var variable = 2;

        assertEquals(2, variable);
    },
    'test variable declared without var becomes global variable': function() {
        (function(){
            globalVariable = 1;
        })();

        assertEquals(globalVariable, 1);
    },
    'test primitive types': function() {
        // five primitive types in js: undefined, null, boolean, number, string
        assertEquals('undefined', typeof undefinedVariable);
        assertEquals('number', typeof 1);
        assertEquals('string', typeof 'a');
        assertEquals('boolean', typeof true);
    },
    'test typeof null is object': function() {
        assertEquals('object', typeof null);
    },
    'test typeof function is function': function() {
        var f = function(){};
        assertEquals('function', typeof f);
    },
    'test declare object': function() {
        var obj = {};
        assertEquals('object', typeof obj);

        obj = {
            name : "obj"
        };

        assertEquals("obj", obj.name);
    }
});
