
function Option (prop){
    return( <button style={{backgroundColor:prop.color}} onClick ={prop.click} > {prop.value}</button>)
}
export default Option