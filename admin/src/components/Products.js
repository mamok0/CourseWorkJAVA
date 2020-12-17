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
      editProductId: "",
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
    this.setState({addImage: e.target.value})
  }

  editTitleChanged = (e) => {
    this.setState({editTitle: e.target.value})
  }

  editDescriptionChanged = (e) => {
    this.setState({editDescription: e.target.value})
  }

  editPriceChanged = (e) => {
    this.setState({editPrice: e.target.value})
  }

  editImageChanged = (e) => {
    this.setState({editImage: e.target.value})
  }

  productAdded(){
    debugger
    axios.post("http://localhost:8080/safes",
    {
      title: this.state.addTitle,
      price: this.state.addPrice,
      description: this.state.addDescription,
      image: this.state.addImage
    }).then((res) => {
      this.loadProducts()
      this.handleAddProduct()
    })
  }

  productDeleted(safeId) {
    debugger
    axios.delete("http://localhost:8080/safes/" + safeId).then((res) => {
      this.loadProducts()
    })
  }

  productEdited(safe) {
    this.setState({
      editTitle: safe.title,
      editDescription: safe.description,
      editPrice: safe.price,
      editImage: safe.image,
      editProductId: safe.id
    })
  }

  cancelEdit(){
    this.setState({
      editTitle: "",
      editDescription: "",
      editPrice: 0,
      editImage: null,
      editProductId: ""
    })
  }

  productEditSubmit(safe){
    const safeId = safe.id
    delete safe.id

    safe.title = this.state.editTitle;
    safe.price = this.state.editPrice;
    safe.description = this.state.editDescription;
    safe.image = this.state.editImage;
    debugger
    axios.put("http://localhost:8080/safes/" + safeId, safe).then((res) => {
      this.loadProducts()
      this.cancelEdit()
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
      return ( this.state.editProductId !== safe.id ? (
        <div>
          <div class="card" style={{width: "15rem", margin: "5px 5px 0 0"}}>
            <img class="card-img-top" src={safe.image} alt={safe.title} />
            <div class="card-body">
              <h5 class="card-title">{safe.title}</h5>
              <p class="card-text">{safe.price} р.</p>
              <div className="text-center">
                <button type="button" onClick={() => this.showFullProductInfo(safe.id)} class="control-btn bg-primary" data-toggle="modal" data-target="#exampleModal">
                  <span class="material-icons">preview</span>
                </button>
                <button class="control-btn bg-success ml-1" onClick={() => this.productEdited(safe)}>
                  <span class="material-icons">create</span>
                </button>
                <button class="control-btn bg-danger ml-1"  onClick={() => this.productDeleted(safe.id)}>
                  <span class="material-icons">delete</span>
                </button>
              </div>
            </div>
          </div>
          <div class="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Редактирование товара</h5>
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
      ) : (
       <div class="edit-form">
            <input type="text" class="form-control" placeholder="Наименование товара" onChange={this.editTitleChanged} defaultValue={safe.title}/>
            <input type="text" class="form-control" placeholder="Цена" onChange={this.editPriceChanged} defaultValue={safe.price}/>
            <textarea onChange={this.editDescriptionChanged} defaultValue={safe.description} rows="6" placeholder="Описание товара"  defaultValue={{margin: "5px 0", width: "18rem"}} class="form-control"></textarea>
            <input type="text" defaultValue={safe.image} onChange={this.editImageChanged} class="form-control" />
            <div className="text-center" style={{margin: "5px 0"}}>
              <button onClick={() => this.productEditSubmit(safe)} className="btn btn-success">Сохранить изменения</button>
              <button style={{marginLeft: "5px"}} onClick={() => this.cancelEdit()} className="btn btn-danger">Отмена</button>
            </div>
        </div>
      )
    )
    })
    return (
      <div className="container mt-2">
        <button style={{display: this.state.addMode ? "none" : "inline-block"}} onClick={() => this.handleAddProduct()} className="btn btn-success">Добавить товар</button>
        {this.state.addMode && (
          <div className="add-form">
            <input type="text" class="form-control" placeholder="Наименование товара" onChange={this.addTitleChanged}/>
            <input type="text" class="form-control" placeholder="Цена" onChange={this.addPriceChanged}/>
            <textarea style={{margin: "5px 0", width: "18rem"}} class="form-control" onChange={this.addDescriptionChanged} rows="3" placeholder="Описание товара"></textarea>
            <input type="text" class="form-control" placeholder="Изображение" onChange={this.addImageChanged}/>
            <div style={{margin: "5px 0"}}>
              <button onClick={() => this.productAdded()} className="btn btn-success">Подтвердить</button>
              <button style={{marginLeft: "5px"}} onClick={() => this.handleAddProduct()} className="btn btn-danger">Отмена</button>
            </div>
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