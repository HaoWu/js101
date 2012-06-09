/**
 * Created with IntelliJ IDEA.
 * User: HaoWu
 * Date: 6/9/12
 * Time: 5:00 PM
 */
TestCase('Test js number', {
    'test assign number to variable': function() {
        var intNum = 55;
        var floatNum = 5.5;

        assertEquals('number', typeof intNum);
        assertEquals(intNum, 55);
    },
    'test float number': function() {
        var floatNum1 = .1;
        var floatNum2 = 0.1;
        var floatNum3 = 1e-1;

        assertEquals(floatNum1, floatNum2);
        assertEquals(floatNum3, floatNum2);
    },
    'test octal number': function() {
        var octNum = 071;

        assertEquals(57, octNum);

        var invalidOctNum = 079;
        assertEquals(79, invalidOctNum);
    },
    'test hex number': function() {
        var hexNum1 = 0xA;
        var hexNum2 = 0x1f;
        assertEquals(10, hexNum1);
        assertEquals(31, hexNum2);
    },
    'test number range': function() {
        // any number should between Max_Value and -Max_Value
        var one = 1;
        assertTrue(1 < Number.MAX_VALUE);
        assertTrue(1 > -Number.MAX_VALUE);

        assertEquals(1.7976931348623157e+308, Number.MAX_VALUE);

        //Min_Value is the smallest positive number
        assertTrue(Number.MIN_VALUE > 0);
        assertEquals(5e-324, Number.MIN_VALUE);
    },
    'test infinity':function() {
        var num = Number.MAX_VALUE + Number.MAX_VALUE;

        assertFalse(isFinite(num));
        assertEquals(Number.POSITIVE_INFINITY, num);

        num = -Number.MAX_VALUE - Number.MAX_VALUE;
        assertFalse(isFinite(num));
        assertEquals(Number.NEGATIVE_INFINITY, num);
    },
    'test whether input can be converted to number': function() {
        var canBeConvertedToNumber = function(obj) {
            return !(isNaN(obj));
        };

        assertTrue(canBeConvertedToNumber(10));

        assertFalse(canBeConvertedToNumber("blue"));
        assertTrue(canBeConvertedToNumber("10")); // convert to 10

        assertTrue(canBeConvertedToNumber(true)); // convert to 1
        assertTrue(canBeConvertedToNumber(false)); // convert to 0

        assertFalse(canBeConvertedToNumber(NaN));

        assertTrue(canBeConvertedToNumber(null)); // convert to 0

        assertFalse(canBeConvertedToNumber(undefined));
    },
    'test NaN is not equal to NaN': function() {
        assertNotEquals(NaN, NaN);
    },
    'test NaN is not equal to any value': function() {
        assertNotEquals(NaN, Number.Infinity);
        assertNotEquals(NaN, 'NaN');
        assertNotEquals(NaN, 0);
    },
    'test any operation involving NaN returns NaN': function() {
        assertTrue(isNaN(NaN/10));
        assertTrue(isNaN(NaN + 1));
        assertTrue(isNaN(NaN - 1));
        assertTrue(isNaN(NaN * 10));
        assertTrue(isNaN(NaN/0));
    }
});