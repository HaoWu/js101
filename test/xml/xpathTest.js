/**
 * Created with IntelliJ IDEA.
 * User: HaoWu
 * Date: 6/28/12
 * Time: 2:49 PM
 */

TestCase('Test javascript xpath support', {
    setUp:function () {
        this.isXpathSupported = document.implementation.hasFeature("XPath", "3.0");

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("get", "/test/test/xml/students.xml", false);
        xmlhttp.send(null);
        this.xmldom = xmlhttp.responseXML;

    },
    'test evaluate xpath return snapshot list':function () {
        if (!this.isXpathSupported) return;
        var studentNames = this.xmldom.evaluate('student/name', this.xmldom.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        assertEquals(2, studentNames.snapshotLength);
        assertEquals('name', studentNames.snapshotItem(0).tagName);
        assertEquals('Bing Sun', studentNames.snapshotItem(1).firstChild.nodeValue);
    },
    'test evaluate xpath to get descendants':function () {
        if (!this.isXpathSupported) return;
        var studentNames = this.xmldom.evaluate('//name', this.xmldom.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        assertEquals(2, studentNames.snapshotLength);
        assertEquals('name', studentNames.snapshotItem(0).tagName);
        assertEquals('Bing Sun', studentNames.snapshotItem(1).firstChild.nodeValue);
    },
    'test evaluate xpath and return single node result':function () {
        if (!this.isXpathSupported) return;
        var studentNames = this.xmldom.evaluate('student/name', this.xmldom.documentElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        assertEquals('name', studentNames.singleNodeValue.tagName);
        assertEquals('Sheng Cai', studentNames.singleNodeValue.firstChild.nodeValue)
    },
    'test evaluate xpath and return node iterator':function () {
        if (!this.isXpathSupported) return;
        var studentNames = this.xmldom.evaluate('student/name', this.xmldom.documentElement, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        if (studentNames !== null) {
            var node = studentNames.iterateNext();
            assertEquals('name', node.tagName);
            assertEquals('Sheng Cai', node.firstChild.nodeValue);
        }
    },
    'test evaluate xpath and return boolean type':function () {
        if (!this.isXpathSupported) return;
        var hasStudentNameElem = this.xmldom.evaluate('student/name', this.xmldom.documentElement, null, XPathResult.BOOLEAN_TYPE, null);
        assertTrue(hasStudentNameElem.booleanValue);

        hasStudentNameElem = this.xmldom.evaluate('student/major', this.xmldom.documentElement, null, XPathResult.BOOLEAN_TYPE, null);
        assertFalse(hasStudentNameElem.booleanValue);
    },
    'test evaluate xpath and return number type':function () {
        if (!this.isXpathSupported) return;
        var hasStudentNameElem = this.xmldom.evaluate('count(student/name)', this.xmldom.documentElement, null, XPathResult.NUMBER_TYPE, null);
        assertEquals(2, hasStudentNameElem.numberValue);
    },
    'test evaluate xpath and return string type':function () {
        if (!this.isXpathSupported) return;
        var studentNameElem = this.xmldom.evaluate('student/name', this.xmldom.documentElement, null, XPathResult.STRING_TYPE, null);
        assertEquals('Sheng Cai', studentNameElem.stringValue);
    },
    'test evaluate xpath and return any type':function () {
        if (!this.isXpathSupported) return;
        var studentNames = this.xmldom.evaluate('student/name', this.xmldom.documentElement, null, XPathResult.ANY_TYPE, null);
        assertEquals(XPathResult.UNORDERED_NODE_ITERATOR_TYPE, studentNames.resultType);
    },
    'test evaluate xpath to get attributes': function() {
        if (!this.isXpathSupported) return;
        var studentMajors = this.xmldom.evaluate('student/@major', this.xmldom.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        assertEquals(2, studentMajors.snapshotLength);
        assertEquals('Computer Science', studentMajors.snapshotItem(0).nodeValue);
    }
});