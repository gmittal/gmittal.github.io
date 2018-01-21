---START_METADATA---
{
  "title": "Portfolio",
  "author": "Gautam Mittal",
  "summary": "A portfolio of some projects that I sent to colleges.",
  "tags":[
    "me"
  ]
}
---END_METADATA---

```javascript
/*
 * http://paleyontology.com/AP_CS/rainfall.html
*/

let lyst = [-76, 0, -1, 1, 2, -999];

function rainfall(nums) {
    nums = nums.splice(0, nums.indexOf(-999));
    const positive = nums.filter(n => n >= 0);
    return positive.reduce((total, n) => {
	total += n;
	return total
    })/positive.length;
}

console.log(rainfall(lyst)); // returns 1
```
