import '../App.css';
import React from 'react'
import axios from "axios";

class Products extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      data: [],
      addMode: false,
      addTitle: "",
      addDescription: "",
      addPrice: 0,
      addImage: null,
      editTitle: "",
      editDescription: "",
      editPrice: 0,
      editImage: null,
    }
  }

  componentDidMount(){
    axios.get("http://localhost:8080/safes").then((res) => {
      this.setState({data: res.data})
      debugger
    })
  }

  handleAddProduct(){
    this.setState({addMode: !this.state.addMode})
  }

  addTitleChanged = (e) => {
    this.setState({addTitle: e.target.value})
  }

  addDescriptionChanged = (e) => {
    this.setState({addDescription: e.target.value})
  }

  addPriceChanged = (e) => {
    this.setState({addPrice: e.target.value})
  }

  addImageChanged = (e) => {
    this.setState({addImage: e.target.files[0]})
  }

  productAdded(){
    debugger
    axios.post("http://localhost:8080/safes",
    {
      title: this.state.addTitle,
      price: this.state.addPrice,
      description: this.state.addDescription,
      image: JSON.stringify(this.state.addImage)
    }).then((res) => {
      debugger
    })
  }
  
  render(){
    const safeCards = this.state.data.map((safe) => {
      if(!safe){
        return ""
      }
      return (
      <div class="card" style={{width: "18rem", margin: "5px 5px 0 0"}}>
        <img class="card-img-top" src={safe.image} alt={safe.title} />
        <div class="card-body">
          <h5 class="card-title">{safe.title}</h5>
          <p class="card-text">{safe.price} р.</p>
          <div className="text-center">
          <button class="control-btn bg-primary">
            <span class="material-icons">preview</span>
          </button>
          <button class="control-btn bg-success ml-1">
            <span class="material-icons">create</span>
          </button>
          <button class="control-btn bg-danger ml-1">
            <span class="material-icons">delete</span>
          </button>
          </div>
        </div>
      </div>
    )
    })
    return (
      <div className="container mt-2">
        <button style={{display: this.state.addMode ? "none" : "inline-block"}} onClick={() => this.handleAddProduct()} className="btn btn-success">Добавить товар</button>
        {this.state.addMode && (
          <div className="add-form">
            <input type="text" class="form-control" placeholder="Наименование товара" onChange={this.addTitleChanged}/>
            <input type="text" class="form-control" placeholder="Цена" onChange={this.addPriceChanged}/>
            <textarea style={{margin: "5px 0"}} class="form-control" onChange={this.addDescriptionChanged} rows="3" placeholder="Описание товара"></textarea>
            <input type="file" class="form-control-file" id="validatedCustomFile" onChange={this.addImageChanged}/>
            <button onClick={() => this.productAdded()} className="btn btn-success">Добавить товар</button>
            <button onClick={() => this.handleAddProduct()} className="btn btn-danger">Отмена</button>
          </div>
        )}
        <div className="cards-list">
          {safeCards}
        </div>
      </div>
    );
  }
 
}

export default Products;