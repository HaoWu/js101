/**
 * Created with IntelliJ IDEA.
 * User: HaoWu
 * Date: 6/25/12
 * Time: 10:47 PM
 * To change this template use File | Settings | File Templates.
 */
TestCase('test this', {
    'test this in function':function () {
        function test() {
            return this;
        }

        assertEquals(window, test());
    },
    'test this in object method':function () {
        var test = {
            getThis:function () {
                return this;
            }
        };

        assertEquals(test, test.getThis());
    },
    'test this in function apply':function () {
        function test() {
            return this;
        }

        var obj = {};
        assertEquals(obj, test.apply(obj));
        assertEquals(obj, test.call(obj));
    }
});
