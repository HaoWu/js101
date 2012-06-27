/**
 * Created with IntelliJ IDEA.
 * User: HaoWu
 * Date: 6/27/12
 * Time: 1:59 PM
 * Copied for book Professional javascript for web developers with minor modification
 */
var xmlHandler = (function () {
    function createDocument() {
        if (typeof arguments.callee.activeXString != "string") {
            var versions = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.3.0",
                "MSXML2.DOMDocument"];

            for (var i = 0, len = versions.length; i < len; i++) {
                try {
                    var xmldom = new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    return xmldom;
                } catch (ex) {
                    //skip
                }
            }
        }

        return new ActiveXObject(arguments.callee.activeXString);
    }

    function parseXml(xml) {
        var xmldom = null;

        if (typeof DOMParser != "undefined") {
            xmldom = (new DOMParser()).parseFromString(xml, "text/xml");
            var errors = xmldom.getElementsByTagName("parsererror");
            if (errors.length) {
                throw new Error("XML parsing error:" + errors[0].textContent);
            }
        } else if (typeof ActiveXObject != "undefined") {
            xmldom = createDocument();
            xmldom.loadXML(xml);
            if (xmldom.parseError != 0) {
                throw new Error("XML parsing error: " + xmldom.parseError.reason);
            }
        } else {
            throw new Error("No XML parser available.");
        }

        return xmldom;
    }

    function serializeXml(xmldom) {
        if (typeof XMLSerializer != "undefined" && xmldom instanceof Document) {
            return (new XMLSerializer()).serializeToString(xmldom);
        } else if (typeof xmldom.xml != "undefined") {
            return xmldom.xml;
        } else {
            throw new Error("Could not serialize XML DOM.");
        }
    }

    return {
        parse:parseXml,
        serialize:serializeXml
    };

})();
