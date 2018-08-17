const oa = require('../index.js')

// const _in = [{a:1,f:{a1:110,b1:220}},{a:1,f:{a1:110,b1:220},cc:10},{a:{a:1},b:2,f:100}]



console.log(oa([{a:1,b:'bbb'},{a:'aaa',b:2,c:'ccc'}]))


// oa([{a:1,b:2,c:3},{a:4,b:5,d:6}])//{a:5,b:7,c:3,d:6}
// oa([{a:{a1:1,b1:2},b:2},{a:{a1:3,a2:4,a3:5}},c:{c:10}}])//{ a: { a1: 4, b1: 2, a2: 4, a3: 5 }, b: 2, c: { c: 10 } }



// oa(1)//1
// oa({a:1})//{a:1}
