/**
 * Created with IntelliJ IDEA.
 * User: HaoWu
 * Date: 6/11/12
 * Time: 10:02 AM
 */

TestCase('Test boolean type', {
    'test primitive boolean values':function () {
        var T = true,
            F = false;

        assertEquals('boolean', typeof T);
        assertEquals('boolean', typeof F);
    },
    'test Boolean conversion':function () {
        // boolean value conversion happens automatically in flow control statements
        assertFalse(Boolean());
        assertFalse(Boolean(null));
        assertFalse(Boolean(undefined));
        assertFalse(Boolean(false));
        assertFalse(Boolean(""));
        assertFalse(Boolean(0));
        assertFalse(Boolean(-0));

        //all other values are true
        assertTrue(Boolean("0"));
    },
    'test Boolean constructor':function () {
        // do not try to instantiate new Boolean object
        var False = new Boolean(false);

        assertTrue(Boolean(False));
        assertFalse(False.valueOf());

        if(False) {
        } else {
            fail();
        }
    }
});