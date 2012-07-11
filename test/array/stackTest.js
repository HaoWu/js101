/**
 * Created with IntelliJ IDEA.
 * User: HaoWu
 * Date: 7/2/12
 * Time: 11:23 AM
 */
TestCase('Test stack data structure', {
    setUp:function() {
      this.stack = new Stack();
    },
    'test isEmpty': function() {
      assertTrue(this.stack.isEmpty());
    },
    'test push' : function() {
        this.stack.push('a');
        this.stack.push('b');
        this.stack.push('c');

        assertFalse(this.stack.isEmpty());
        assertEquals('c', this.stack.top());
    },
    'test pop': function() {
        this.stack.push('a');
        assertFalse(this.stack.isEmpty());

        var poppedElement = this.stack.pop();
        assertTrue(this.stack.isEmpty());
        assertEquals('a', poppedElement);
    },
    'test two stacks are independent of each other': function() {
        var stack1 = new Stack();
        var stack2 = new Stack();

        stack1.push('a');
        stack2.push('b');

        assertEquals('a', stack1.top());
        assertEquals('b', stack2.top());
    }
});