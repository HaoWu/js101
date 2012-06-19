/**
 * Created with IntelliJ IDEA.
 * User: HaoWu
 * Date: 6/12/12
 * Time: 2:34 PM
 */

TestCase('Test string basics', {
    'test string representation':function () {
        var str1 = "a";
        var str2 = 'a';

        assertEquals(str1, str2);
    },
    'test length property':function () {
        var four = "four";
        assertEquals(4, four.length);
    },
    'test character represented with hex code in string':function () {
        var str = '\x41\x61';

        assertEquals('Aa', str);
    },
    'test unicode in string':function () {
        var str = 'A\u0041\u0061';
        assertEquals('AAa', str);
        assertEquals(3, str.length);
    },
    'test convert to string':function () {
        var v1 = 10;
        var v2 = true;
        var v3 = false;
        var v4 = null;
        var v5 = {
            toString:function () {
                return "v5";
            }
        };
        var v6;

        var v7 = {};

        assertEquals("10", String(v1));
        assertEquals("true", String(v2));
        assertEquals("false", String(v3));
        assertEquals("null", String(v4));
        assertEquals('v5', String(v5));
        assertEquals("undefined", String(v6));
        assertEquals('[object Object]', String(v7)); // value of default toString Method
    }
});

TestCase('Test usage of methods of String type', {
    'test character methods':function () {
        var str = "hello";

        assertEquals("h", str.charAt(0));
        assertEquals('h', String.fromCharCode(str.charCodeAt(0)));
        assertEquals('h', str[0]);
    },
    'test concatenation method':function () {
        var str1 = "hello",
            str2 = "world",
            space = " ";
        assertEquals("hello world", str1.concat(space).concat(str2));
        assertEquals("hello world", str1.concat(space, str2));
        //concat method has no side effects
        assertEquals("hello", str1);
    },
    'test substring methods':function () {
        var str = "hello",
            startIndex = 2,
            length = 3,
            endIndex = 4;

        assertEquals('llo', str.substr(startIndex));
        assertEquals('llo', str.slice(startIndex));
        assertEquals('llo', str.substring(startIndex));

        assertEquals('llo', str.substr(startIndex, length));
        assertEquals('ll', str.slice(startIndex, endIndex));
        //endIndex can be larger than str length
        assertEquals('llo', str.slice(startIndex, str.length + 1));

        assertEquals('ll', str.substring(startIndex, endIndex));

        assertEquals("hello", str);
    },
    'test negative arguments in substring methods':function () {
        var str = "hello",
            startIndex = -3,
            length = 2,
            endIndex = -1;

        //substr and slice method treat negative number as length of string plus the number
        assertEquals('llo', str.substr(startIndex));
        assertEquals('llo', str.slice(startIndex));
        //substring method treat negative value as 0
        assertEquals('hello', str.substring(startIndex));

        assertEquals('ll', str.substr(startIndex, length));
        assertEquals('ll', str.slice(startIndex, endIndex));
        assertEquals('', str.substring(startIndex, endIndex));
    },
    'test location methods':function () {
        var str = 'hello';

        assertEquals(2, str.indexOf('l'));
        assertEquals(3, str.indexOf('l', 3));

        assertEquals(3, str.lastIndexOf('l'));
        assertEquals(2, str.lastIndexOf('l', 2));
    },
    'test trim method':function () {
        var str = '  hello  ';

        assertEquals('hello', str.trim());
        //trim does not change the original str value
        assertEquals('  hello  ', str);
    },
    'test case method':function () {
        var lowercaseStr = "hello",
            uppercaseStr = "HELLO";

        assertEquals(uppercaseStr, lowercaseStr.toUpperCase());
        assertEquals(uppercaseStr, lowercaseStr.toLocaleUpperCase());
        assertEquals(lowercaseStr, uppercaseStr.toLowerCase());
        assertEquals(lowercaseStr, uppercaseStr.toLocaleLowerCase());
    },
    'test html method':function () {
        var str = 'hello';
        assertEquals('<a name="anchorName">hello</a>', str.anchor('anchorName'));
        assertEquals('<big>hello</big>', str.big());
        assertEquals('<b>hello</b>', str.bold());
        assertEquals('<tt>hello</tt>', str.fixed());
        assertEquals('<font color="red">hello</font>', str.fontcolor('red'));
        assertEquals('<font size="5">hello</font>', str.fontsize(5));
        assertEquals('<sub>hello</sub>', str.sub());
        assertEquals('<sup>hello</sup>', str.sup());
        assertEquals('<small>hello</small>', str.small());
        assertEquals('<strike>hello</strike>', str.strike());
        assertEquals('<a href="url">hello</a>', str.link('url'));
        assertEquals('<i>hello</i>', str.italics());
    }
});