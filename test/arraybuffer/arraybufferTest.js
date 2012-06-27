/**
 * Created with IntelliJ IDEA.
 * User: HaoWu
 * Date: 6/25/12
 * Time: 9:44 PM
 * To change this template use File | Settings | File Templates.
 */

TestCase('ArrayBuffer test', {
    'test arraybuffer to utf16 string':function () {
        if(typeof ArrayBuffer === 'undefined')
            return;
        var buffer = new ArrayBuffer(4),
            view = new Uint16Array(buffer),
            value;
        view[0] = 'a'.charCodeAt(0);
        view[1] = 'b'.charCodeAt(0);
        var result = String.fromCharCode.apply(null, view);
        assertEquals('ab', result);
    },

    'test arraybuffer to utf8 string':function () {
        if(typeof ArrayBuffer === 'undefined')
            return;

        var buffer = new ArrayBuffer(4),
            view = new Uint8Array(buffer),
            value;
        view[0] = 'a'.charCodeAt(0);
        view[1] = 'b'.charCodeAt(0);
        view[2] = 'c'.charCodeAt(0);
        view[3] = 'd'.charCodeAt(0);
        var result = String.fromCharCode.apply(null, view);
        assertEquals('abcd', result);
    }
});