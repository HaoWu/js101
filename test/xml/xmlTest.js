/**
 * Created with IntelliJ IDEA.
 * User: HaoWu
 * Date: 6/26/12
 * Time: 5:11 PM
 */
TestCase('Test xml support in javascript', {
    'test create a document':function () {
        var xmldom = document.implementation.createDocument('', 'root', null);

        assertEquals('root', xmldom.documentElement.tagName);
    },
    'test create a child in xml':function () {
        var xmldom = document.implementation.createDocument('', 'root', null);

        var childElement = xmldom.createElement('child');
        var rootElement = xmldom.documentElement;
        rootElement.appendChild(childElement);

        assertEquals(childElement, rootElement.firstChild);
    },
    'test parsing xml string to dom':function () {
        if(typeof DOMParser === 'undefined') return;

        var parser = new DOMParser();
        var xmldom = parser.parseFromString('<root><child/></root>', 'text/xml');
        var rootNode = xmldom.documentElement;

        assertEquals('root', rootNode.tagName);
        assertEquals('child', rootNode.firstChild.tagName);
    },
    'test parsing error':function () {
        if(typeof DOMParser === 'undefined') return;

        var parser = new DOMParser(),
            parserError = false;
        try {
            var xmldom = parser.parseFromString('<root>', 'text/xml');
            parserError = xmldom.getElementsByTagName('parsererror').length > 0;
        } catch (ex) {
            parserError = true;
        }

        assertTrue(parserError);
    },
    'test xml serializer':function () {
        if(typeof XMLSerializer === 'undefined') return;

        var serializer = new XMLSerializer();
        var xmldom = document.implementation.createDocument('', 'root', null);
        var childElement = xmldom.createElement('child');
        xmldom.documentElement.appendChild(childElement);
        var xmlString = serializer.serializeToString(xmldom);

        assertEquals('<root><child/></root>', xmlString.replace(/\s+/g, ''));
    },
    'test load xml file with ajax':function () {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("get", "/test/test/xml/students.xml", false);
        xmlhttp.send(null);
        var xmldom = xmlhttp.responseXML;

        var rootElement = xmldom.documentElement;
        assertEquals('students', rootElement.tagName);
        assertEquals(2, rootElement.getElementsByTagName('student').length);
    },
    'test serialize xml response from ajax request': function() {
        if(typeof XMLSerializer === 'undefined') return;
        // (new XMLSerializer()).serializeToString(xmlhttp.responseXML) will throw "no such interface supported" error in IE9
        // because xmlhttp.responseXML is not an instance of Document type, it is actually IXMLDOMDocument2
        // to serialize this object, use xmlhttp.responseXML.xml

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("get", "/test/test/xml/students.xml", false);
        xmlhttp.send(null);
        var xmldom = xmlhttp.responseXML;
        var xmlString;

        if(xmldom instanceof Document) {
            xmlString = (new XMLSerializer()).serializeToString(xmldom);
        } else if (xmldom.xml) {
            xmlString = xmldom.xml;
        }
        assertTrue(xmlString.indexOf('<students>') >= 0);
    },
    'test parse method of xmlhandler':function () {
        var xmldom = null;
        xmldom = xmlHandler.parse("<root><child/></root>");

        assertEquals('root', xmldom.documentElement.tagName);
        assertEquals('child', xmldom.documentElement.firstChild.tagName);

        var anotherChild = xmldom.createElement("child");
        xmldom.documentElement.appendChild(anotherChild);

        var children = xmldom.getElementsByTagName("child");
        assertEquals(2, children.length);
        try {
            xmldom = xmlHandler.parse("<root>");
            fail("Should throw parsing error");
        } catch (ex) {
            console.log("Parsing error: " + ex.message);
        }
    },
    'test serialize method of xmlhandler': function() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("get", "/test/test/xml/students.xml", false);
        xmlhttp.send(null);
        var xmldom = xmlhttp.responseXML;

        var xmlString = xmlHandler.serialize(xmldom);

        assertTrue(xmlString.indexOf('<students>') >= 0);
    }
});
