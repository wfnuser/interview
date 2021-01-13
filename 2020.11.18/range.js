// Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range
// includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100,
// 201)
/**
 *
 * NOTE: Feel free to add any extra member variables/functions you like.
 */
class RangeList {
   // array for range
    _rangeList = []

    /**
    * Adds a range to the list
    * @param {Array<number>} range - Array of two integers that specify
    * beginning and end of range.
    */
   add(range) {
        // params check
        if (range.length != 2) {
            return;
        }

        let left = range[0]
        let right = range[1]

        // if rangeList is empty
        if (this._rangeList.length == 0) {
            this._rangeList.push(range);
            return;
        }

        let tmpList = []
        let pushed = false;
        this._rangeList.forEach(range => {
            if (range[1] < left) {
                // no intersection
                tmpList.push([range[0],range[1]])
                return
            }
            if (range[0] > right) {
                // no intersection; but the range to be added has been passed
                pushed = true;
                tmpList.push([left, right], range)
                return
            }
            // range has intersection
            // we update the range to be added
            left = left < range[0] ? left : range[0];
            right = right > range[1] ? right : range[1];
        });
        if (!pushed) tmpList.push([left, right])

        this._rangeList = tmpList;
    }

    /**
    * Removes a range from the list
    * @param {Array<number>} range - Array of two integers that specify
    * beginning and end of range.
    */
    remove(range) {
        // params check
        if (range.length != 2) {
            return;
        }

        let left = range[0]
        let right = range[1]

        let tmpList = []
        let pushed = false;
        this._rangeList.forEach(range => {
            if (range[1] < left || range[0] > right) {
                // no intersection
                tmpList.push([range[0],range[1]])
                return
            }
            
            if (range[0] >= left && range[1] <= right) {
                return
            }

            if (left > range[0]) {
                tmpList.push([range[0], left])
            }
            if (right < range[1]) {
                tmpList.push([right, range[1]])
            }
            
        });

        this._rangeList = tmpList;
    }
    /**
    * Prints out the list of ranges in the range list
    */
    print() {
        var output = ""
        this._rangeList.forEach(range => {
            output += '[' + range[0] + ', ' + range[1] + ') '
        });
        console.log(output)
    }
}


// Example run
const rl = new RangeList();

rl.add([1, 5]);
rl.print();
// Should display: [1, 5)
rl.remove([1,4])
rl.print()
rl.add([1,4])
rl.print()
rl.add([10, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 21]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([3, 8]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 10]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 11]);
rl.print();
// Should display: [1, 8) [11, 21)
rl.remove([15, 17]);
rl.print();
// Should display: [1, 8) [11, 15) [17, 21)
rl.remove([3, 19]);
rl.print();
// Should display: [1, 3) [19, 21)
rl.remove([19,20])
rl.print();
// Should display: [1, 3) [20, 21)
rl.remove([-1,20])
rl.print();
// Should display: [1, 3) [20, 21)
