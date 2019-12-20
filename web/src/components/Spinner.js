import React from 'react'
import './Spinner.css'
import { Link } from '@reach/router'
import PropTypes from 'prop-types';


class Spinner extends React.Component {
  
    constructor(props) {
        super(props);
        console.log(this.props.items.length)
        this.state = {
          selectedItem: null,
          wheelRefs: []
        };
        this.selectItem = this.selectItem.bind(this);
      }
      
      UNSAFE_componentWillReceiveProps(props) {
        this.setState(state => ({...state, wheelRefs: props.items.map((item) => React.createRef())}))
      }

       selectItem() {
        if (this.state.selectedItem === null) {
          const selectedItem = Math.floor(Math.random() * this.props.items.length);
          if (this.props.onSelectItem) {
            this.props.onSelectItem(selectedItem);
          }
          this.setState({ selectedItem });
        } else {
          this.setState({ selectedItem: null });
          setTimeout(this.selectItem, 500);
        }
      }
    
      render() {
        console.log('render: ' + this.props.items.length);
        const { selectedItem } = this.state;
        const { items } = this.props;
    
        const wheelVars = {
          '--nb-item': items.length,
          '--selected-item': selectedItem,
        };
        const spinning = selectedItem !== null ? 'spinning' : '';
        return (
        <React.Fragment>
          <div className="wheel-container">
            <div className={`wheel ${spinning}`} ref={this.wheelRef} style={wheelVars} onClick={() => { this.selectItem(); }}>
              {items.map((item, index) => (
                <div className="wheel-item" key={item.id} style={{ '--item-nb': index }}>
                  {item.name}
                </div>
              ))}
            </div>
          </div>
          <h2>Let's eat <Link to={`/cuisine/${this.state.selectedItem ? items[this.state.selectedItem].id : null}`}> {this.state.selectedItem && items[this.state.selectedItem].name}</Link></h2>
          </React.Fragment>
        );
      }
};

Spinner.propTypes = {
  items: PropTypes.array
}

Spinner.defaultProps = {
  items: [{
    '0': {
      name: '',
      id: null
    }
  }]

}


export default Spinner;