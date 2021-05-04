import React, { Component,Fragment } from 'react'
import { DragDropContext,Droppable, Draggable } from "react-beautiful-dnd";
import {static_items} from '../data/index'
import List from '../components/List';

const reorder = (list, startIndex, endIndex) => {
  
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;

  };
export class Home extends Component {
    constructor(props){
        super(props);

        this.state={
            items: static_items
        }

        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
        const sourceIndex = result.source.index;
        const destIndex = result.destination.index;
       if(result.type==='list'){
        const lists = reorder(
            this.state.items,
            sourceIndex,
            destIndex
          );
      
          this.setState({items:lists})
       }else if(result.type === "droppableSubItem"){
        const itemSubItemMap = this.state.items.reduce((acc, item) => {
            acc[item.id] = item.subItems;
            return acc;
          }, {});
    
          const sourceParentId = parseInt(result.source.droppableId);
          const destParentId = parseInt(result.destination.droppableId);
    
          const sourceSubItems = itemSubItemMap[sourceParentId];
          const destSubItems = itemSubItemMap[destParentId];
    
          let newItems = [...this.state.items];
    
          /** subItems are reOrdered inside same Parent */
          if (sourceParentId === destParentId) {
            const reorderedSubItems = reorder(
              sourceSubItems,
              sourceIndex,
              destIndex
            );
            newItems = newItems.map(item => {
              if (item.id === sourceParentId) {
                item.subItems = reorderedSubItems;
              }
              return item;
            });
            this.setState({
              items: newItems
            });
          } else {
            let newSourceSubItems = [...sourceSubItems];
            const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);
    
            let newDestSubItems = [...destSubItems];
            newDestSubItems.splice(destIndex, 0, draggedItem);
            newItems = newItems.map(item => {
              if (item.id === sourceParentId) {
                item.subItems = newSourceSubItems;
              } else if (item.id === destParentId) {
                item.subItems = newDestSubItems;
              }
              return item;
            });
            this.setState({
              items: newItems
            });
          }
        }
       }

       addItemTolist=(id,object)=>{
          let lists=this.state.items;
          lists.map(list=>{
              if(list.id===id){
                 let newListOfItems= list.subItems;
                 newListOfItems.push(object);
                 list.subItems=newListOfItems;
              }
          });
          this.setState({items:lists}); 
       }
       updateList=(list_id,updated_items)=>{
        let lists=this.state.items;
        lists.map(list=>{
            if(list.id===list_id){
               list.subItems=updated_items;
            }
        });
        this.setState({items:lists});      
       }  

    render() {
        
        return (
          <Fragment>

          
            <section className="board-info-bar">
            
                <div className="board-controls">
            
                    <button className="board-title btn">
                        <h2>CoLive Test</h2>
                    </button>
            
                    <button className="star-btn btn" aria-label="Star Board">
                        
                    </button>
            
                    <button className="personal-btn btn">Personal</button>
            
                    <button className="private-btn btn">Private</button>
            
                </div>
            
                <button className="menu-btn btn">Show Menu</button>
            
            </section>
         
                  
            <DragDropContext onDragEnd={this.onDragEnd} onDragUpdate={this.onDragUpdate}>
                    <Droppable droppableId="droppable" type="list">
                    {(provided, snapshot) => (
                    
                      <section className="lists-container" {...provided.droppableProps}
                        ref={provided.innerRef}>   
                        {this.state.items.map((item, index) => (
                            <Draggable key={item.id} draggableId={`list-${item.id}`} index={index} type="list">
                            {(provided, snapshot) => (
                                <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                
                                >
                                <List data={item} lists={item.subItems} appendItem={this.addItemTolist} onUpdate={this.updateList}/>
                                </div>
                            )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        </section>
                    )}
                    </Droppable>
                </DragDropContext>
            
            
            </Fragment>
            
        )
    }
}



export default Home;
