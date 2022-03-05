import axios from "axios";

const apiCli = axios.create({
    baseURL:process.env.REACT_APP_API_BASE_URL,
    timeout: 1000
});

export function getStatus(options){
    return new Promise((resolve, reject)=>{
        apiCli.request({
            url: '/index/status',
            method: 'GET',
            ...(options||{})
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.message);
        });
    });
}

export function getLatest(options){
    return new Promise((resolve, reject)=>{
        apiCli.request({
            url: '/index/lastest',
            method: 'GET',
            ...(options||{})
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.message);
        });
    });
}
export function getBlocksByPage(options){
    return new Promise((resolve, reject)=>{
        apiCli.request({
            url: '/blocks/getblocks',
            method: 'GET',
            ...(options||{})
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data);
        });
    });
}

export function getTransactionsByPage(options){
    return new Promise((resolve, reject)=>{
        apiCli.request({
            url: 'transfer/gettxs',
            method: 'GET',
            ...(options||{})
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data);
        });
    });
}

export function getBlockByHash(hash,options){
    return new Promise((resolve, reject)=>{
        apiCli.request({
            url: `/blocks/detailed?hash=${hash}`,
            method: 'GET',
            ...(options||{})
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data);
        });
    });
}

export function getTransactionByHash(hash,options){
    return new Promise((resolve, reject)=>{
        apiCli.request({
            url: `transfer/detailed?hash=${hash}`,
            method: 'GET',
            ...(options||{})
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data);
        });
    });
}

export function getTransactionByBlockHash(options){
    return new Promise((resolve, reject)=>{
        apiCli.request({
            url: `/blocks/detailedtx`,
            method: 'GET',
            ...(options||{})
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data);
        });
    });
}

export function getAccountsByPage(options){
    return new Promise((resolve, reject)=>{
        apiCli.request({
            url: '/accounts/getaccounts',
            method: 'GET',
            ...(options||{})
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data);
        });
    });
}

export function getAccountByAddress(address,options){
    return new Promise((resolve, reject)=>{
        apiCli.request({
            url: `/accounts/detailed?addr=${address}`,
            method: 'GET',
            ...(options||{})
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data);
        });
    });
}

export function getTransactionsByAddress(options){
    return new Promise((resolve, reject)=>{
        apiCli.request({
            url: `/accounts/detailedtxs`,
            method: 'GET',
            ...(options||{})
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data);
        });
    });
}

export function requestSearch(options){
    return new Promise((resolve, reject)=>{
        apiCli.request({
            url: `/index/search`,
            method: 'GET',
            ...(options||{})
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data);
        });
    });
}

export function getTxCountByDay(options){
    return new Promise((resolve, reject)=>{
        apiCli.request({
            url: '/index/txcountbyday',
            method: 'GET',
            ...(options||{})
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data);
        });
    });
}