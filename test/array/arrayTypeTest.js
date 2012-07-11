/**
 * Created with IntelliJ IDEA.
 * User: HaoWu
 * Date: 7/2/12
 * Time: 10:40 AM
 */
TestCase('Test basics of array type', {
    'test array declaration':function () {
        var array = [];
        assertTrue(array instanceof  Array);
        if (typeof Array.isArray === 'function') {
            assertTrue(Array.isArray(array));
        }
        var array2 = new Array();
        assertTrue(array2 instanceof Array);
        assertEquals('[object Array]', Object.prototype.toString.call(array2));
    },
    'test length property':function () {
        var array = [1, 2, 3];

        assertEquals(3, array.length);
    },
    'test get sub array':function () {
        var array = [1, 2, 3];

        var sub = array.slice(1, 3);

        assertEquals(2, sub.length);
        assertEquals([2, 3], sub);

        assertEquals(3, array.length);
    },
    'test remove an element given index':function () {
        var array = [1, 2, 3];

        var removedElement = array.splice(1, 1);

        assertEquals(2, array.length);
        assertEquals(2, removedElement);
    },
    'test replace elements':function () {
        var array = [1, 2, 3];

        var replacedElements = array.splice(1, 2, 4, 5, 6);

        assertEquals(2, replacedElements.length);
        assertEquals([2, 3], replacedElements);
        assertEquals([1, 4, 5, 6], array);
    },
    'test get an element by index':function () {
        var array = [1, 2, 3];

        assertEquals(1, array[0]);
    },
    'test set an element in array':function () {
        var array = [1, 2, 3];
        array[2] = 4;
        array[99] = 100;

        assertEquals(4, array[2]);
        assertEquals(100, array.length);
    },
    'test add an element in the end of array':function () {
        var array = [1, 2, 3];
        array[array.length] = 4;

        assertEquals(4, array[3]);
        assertEquals(4, array.length);
    },
    'test clone an array':function () {
        var array = [1, 2, 3];
        var newArray = array.concat();

        assertEquals(array, newArray);
    },
    'test join arrays':function () {
        var array1 = [1],
            array2 = [2],
            array3 = [3];

        var joinedArray = array1.concat(array2, array3);

        assertEquals([1, 2, 3], joinedArray);
    },
    'test join elements to string': function() {
        var array = [1, 2, 3];
        assertEquals('1,2,3', array.join(','));
        assertEquals('1:2:3', array.join(':'));
    }
});