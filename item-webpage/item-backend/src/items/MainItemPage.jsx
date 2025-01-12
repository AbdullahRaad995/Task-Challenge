import { Button, Col, Input, Modal, Row, Select, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;

export default function MainItemPage() {

    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [newItem, setNewItem] = useState(null);
    const [errorText, setErrorText] = useState(null);
    const [categories, setCategories] = useState([]);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Discription',
            dataIndex: 'discription',
            key: 'discription',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title : 'Actions',
            key : 'actions',
            render : (_,record) => <Space><Button type='primary' onClick={()=>requestItem(record._id)}>View</Button><Button type='text' danger onClick={()=>deleteItem(record._id)}>Delete</Button></Space>
        }
    ];

    const requestItems = () => {
        fetch(`${apiUrl}/items`) // Proxy will forward this to your backend server
            .then((response) => response.json())
            .then((data) => {
                let adjustData = data.map(e=>{
                    e.key = e._id
                    return e
                })
                setItems(adjustData)
            })
            .catch((error) => console.error('Error fetching items:', error));
    }

    const requestItem = (id) => {
        fetch(`${apiUrl}/item/${id}`) // Proxy will forward this to your backend server
            .then((response) => response.json())
            .then((data) => setSelectedItem(data))
            .catch((error) => console.error('Error fetching item:', error));
    }

    const addItem = (item) => {
        fetch(`${apiUrl}/item`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(item),
        })
            .then((response) => response.status === 200 ? response.json() : response.text().then(err => {throw new Error(err)}))
            .then((data) =>{
                data.key = data._id
                let itemss = [...items]
                itemss.push(data)
                setItems(itemss)
                setNewItem({})
                setErrorText(null)
            })
            .catch((error) => {
                setErrorText(error.message)
                console.error('Error add item:', error)
            });
    }

    const updateItem = (item) => {
        fetch(`${apiUrl}/item/${item._id}`,{
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                name : item.name,
                discription : item.discription
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                let itemss = [...items]
                let itemToUpdate = itemss.find(e=>e._id === data._id)
                if(itemToUpdate) Object.assign(itemToUpdate, data);
                setItems(itemss)
                setSelectedItem(data)
            })
            .catch((error) => console.error('Error update item:', error));
    }

    const deleteItem = (id) => {
        fetch(`${apiUrl}/item/${id}`, { method: 'delete'})
            .then((response) => response.json())
            .then((data) => {
                let itemss = [...items].filter(e=>e._id !== id)
                setItems(itemss)
                setSelectedItem(null)
            })
            .catch((error) => console.error('Error delete item:', error));
    }

    const requestCategories = () => {
        fetch(`${apiUrl}/categories`) // Proxy will forward this to your backend server
            .then((response) => response.json())
            .then((data) => {
                let adjustCategories = data.map(e => ({
                    value : e._id,
                    label : e.name
                }))
                setCategories(adjustCategories)
            })
            .catch((error) => console.error('Error fetching categories:', error));
    }

    const changeNewItem = (key,value) => {
        let newItemm = {...newItem}
        newItemm[key] = value
        setNewItem(newItemm)
    }

    const changeSelectedItem = (key,value) => {
        let newItemm = {...selectedItem}
        newItemm[key] = value
        setSelectedItem(newItemm)
    }

    useEffect(() => {
        requestItems()
    }, []);

    const AddItemModal = () => {
        return (
            <Modal centered title="Adding Item" open={newItem ? true : false} onOk={()=>addItem(newItem)} onCancel={()=>setNewItem(null)} okText='Add Item'>
                <Space direction='vertical' style={{width:'100%'}}>
                    <Input placeholder='Name' required value={newItem?.name} onChange={(event) => changeNewItem('name',event.target.value)}/>
                    <Input placeholder='Discription' required value={newItem?.discription} onChange={(event) => changeNewItem('discription',event.target.value)}/>
                    <Input placeholder='Phone Number' required value={newItem?.phone_number} onChange={(event) => changeNewItem('phone_number',event.target.value)}/>
                    <Select
                        style={{ width: '100%' }}
                        allowClear
                        options={categories}
                        placeholder="Selecet Category"
                        onChange={(e)=>changeNewItem('category',e)}
                        onFocus={()=>requestCategories()}
                        value={newItem?.category}
                    />
                    {errorText && <p style={{color:'red',marginTop:10}}>{errorText}</p>}
                </Space>
            </Modal>
        )
    }

    const ViewItemModal = () => {
        return (
            <Modal centered title={'Item Details'} onCancel={()=>setSelectedItem(null)} open={selectedItem ? true : false} okText={'Update Item'} onOk={()=>updateItem(selectedItem)}>
                <Row gutter={[5,5]}>
                    <Col span={12}>
                        <Space direction='vertical' style={{width:'100%'}}>
                            <span>Item Name</span>
                            <Input required value={selectedItem?.name} onChange={(event) => changeSelectedItem('name',event.target.value)}/>
                            <span>Discription</span>
                            <Input required value={selectedItem?.discription} onChange={(event) => changeSelectedItem('discription',event.target.value)}/>
                            <span>Phone Number</span>    
                            <Input disabled required value={selectedItem?.phone_number}/>
                            <span>Category</span>  
                            <Input disabled required value={selectedItem?.category?.name}/>
                        </Space>
                    </Col>
                    <Col span={12}>
                        <Space direction='vertical' style={{width:'100%'}}>
                            <span>Country Code</span>
                            <Input disabled value={selectedItem?.phone_info.country_code}/>
                            <span>Country Name</span>
                            <Input disabled value={selectedItem?.phone_info.country_name} />
                            <span>Operator Name</span>
                            <Input disabled value={selectedItem?.phone_info.operator_name}/>
                        </Space>
                    </Col>
                </Row>
            </Modal>
        )
    }

    return (
        <div>
            <Row align={'middle'} style={{ height: 50 }}>
                <Col span={12} ><h2>Task Challenge</h2></Col>
                <Col style={{ display: 'flex', justifyContent: 'end' }} span={12}>
                    <Button type='primary' onClick={()=>setNewItem({})}>Add Item</Button>
                </Col>
            </Row>
            <Table dataSource={items} columns={columns} pagination={false}/>;
            {AddItemModal()}
            {ViewItemModal()}
        </div>
    )
}