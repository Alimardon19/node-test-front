import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useForm } from 'react-hook-form';
import axios from "axios";
import {toast} from "react-toastify";

function AddModal({handleModal, toggle, edit, setEdit, GetUser}) {
    const { handleSubmit, register, reset, setValue } = useForm();
    if (edit) {
        setValue('fullName', edit.fullName);
        setValue('email', edit.email);
        setValue('phone', edit.phone);
    }

    const submit = data => {
        if (edit) {
            axios.put(`https://ibs-test-api-v1.herokuapp.com/users/${edit.id}`, data).then(res => {
                toast.success('Success');
                setEdit('')
                reset();
                GetUser();
                toggle()
            }).catch(err => toast.error(err))
        }else {
            axios.post('https://ibs-test-api-v1.herokuapp.com/users', data).then(res => {
                toast.success("Success");
                reset();
                toggle();
                GetUser();
            }).catch(err => {
                toast.error(err)
            })
        }

    }

    return(
        <Modal isOpen={handleModal} toggle={toggle}>
            <ModalHeader>
                Add new user
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(submit)} id={'form'}>
                    <label> FullName </label>
                    <input
                        {...register('fullName', {required: true})}
                        type="text"
                        className={'form-control mb-4'}
                    />
                    <label> Email </label>
                    <input
                        {...register('email', {required: true})}
                        type="text"
                        className={'form-control mb-4'}
                    />
                    <label> Phone number </label>
                    <input
                        {...register('phone', {required: true})}
                        type="text"
                        className={'form-control mb-4'}
                    />
                </form>
            </ModalBody>
            <ModalFooter>
                <button
                    onClick={()=> {
                        setEdit('')
                        reset()
                        toggle()
                    }}
                    className={'btn btn-danger'} >CANCEL</button>
                <button form={'form'} className={'btn btn-primary'}>SUBMIT</button>
            </ModalFooter>
        </Modal>
    )
}

export default AddModal;