import React, {useEffect, useState} from "react";
import axios from "axios";
import AddModal from "./component/addModal";
import CircularIndeterminate from "./component/loading";
import {toast, ToastContainer} from "react-toastify";
import './index.css'

function App() {
    const [user, setUser] = useState([]);
    const [search, setSearch] = useState('');
    const [handleModal, setHandleModal] = useState(false);
    const [edit, setEdit] = useState('');

    useEffect(()=> {
        GetUser();
    }, [])

    const GetUser = () => {
        axios.get("https://ibs-test-api-v1.herokuapp.com/users").then(res => {
            setUser(res.data)
        }).catch(err => alert(err))
    }
    const toggle = () => setHandleModal(prev => !prev);
    const deleteUser = (id) => {
        axios.delete(`https://ibs-test-api-v1.herokuapp.com/users/${id}`).then(res => {
            toast.success('Success');
            GetUser();
        }).catch(err => toast.error(err))
    }
    const startEdit = (data) => {
        setEdit(data);
        toggle();
    }

    return(
        <div className={'container-fluid'}>
           <div className="col-md-10 offset-1">
             <div className="row mt-4">
                 <div className="col-md-3 ">
                     <input type="text" placeholder={"Search"} className={'form-control'} onChange={(e)=> setSearch(e.target.value)}/>
                 </div>
                 <div className="col-md-9">
                     <button onClick={toggle} className={'btn float-end colorBtn text-white '}> + ADD NEW USER </button>
                 </div>
             </div>


               {
                   user.length !== 0 ?
                       <table className={'table table-hover table-striped mt-5'}>
                           <thead className={'table-bg'}>
                           <tr className={'pad'}>
                               <th>№</th>
                               <th> FullName </th>
                               <th> Email </th>
                               <th> Phone </th>
                               <th> Edit / Delete </th>
                           </tr>
                           </thead>
                           <tbody>
                           {
                               user.filter((e) => {
                                   if (e.fullName) {
                                       return e.fullName.toLowerCase().indexOf(search.toLowerCase()) > - 1
                                   }
                                   return ()=> e;
                               }).map((item, index)=> <tr key={index}>
                                   <td> {index + 1} </td>
                                   <td> {item.fullName} </td>
                                   <td> {item.email} </td>
                                   <td> {item.phone} </td>
                                   <td>
                                       <i className="bi bi-pencil-fill text-warning" onClick={()=> startEdit(item)}> </i>
                                       <i className="bi bi-trash-fill text-danger" onClick={()=> deleteUser(item.id)}> </i>
                                   </td>
                               </tr>)
                           }
                           </tbody>
                       </table> : <CircularIndeterminate/>
               }

               <AddModal
                   handleModal={handleModal}
                   toggle={toggle}
                   GetUser={GetUser}
                   edit={edit}
                   setEdit={setEdit}
               />
               <ToastContainer />
           </div>
        </div>
    )

}
export default App;