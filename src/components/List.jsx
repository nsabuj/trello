import React, { Fragment,PureComponent } from 'react';
import {Droppable, Draggable } from "react-beautiful-dnd";
import  uuid  from 'uuidv4';
import Modal from 'react-modal';
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

export class List extends PureComponent {

constructor(props){
    super(props);
    this.state={
        isAddingItem: false,
        title:'',
        description:'',
        image_url:'',
        modalIsOpen:false
    }
  
}

showForm=(e)=>{
e.preventDefault();
this.setState({isAddingItem:true});
}

handleSubmit=(e)=>{
    e.preventDefault();
    
    let id=uuid();
   
    this.props.appendItem(this.props.data.id,{id:id,title:this.state.title,description:this.state.description,image:this.state.image_url});
    this.setState({isAddingItem:false,title:'',description:''});
}

handleChange=(e)=>{
    this.setState({
        [e.target.name]: e.target.value
    })
}

onChangeUpload = (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
        return;
    }

    this.setState({
        image_url: URL.createObjectURL(e.target.files[0])
    });
}


 closeModal=()=>{
    this.setState({modalIsOpen:false});
  }

  openModal=(e,id)=>{
   e.preventDefault();
   var item = this.props.lists.find(obj => {
    return obj.id === id
  });
   this.setState({modalIsOpen:true,title:item.title,description:item.description});
  }

  handleUpdate=(e,id)=>{
  e.preventDefault();
  let newItems=this.props.lists;
  newItems.map(item=>{
      if(item.id===id){
          item.title=this.state.title;
          item.description=this.state.description;
      }
  });
  this.props.onUpdate(this.props.data.id,newItems);

  this.setState({
    modalIsOpen:false,title:'',description:''
  })
  }

    render() {
        
        return (
           
       <Fragment>

        <Droppable droppableId={`${this.props.data.id}`}  type={`droppableSubItem`}>
                    {(provided, snapshot) => (
                    
                    <div className="list" {...provided.droppableProps}
                        ref={provided.innerRef}>   
                        <h3 className="list-title">{this.props.data.title}</h3>
                        <ul className="list-items">
                        { 
                        this.props.lists.map((item, index) => (
                            <Draggable key={item.id} draggableId={`item-${item.id}`} index={index} type="list">
                            {(provided, snapshot) => (
                              
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                
                                >
                                
                                
                                    <li onClick={(e)=>this.openModal(e,item.id)}>{item.title}</li>
                                    {/* Modal starts */}
                                    <Modal isOpen={this.state.modalIsOpen}         
                                            
                                            onRequestClose={this.closeModal}
                                            style={customStyles}
                                            contentLabel="Modal"
                                            ariaHideApp={false}
                                            >

                                            
                                            <button className="btn close-modal" onClick={this.closeModal}>close</button>
                                        <img src={item.image} className="image-midi"/>    
                                        <form onSubmit={(e)=>this.handleUpdate(e,item.id)} id="update-form">
                                            <input type="text" name="title" onChange={this.handleChange} value={this.state.title}/>
                                            <textarea name="description" placeholder="Write description" onChange={this.handleChange} cols="30" rows="5" required value={this.state.description}></textarea>
                                            <button type="submit">Update</button>
                                        </form>   
                                    </Modal>                                   { /* Modal ends */ }
                               
                                </div>
                                
                            )}
                            </Draggable>
                            
                        ))
                 
                    
                    }
                         </ul>
                        {provided.placeholder}
                        {this.state.isAddingItem?
                        <form onSubmit={this.handleSubmit} id="add-form">  {/* Form to add item to list starts */}
                        <input type="text" placeholder="Place title" name="title" onChange={this.handleChange} required/>
                        <textarea name="description" placeholder="Write description" onChange={this.handleChange} cols="30" rows="5" required></textarea>
                        <input type="file" name="image" onChange={this.onChangeUpload}/>
                        <button type="submit">Save</button>
                        </form>                                            
                        :
                        <button className="add-card-btn btn" onClick={this.showForm}>Add a card</button> 
                        }
                        {/* Form to add item to list ends */}
                        </div>
                    )}
                    </Droppable>
    
         
        </Fragment>
        

         )}       
          
        
    
}

export default List;
