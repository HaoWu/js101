TestCase('Test basics of js functions', {
    getArguments : function() {
	    return arguments;
    },
    'test arguments length' : function() {
	var args = this.getArguments(1,2);
	
	assertEquals(2, args.length);
    },
    'test arguments callee' : function() {
	var args = this.getArguments(1,2);

	assertEquals(this.getArguments, args.callee);
    }
});