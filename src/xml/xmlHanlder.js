/**
 * Created with IntelliJ IDEA.
 * User: HaoWu
 * Date: 6/27/12
 * Time: 1:59 PM
 * Copied for book Professional javascript for web developers with minor modification
 */
var xmlHandler = (function () {
    function parseXml(xml) {
        var xmldom = null;

        if (typeof DOMParser != "undefined") {
            xmldom = (new DOMParser()).parseFromString(xml, "text/xml");
            var errors = xmldom.getElementsByTagName("parsererror");
            if (errors.length) {
                throw new Error("XML parsing error:" + errors[0].textContent);
            }
        } else if (typeof ActiveXObject != "undefined") {
            xmldom = $createDocument();
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

    function selectSingleNode(context, expression, namespaces) {
        var doc = (context.nodeType != 9 ? context.ownerDocument : context);

        if (typeof doc.evaluate != "undefined") {
            var nsresolver = $createNSResolver(namespaces);
            var result = doc.evaluate(expression, context, nsresolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

            return (result !== null ? result.singleNodeValue : null);
        } else if (typeof context.selectSingleNode != "undefined") {
            $setSelectionNamespaces(doc, namespaces);
            return context.selectSingleNode(expression);
        } else {
            throw new Error("No XPath engine found.");
        }
    }

    function selectNodes(context, expression, namespaces) {
        var doc = (context.nodeType != 9 ? context.ownerDocument : context),
            result;

        if (typeof doc.evaluate != "undefined") {
            var nsresolver = $createNSResolver(namespaces);

            result = doc.evaluate(expression, context, nsresolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            return $pushToNodeArray(result, result.snapshotLength, function(result, index) {
                return result.snapshotItem(index);
            });
        } else if (typeof context.selectNodes != "undefined") {
            $setSelectionNamespaces(doc, namespaces);
            result = context.selectNodes(expression);
            return $pushToNodeArray(result, result.length, function(result, index) {
                return result[index];
            });
        } else {
            throw new Error("No XPath engine found.");
        }
    }


    function $createNSResolver(namespaces) {
        var nsresolver = null;
        if (namespaces instanceof Object) {
            nsresolver = function (prefix) {
                return namespaces[prefix];
            };
        }
        return nsresolver;
    }

    function $setSelectionNamespaces(doc, namespaces) {
        //create namespace string
        if (namespaces instanceof Object) {
            var ns = "";
            for (var prefix in namespaces) {
                if (namespaces.hasOwnProperty(prefix)) {
                    ns += "xmlns:" + prefix + "='" + namespaces[prefix] + "' ";
                }
            }
            doc.setProperty("SelectionNamespaces", ns);
        }
    }

    function $pushToNodeArray(result, len, getItem) {
        var nodes = new Array();

        if (result !== null) {
            for (var i = 0; i < len; i++) {
                nodes.push(getItem(result, i));
            }
        }

        return nodes;
    }

    function $createDocument() {
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

    return {
        parse:parseXml,
        serialize:serializeXml,
        selectSingleNode:selectSingleNode,
        selectNodes:selectNodes
    };

})();
