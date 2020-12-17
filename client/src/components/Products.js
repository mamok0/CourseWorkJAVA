import '../App.css';
import React from 'react'
import axios from "axios";

class Products extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      data: [],
      showProduct: {
        title: "",
        description: "",
        price: "",
        image: "",
      }
    }
  }

  componentDidMount(){
    this.loadProducts()
  }

  loadProducts(){
    axios.get("http://localhost:8080/safes").then((res) => {
      this.setState({data: res.data})
      debugger
    })
  }

  showFullProductInfo(safeId){
    axios.get("http://localhost:8080/safes/" + safeId).then(res => {
      this.setState({showProduct: res.data})
      debugger
    })
  }

  hideFullProduct(){
    this.setState({
      showProduct: {
        title: "",
        description: "",
        price: "",
        image: "",
      }
    })
  }

  render(){
    const safeCards = this.state.data.map((safe) => {
      if(!safe){
        return ""
      }
      return (
        <div>
          <div class="card" style={{width: "15rem", margin: "5px 5px 0 0"}}>
              <img class="card-img-top product-img" src={safe.image} alt={safe.title} />
              <div class="card-body">
                <h5 class="card-title">{safe.title}</h5>
                <p class="card-text">{safe.price} р.</p>
                <div className="text-center">
                  <button type="button" onClick={() => this.showFullProductInfo(safe.id)} class="control-btn bg-primary" data-toggle="modal" data-target="#exampleModal">
                    Подробнее
                  </button>
                </div>
              </div>
          </div>
          <div class="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Описание</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <img class="card-img-top" src={this.state.showProduct.image} alt={this.state.showProduct.title} />
                <h5 class="card-title">{this.state.showProduct.title}</h5>
                <h3>{this.state.showProduct.price} р.</h3>
                <p class="cart-text">{this.state.showProduct.description}</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      )
    });
    return (
        <div className="cards-list">
          {safeCards}
        </div>
    );
  }
 
}

export default Products;