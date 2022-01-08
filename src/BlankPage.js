import React from 'react';
class BlankPage extends React.Component {
    constructor(props){
        super(props);
        const {location: {state}, history} = props;
        if (state.to){
            history.push(state.to);
        }
    }
    render(){
        return (
            <div>
            </div>
        );
    }
}
export default BlankPage;