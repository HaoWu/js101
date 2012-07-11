/**
 * Created with IntelliJ IDEA.
 * User: HaoWu
 * Date: 7/2/12
 * Time: 11:14 AM
 */
function Stack() {
    var array = new Array();
    this.push = function (element) {
        array.push(element);
    };

    this.pop = function () {
        return array.pop();
    };

    this.top = function () {
        return array[array.length - 1];
    };

    this.isEmpty = function () {
        return array.length === 0;
    };
}
