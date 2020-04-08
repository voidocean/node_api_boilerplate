

exports.passport_jwt_strategy =  (jwt_payload, next) => {

    if(jwt_payload){
        return next(jwt_payload);
    } else {
        return next(false)
    }
}
    

  