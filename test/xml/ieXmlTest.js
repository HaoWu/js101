/**
 * Created with IntelliJ IDEA.
 * User: HaoWu
 * Date: 6/27/12
 * Time: 1:24 PM
 */

TestCase('Test create and serialize xml in IE', {
    setUp:function () {
        function createDocument() {
            if (typeof arguments.callee.activeXString != "string") {
                var versions = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument"],
                    i, len;
                for (i = 0, len = versions.length; i < len; i++) {
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex) {
                        //skip
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        }
        if(typeof ActiveXObject !== 'undefined') {
            this.domxml = createDocument();
        }
    },

    'test load string to xml dom': function() {
        if(! this.domxml) return;
        this.domxml.loadXML('<root><child/></root>');

        assertEquals('root', this.domxml.documentElement.tagName);
    },
    'test append child to document': function() {
        if(! this.domxml) return;
        this.domxml.loadXML('<root><child/></root>');

        var rootElement = this.domxml.documentElement;
        var child2 = this.domxml.createElement('child2');
        rootElement.appendChild(child2);

        assertEquals(child2, rootElement.lastChild);
    },
    'test parse error': function() {
        if(! this.domxml) return;
        this.domxml.loadXML('<root></root>');

        assertEquals(0, this.domxml.parseError);

        this.domxml.loadXML('<root>');
        assertTrue(0 !== this.domxml.parseError);

        var testName = 'Test create and serialize xml in IE : test parse error - ';
        console.log(testName + 'parseError.errorCode:' + this.domxml.parseError.errorCode);
        console.log(testName + 'parseError.reason:' + this.domxml.parseError.reason);
        console.log(testName + 'parseError.line:' + this.domxml.parseError.line);
        console.log(testName + 'parseError.linepos:' + this.domxml.parseError.linepos);
    }
});