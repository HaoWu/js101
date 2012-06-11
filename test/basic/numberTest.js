/**
 * Created with IntelliJ IDEA.
 * User: HaoWu
 * Date: 6/9/12
 * Time: 5:00 PM
 */
TestCase('Test js number basics', {
    'test assign number to variable':function () {
        var intNum = 55;
        var floatNum = 5.5;

        assertEquals('number', typeof intNum);
        assertEquals(intNum, 55);
    },
    'test float number':function () {
        var floatNum1 = .1;
        var floatNum2 = 0.1;
        var floatNum3 = 1e-1;

        assertEquals(floatNum1, floatNum2);
        assertEquals(floatNum3, floatNum2);
    },
    'test octal number':function () {
        var octNum = 071;

        assertEquals(57, octNum);

        var invalidOctNum = 079;
        assertEquals(79, invalidOctNum);
    },
    'test hex number':function () {
        var hexNum1 = 0xA;
        var hexNum2 = 0x1f;
        assertEquals(10, hexNum1);
        assertEquals(31, hexNum2);
    },
    'test number range':function () {
        // any number should between Max_Value and -Max_Value
        var one = 1;
        assertTrue(1 < Number.MAX_VALUE);
        assertTrue(1 > -Number.MAX_VALUE);

        assertEquals(1.7976931348623157e+308, Number.MAX_VALUE);

        //Min_Value is the smallest positive number
        assertTrue(Number.MIN_VALUE > 0);
        assertEquals(5e-324, Number.MIN_VALUE);
    },
    'test infinity':function () {
        var num = Number.MAX_VALUE + Number.MAX_VALUE;

        assertFalse(isFinite(num));
        assertEquals(Number.POSITIVE_INFINITY, num);

        num = -Number.MAX_VALUE - Number.MAX_VALUE;
        assertFalse(isFinite(num));
        assertEquals(Number.NEGATIVE_INFINITY, num);
    },
    'test whether input can be converted to number':function () {
        var canBeConvertedToNumber = function (obj) {
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
    'test NaN is not equal to NaN':function () {
        assertNotEquals(NaN, NaN);
    },
    'test NaN is not equal to any value':function () {
        assertNotEquals(NaN, Number.Infinity);
        assertNotEquals(NaN, 'NaN');
        assertNotEquals(NaN, 0);
    },
    'test any operation involving NaN returns NaN':function () {
        assertTrue(isNaN(NaN / 10));
        assertTrue(isNaN(NaN + 1));
        assertTrue(isNaN(NaN - 1));
        assertTrue(isNaN(NaN * 10));
        assertTrue(isNaN(NaN / 0));
    },
    'test float calculation is not accurate':function () {
        var number1 = 0.1,
            number2 = 0.2;

        assertNotEquals(0.3, number1 + number2);
        // fixed precision
        assertEquals(0.3, (number1 + number2).toPrecision(2))
    }
});

TestCase('number conversions with Number constructor', {
    'test should convert true to 1':function () {
        assertEquals(1, Number(true));
    },
    'test should convert false to 0':function () {
        assertEquals(0, Number(false));
    },
    'test should convert null to 0':function () {
        assertEquals(0, Number(null));
    },
    'test should convert undefined to NaN':function () {
        assertTrue(isNaN(Number(undefined)));
    },
    'test convert string with only numbers':function () {
        assertEquals(123, Number('123'));
        assertEquals(123, Number('+123'));
        assertEquals(-12, Number('-12'));
        // leading 0s will be ignored. will not be treated as octal number
        assertEquals(12, Number('012'));
        // leading/trailing spaces will be ignored
        assertEquals(12, Number('  12  '))
    },
    'test convert string with number and floating point only':function () {
        assertEquals(1.1, Number('1.1'));
        assertEquals(.1, Number('.1'));
    },
    'test should convert empty string to 0':function () {
        assertEquals(0, Number(''));
    },
    'test should convert string with hex number prefix':function () {
        assertEquals(31, Number('0x1f'));
    },
    'test should convert string to NaN otherwise':function () {
        assertTrue(isNaN(Number('abc')));
        assertTrue(isNaN(Number('123abc')));
    }
});

TestCase('Test difference between parseInt/parseFloat and Number constructor', {
    'test convert empty string':function () {
        assertEquals(0, Number(''));
        assertTrue(isNaN(parseInt('')));
    },
    'test convert string with leading numbers and other characters after':function () {
        assertTrue(isNaN(Number('1234abc')));
        assertEquals(1234, parseInt('1234abc'))
    },
    'test convert string start with 0':function () {
        var num = parseInt('011');
        assertTrue(num === 9 || num === 1);

        assertEquals(11, Number('011'));
    },
    'test radix support in parseInt':function () {
        assertEquals(2, parseInt("10", 2));
        assertEquals(8, parseInt("10", 8));
        assertEquals(10, parseInt("10", 10));
        assertEquals(16, parseInt("10", 16));
        assertEquals(175, parseInt("AF", 16));
    },
    'test e-notation':function () {
        assertEquals(100, parseFloat("1e2"));
        assertEquals(1, parseInt("1e2"));
        assertEquals(100, Number("1e2"));
    },
    'test convert string with multiple decimal points':function () {
        assertEquals(2.3, parseFloat("2.3.4"));
        assertTrue(isNaN(Number("2.3.4")));
    }
});