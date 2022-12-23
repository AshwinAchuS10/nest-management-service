import logger from "./logger";

export default function callLogsSample(type: any, user?: any, req?: any, res?: any, trace?: any, msg?:any) {
    // rest of your code 
    let data: any = {
        user: user?user:null,
        createdDate: new Date(),
        req: req?req:null,
        res: res?res:null,
        trace: trace?trace:null,
        msg: msg?msg:null
    };
    if(type == "error"){
        logger.error(JSON.stringify(data));
    }
    if(type == "info"){
        logger.info(JSON.stringify(data));
    }
    if(type == "emerg"){
        logger.emerg(JSON.stringify(data));
    }
    if(type == "alert"){
        logger.alert(JSON.stringify(data));
    }
    if(type == "crit"){
        logger.crit(JSON.stringify(data));
    }
    if(type == "warning"){
        logger.warning(JSON.stringify(data));
    }
    if(type == "notice"){
        logger.notice(JSON.stringify(data));
    }
    if(type == "debug"){
        logger.debug(JSON.stringify(data));
    }

}