import axios from "axios";

const apiCli = axios.create({
    baseURL: "http://localhost:8080",
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
            url: `/blocks/${hash}`,
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
            url: `/txs/${hash}`,
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
            url: '/accounts',
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
            url: `/accounts/${address}`,
            method: 'GET',
            ...(options||{})
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data);
        });
    });
}

export function getTransactionsByAddress(address, options){
    return new Promise((resolve, reject)=>{
        apiCli.request({
            url: `/accounts/${address}/txs`,
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
            url: `/search`,
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
            url: '/tx_count_by_day',
            method: 'GET',
            ...(options||{})
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data);
        });
    });
}