/**
 * Created with IntelliJ IDEA.
 * User: HaoWu
 * Date: 6/29/12
 * Time: 11:02 AM
 */
TestCase('Test xpath support in IE', {
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

        if (typeof ActiveXObject !== 'undefined') {
            this.domxml = createDocument();
            this.domxml.async = false; // loading file synchronouslys
            this.domxml.load("/test/test/xml/students.xml");
        }
    },

    'test select single node using xpath':function () {
        if (!this.domxml) return;

        var firstStudentName = this.domxml.documentElement.selectSingleNode("student/name");

        assertNotNull(firstStudentName);
        assertEquals('Sheng Cai', firstStudentName.firstChild.nodeValue);
    },

    'test select multiple nodes using xpath':function () {
        if (!this.domxml) return;
        var studentNames = this.domxml.documentElement.selectNodes('student/name');

        assertEquals(2, studentNames.length);
        assertEquals('name', studentNames.item(0).tagName);
    },

    'test namespace support':function () {
        if (!this.domxml) return;
        this.domxml.load("/test/test/xml/students_ns.xml");
        this.domxml.setProperty('SelectionNamespaces', 'xmlns:fdu="www.fdu.edu.cn"');

        var studentNames = this.domxml.documentElement.selectNodes('fdu:student/fdu:name');

        assertEquals(2, studentNames.length);
    }
});
