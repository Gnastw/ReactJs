class ProductList extends React.Component {

    // retourner le rendu du composant
    // jsx remplacer class par className
 
    constructor(props) {
        super(props);
        this.state = {products: window.dataProducts}
    }
 
    onProductUpVote(productId) {
        const updatedProducts = this.state.products.map(function(product) {
            if(product.id == productId) {
                // https://devdocs.io/javascript/global_objects/object/assign
                return Object.assign({}, product, {votes: product.votes+1});
            }
            else {
                return product;
            }
        });
        this.setState({products: updatedProducts});
    }
 
    render() {
        const products = this.state.products.sort((a, b)=>{
            return a.votes - b.votes;
        });
 
        const productComponents = products.map((product)=> {
            return <Product
                title = {product.title}
                description = {product.description}
                imageUrl = {product.imageUrl}
                url = {product.url}
                votes = {product.votes}
                submitterAvatarUrl = {product.submitterAvatarUrl}
                key = {product.id}
                id = {product.id}
                onProductUpVote = {this.onProductUpVote.bind(this)}
            />
        });
 
        return (<div className="ui items ProductList">
                { productComponents }
                </div>);
    }
 }
 
 class Product extends React.Component {
 
    // retourner le rendu du composant
    // jsx remplacer class par className
 
    onUpVote() {
        //console.log("click ", this.props.id);
        this.props.onProductUpVote(this.props.id);
    }
 
    render() {
        return (<div className="item">
        <div className="image">
          <img src={this.props.imageUrl}/>
        </div>
        <div className="middle aled content">
          <div className="header">
            <a onClick={this.onUpVote.bind(this)}><i className="large caret up icon"></i></a>
            {this.props.votes}
          </div>
          <div className="description">
            <a href={this.props.url} target="_blank">{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className="extra">
           <span>Prososer par : </span>
           <img className="ui avatar image" src={this.props.submitterAvatarUrl}/>
          </div>
        </div>
      </div>);
    }
 }
 
 ReactDOM.render(<ProductList/>, document.querySelector('main'));