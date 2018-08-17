const re = {}
function run (key,_in){
    if(_in.length<=1){
        return _in
    }
    return key.map(itm=>{
    	const e = _in.reduce((l='', r, index)=>{
            if(typeof l[itm] === 'object'||typeof r[itm] === 'object'){
                if(index!==1&&typeof l !== typeof r[itm]){
                    return l
                }

                if(index === 1 && typeof l[itm] !== typeof r[itm]){
                    return l[itm]
                }

                if(index === 1){
                    var re = run(Object.keys(Object.assign({},l[itm],r[itm])),[l[itm]||{},r[itm]||{}])
                }else{
                    var re = run(Object.keys(Object.assign({},l,r[itm])),[l||{},r[itm]||{}])
                }
                return Object.assign(...re)
            }
      		if(index===1){
                const le = Number.isNaN(+l[itm])?0:+l[itm]
                const ri = Number.isNaN(+r[itm])?0:+r[itm]
    			return le+ri
    		}else{
                if(typeof l !== typeof r[itm]){
                    return l
                }

                const result = l + +(r[itm]||'')

                if(Number.isNaN(result)){
                    return l
                }

    			return result
    		}
    	});
        return {
            [itm]:e
        }
    })
}

const object_array = (_in)=>{
    if(!Array.isArray(_in)){
        return _in
    }
    const key = Object.keys(Object.assign({},..._in))
    return Object.assign(...run(key,_in))
}

module.exports = object_array
