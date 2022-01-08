import qs from 'qs';
import React from 'react';
import {
    useLocation,
    useHistory
  } from "react-router-dom";
import { Table,Pagination } from './components';
import { timeformat } from './util';
import intl from 'react-intl-universal';
import services from './services';
import page_placeholder from "./images/page_placeholder.svg";
const api = services.api;
function PaginationWapper(props) {
    let location = useLocation();
    const {total, pageSize} = props;
    const {search} = location;
    const sq = qs.parse(search.replace(/^\?/,''));
    let pageNum = sq['p'];
    if (!pageNum) {
        pageNum = 1;
    }
    return (
        <Pagination current={pageNum}
        pathname='/blocks'
        pageSize={pageSize} total={total}/>
    );
  }
  
class NFTsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageDisabled: true,
            globalTdStyle: {
                fontSize:'1rem', 
                paddingTop: '1rem',
                paddingBottom: '1rem'  
            },
            page: {
                pageSize: 20,
                total: 0
            },
            data: [
                {
                    name: "NersCoin",
                    symbol: 'NER',
                    decimals: 18,
                    totalSupply: 9908,
                    address: 413,
                    txs: 64
                },
                {
                    name: "AcertToken",
                    symbol: 'ACER',
                    decimals: 10,
                    totalSupply: 4551,
                    address: 9999,
                    txs: 55
                },
                {
                    name: "FIXCoin",
                    symbol: 'FIX',
                    decimals: 18,
                    totalSupply: 3000000000,
                    address: 46513,
                    txs: 906147
                },
            ],
        }
    }
    async componentDidMount(){
        const { history, location } = this.props;
        const {search} = location;
        if (this.state.pageDisabled){
            
            return;
        }
        const sq = qs.parse(search.replace(/^\?/,''));
        let pageNum = sq['p'];
        if (!pageNum) {
            pageNum = 1;
        }
        pageNum = parseInt(pageNum);
        let pagedata = await api.getBlocksByPage({params: {
            p: pageNum,
        }});
        const {total,records} = pagedata;
        let pageSize = this.state.page.pageSize;
        let pn = parseInt(total / pageSize);
        let mod = total % pageSize;
        if (mod > 0) {
            pn += 1;
        }
        if (pageNum > pn){
            // history.replace('/404');
            return;
        }
        this.setState({page: {total: total, 
            pageSize: pageSize}, 
            data: records});
    }
    render() {
        if(this.state.pageDisabled){
            return (
                <div className="page page-center" style={{
                    minHeight: '0'
                }}>
                    <div className="container-tight py-4">
                    <div className="empty">
                        <div className="empty-img"><img src={page_placeholder} height={128} alt="" />
                        </div>
                        <p className="empty-title">
                            {intl.get('PAGE_DISABLED_TITLE')}
                        </p>
                        <p className="empty-subtitle text-muted">
                            {intl.get('PAGE_DISABLED_TEXT')}
                        </p>
                        <div className="empty-action">
                        <a href="/" className="btn btn-primary">
                            {/* Download SVG icon from http://tabler-icons.io/i/arrow-left */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><line x1={5} y1={12} x2={19} y2={12} /><line x1={5} y1={12} x2={11} y2={18} /><line x1={5} y1={12} x2={11} y2={6} /></svg>
                            {intl.get('PAGE_DISABLED_BUTTON')}
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <h1 className="mb-4">
                    {intl.get('PAGE_TITLE_TOKENS')}
                </h1>
                <div className="card">
                    <div className="table-responsive">
                        <Table columns={[
                            {
                                 name: intl.get('TOKENS_NAME'), 
                                tdStyle:{...this.state.globalTdStyle },
                                render: (item) => {
                                    return (
                                        <a href={`/contract/${item.name}`}>
                                            {item.name}
                                        </a>
                                    );
                                }
                            },
                            {
                                 name: intl.get('TOKENS_SYMBOL'), 
                                tdStyle:{...this.state.globalTdStyle, width: '120px' },
                                render: (item) => {
                                    return (
                                        <span>
                                            {item.symbol}
                                        </span>
                                    );
                                }
                            },
                            {
                                name: intl.get('TOKENS_DECIMALS'), 
                               tdStyle:{...this.state.globalTdStyle, width: '120px' },
                               render: (item) => {
                                   return (
                                       <span>
                                           {item.decimals}
                                       </span>
                                   );
                               }
                           },
                            {
                                 name: intl.get('TOKENS_TOTAL_SUPPLY'), 
                                thStyle: {textAlign:'right'},
                                tdStyle:{...this.state.globalTdStyle,textAlign:'right', width: '120px' },
                                render: (item) => {
                                    return (
                                        <span>
                                            {item.totalSupply}
                                        </span>
                                    );
                                }
                            },
                            {
                                 name: intl.get('TOKENS_ADDRESS'), 
                                 thStyle: {textAlign:'right'},
                                tdStyle:{...this.state.globalTdStyle, width: '210px',textAlign:'right'},
                                render: (item) => {
                                    return (
                                        <span>
                                            {item.address}
                                        </span>
                                    );
                                }
                            },
                            {
                                name: intl.get('TOKENS_TXS'), 
                                thStyle: {textAlign:'right'},
                               tdStyle:{...this.state.globalTdStyle, width: '210px',textAlign:'right'},
                               render: (item) => {
                                   return (
                                       <span>
                                           {item.txs}
                                       </span>
                                   );
                               }
                           },
                        ]} data={this.state.data} click={() => { }} >
                        </Table>
                    </div>
                    <div className="card-footer">
                        <PaginationWapper
                         pageSize={this.state.page.pageSize}
                         total={this.state.page.total}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default NFTsPage;