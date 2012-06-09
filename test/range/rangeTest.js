/**
 * Created with IntelliJ IDEA.
 * User: HaoWu
 * Date: 6/8/12
 * Time: 10:33 AM
 */

TestCase("RangeTestCase", {

    setUp:function () {
        /*:DOC += <p id="p1"><strong>Hello</strong> world</p> */
        this.p1 = document.getElementById('p1');
    },
    tearDown:function () {
        document.body.removeChild(this.p1);
    },
    "test how to select node":function () {
        var range = document.createRange();
        range.selectNode(this.p1);
        assertEquals(range.startContainer, document.body);
        assertEquals(range.startOffset, 0);
    },
    "test how to select node content":function() {
        var range = document.createRange();
        range.selectNodeContents(this.p1);
        assertEquals(range.startContainer, this.p1);
        assertEquals(range.startOffset, 0);
    }
});