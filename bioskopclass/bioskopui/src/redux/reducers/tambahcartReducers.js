const INITIAL_STATE = 0 

export default (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case 'TAMBAH_CART':
            return action.payload
        default : 
        return state

    }
}