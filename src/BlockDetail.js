import React from 'react';
import {
    useLocation,
} from "react-router-dom";
import intl from 'react-intl-universal';
import { Table,Pagination } from './components';
import { timeformat } from './util';
import services from './services';
import { atto2base } from './util/xfslibutil';
import qs from 'qs';
import { defaultIntNumberFormat, defaultrNumberFormatFF4,defaultrNumberFormatFF6 } from './util/common';
function PaginationWapper(props) {
    let location = useLocation();
    const { total, pageSize, address } = props;
    const { search } = location;
    const sq = qs.parse(search.replace(/^\?/, ''));
    let pageNum = sq['p'];
    if (!pageNum) {
        pageNum = 1;
    }
    return (
        <Pagination current={pageNum}
            firstLableText={intl.get('PAGE_TABLE_PAGINATION_FIRST')}
            pageLableText={intl.get('PAGE_TABLE_PAGINATION_PAGE')}
            lastLableText={intl.get('PAGE_TABLE_PAGINATION_LAST')}
            pathname={`/blocks/${address}`}
            pageSize={pageSize} total={total} />
    );
}
const api = services.api;
class BlockDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            globalTdStyle: {
                fontSize: '1rem',
                paddingTop: '1rem',
                paddingBottom: '1rem'
            },
            page: {
                pageSize: 20,
                total: 0
            },
            blockheader: {
                // id: 0,
                // hash: "0x0000000000000000000000000000000000000000000000000000000000000000",
                // height: 0,
                // version: 0,
                // hashPrevBlock: "0x0000000000000000000000000000000000000000000000000000000000000000",
                // timestamp: 0,
                // coinbase: "000000000000000000000000000000000",
                // stateRoot: "0x0000000000000000000000000000000000000000000000000000000000000000",
                // transactionsRoot: "0x0000000000000000000000000000000000000000000000000000000000000000",
                // receiptsRoot: "0x0000000000000000000000000000000000000000000000000000000000000000",
                // gasLimit: 0,
                // gasUsed: 0,
                // bits: 0,
                // nonce: 0,
                // extraNonce: "0",
                // txCount: 0,
                // rewards: "0"
            },
            transactions: [
            ]
        }
    }
    getBlockDetailTxs = async() => {
        const {location,match } = this.props;
        const { params } = match;
        const { search } = location;
        const sq = qs.parse(search.replace(/^\?/, ''));
        let pageNum = sq['p'];
        pageNum = parseInt(pageNum || 1);
        try {
            let pagedata = await api.getTransactionByBlockHash({
                params: {
                    blockhash:params.hash,
                    page:pageNum,
                }
            });
            if (pagedata.result==null){
                return
            }
            // console.log(JSON.stringify(pagedata.result.data))
            const total = pagedata.result.limits;
            const records = pagedata.result.data;
            let pageSize = this.state.page.pageSize;
            let pn = parseInt(total / pageSize);
            let mod = total % pageSize;
            if (mod > 0) {
                pn += 1;
            }
            if (pageNum > pn) {
                throw new Error('pagenum overflow');
            }
            this.setState({
                page: {
                    total: total,
                    pageSize: pageSize
                },
                transactions:records
            });
        } catch (e) {
            console.log(e);
        }
      
     };
    async componentDidMount() {
        const { history, match } = this.props;
        const { params } = match;
        try {
            const data = await api.getBlockByHash(params.hash);
            this.setState({ blockheader: data.result.data });
        } catch (e) {
            history.replace('/404');
            return;
        }
        this.getBlockDetailTxs()
    }
    render() {
        let time = parseInt(this.state.blockheader.Timestamp);
        const timestr = timeformat(new Date(time * 1000));
        const blockRewards = atto2base(this.state.blockheader.Rewards);
        return (
            <div>
                <h1 className="mb-4">
                    {intl.get('PAGE_TITLE_BLOCK_DETAIL')}&nbsp;#&nbsp;{this.state.blockheader.Height}
                </h1>
                <div className="card mb-4">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item py-3">
                            <div className="row">
                                <div className="col-md-2">
                                    {intl.get('BLOCK_DETAIL_BLOCK_HEIGHT')}:
                                </div>
                                <div className="col-md-10">
                                    <div className="d-flex">
                                        {this.state.blockheader.Height}
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item py-3">
                            <div className="row">
                                <div className="col-md-2">
                                    {intl.get('BLOCK_DETAIL_VERSION')}:
                                </div>
                                <div className="col-md-10">
                                    {this.state.blockheader.Version}
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item py-3">
                            <div className="row">
                                <div className="col-md-2">
                                    {intl.get('BLOCK_DETAIL_PREV_BLOCK_HASH')}:
                                </div>
                                <div className="col-md-10">
                                    <a href={`/blocks/${this.state.blockheader.HashPrevBlock}`}>
                                        {this.state.blockheader.HashPrevBlock}
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item py-3">
                            <div className="row">
                                <div className="col-md-2">
                                    {intl.get('BLOCK_DETAIL_HASH')}:
                                </div>
                                <div className="col-md-10">
                                    {this.state.blockheader.Hash}
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item py-3">
                            <div className="row">
                                <div className="col-md-2">
                                    {intl.get('BLOCK_DETAIL_TIME')}:
                                </div>
                                <div className="col-md-10">
                                    {timestr}
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item py-3">
                            <div className="row">
                                <div className="col-md-2">
                                    {intl.get('BLOCK_DETAIL_COINBASE')}:
                                </div>
                                <div className="col-md-10">
                                    <a href={`/accounts/${this.state.blockheader.Coinbase}`}>
                                        {this.state.blockheader.Coinbase}
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item py-3">
                            <div className="row">
                                <div className="col-md-2">
                                    {intl.get('BLOCK_DETAIL_REWARDS')}:
                                </div>
                                <div className="col-md-10">
                                    {defaultrNumberFormatFF4(blockRewards)}
                                    <span style={{}}> XFSC</span>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item py-3">
                            <div className="row">
                                <div className="col-md-2">
                                    {intl.get('BLOCK_DETAIL_STATE_ROOT_HASH')}:
                                </div>
                                <div className="col-md-10">
                                    {this.state.blockheader.StateRoot}
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item py-3">
                            <div className="row">
                                <div className="col-md-2">
                                    {intl.get('BLOCK_DETAIL_TRANSACTIONS_ROOT_HASH')}:
                                </div>
                                <div className="col-md-10">
                                    {this.state.blockheader.TransactionsRoot}
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item py-3">
                            <div className="row">
                                <div className="col-md-2">
                                    {intl.get('BLOCK_DETAIL_RECEIPTS_ROOT_HASH')}:
                                </div>
                                <div className="col-md-10">
                                    {this.state.blockheader.ReceiptsRoot}
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item py-3">
                            <div className="row">
                                <div className="col-md-2">
                                    {intl.get('BLOCK_DETAIL_GAS_LIMIT')}:
                                </div>
                                <div className="col-md-10">
                                    {defaultIntNumberFormat(this.state.blockheader.GasLimit)}
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item py-3">
                            <div className="row">
                                <div className="col-md-2">
                                    {intl.get('BLOCK_DETAIL_GAS_USED')}:
                                </div>
                                <div className="col-md-10">
                                    {defaultIntNumberFormat(this.state.blockheader.GasUsed)}
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item py-3">
                            <div className="row">
                                <div className="col-md-2">
                                    {intl.get('BLOCK_DETAIL_BITS')}:
                                </div>
                                <div className="col-md-10">
                                    {this.state.blockheader.Bits}
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item py-3">
                            <div className="row">
                                <div className="col-md-2">
                                    {intl.get('BLOCK_DETAIL_NONCE')}:
                                </div>
                                <div className="col-md-10">
                                    {this.state.blockheader.Nonce}
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item py-3">
                            <div className="row">
                                <div className="col-md-2">
                                    {intl.get('BLOCK_DETAIL_EXTRA_NONCE')}:
                                </div>
                                <div className="col-md-10">
                                    {this.state.blockheader.ExtraNonce}
                                </div>
                            </div>
                        </li>
                        
                        <li className="list-group-item py-3">
                            <div className="row">
                                <div className="col-md-2">
                                    {intl.get('BLOCK_DETAIL_TXCOUNT')}:
                                </div>
                                <div className="col-md-10">
                                    {defaultIntNumberFormat(this.state.blockheader.TxCount)}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>


                <div className="card">
                    <div className="card-header">
                        {intl.get('BLOCK_DETAIL_TRANSACTIONS')}
                    </div>
                    <div className="card-table table-responsive">
                        <Table columns={[
                            {
                                field: 'hash', name: intl.get('BLOCK_DETAIL_TRANSACTIONS_HASH'),
                                tdStyle: {maxWidth: '180px' },
                                render: (item) => {
                                    return (
                                        <div className="text-truncate">
                                            <a href={`/txs/${item.Hash}`}>
                                                {item.Hash}
                                            </a>
                                        </div>
                                    );
                                }
                            },
                            {
                                field: 'from', name: intl.get('BLOCK_DETAIL_TRANSACTIONS_FROM'),
                                tdStyle: { maxWidth: '180px' },
                                render: (item) => {
                                    return (
                                        <div className="text-truncate">
                                            <a href={`/accounts/${item.TxFrom}`}>
                                                {item.TxFrom}
                                            </a>
                                        </div>

                                    );
                                }
                            },
                            {
                                field: 'to', name: intl.get('BLOCK_DETAIL_TRANSACTIONS_TO'),
                                tdStyle: { maxWidth: '180px' },
                                render: (item) => {
                                    return (
                                        <div className="text-truncate">
                                            <a href={`/accounts/${item.TxTo}`}>
                                                {item.TxTo}
                                            </a>
                                        </div>
                                    );
                                }
                            },
                            {
                                field: 'value', name: intl.get('BLOCK_DETAIL_TRANSACTIONS_VALUE'),
                                thStyle: { textAlign: 'right' },
                                tdStyle: { textAlign: 'right' },
                                render: (item) => {
                                    let val = atto2base(item.Value);
                                    return (
                                        <span>
                                            {defaultrNumberFormatFF4(val)}
                                            <span style={{
                                                fontSize: '.8rem',
                                            }}> XFSC</span>
                                        </span>
                                    );
                                }
                            },
                            {
                                field: 'gasFee', name: intl.get('BLOCK_DETAIL_TRANSACTIONS_GAS_FEE'),
                                thStyle: { textAlign: 'right' },
                                tdStyle: { textAlign: 'right' },
                                render: (item) => {
                                    let val = atto2base(item.GasFee);
                                    return (
                                        <span>
                                            {defaultrNumberFormatFF6(val)}
                                            <span style={{
                                                fontSize: '.8rem',
                                            }}> XFSC</span>
                                        </span>
                                    );
                                }
                            }, 
                        ]} data={this.state.transactions} click={() => { }} >
                        </Table>
                    </div>
                    <div className="card-footer">
                        <PaginationWapper
                            address={this.state.blockheader.Hash}
                            pageSize={this.state.page.pageSize}
                            total={this.state.page.total} />
                    </div>
                </div>
            </div>
        );
    }
}

export default BlockDetail;