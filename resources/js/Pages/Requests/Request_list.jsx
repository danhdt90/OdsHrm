import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import { useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import axios from 'axios';
export default function Request_list({ auth ,userRequests,userList,inputDetailRequests}) {
    const [flowApprover, setFlowApprover] = useState([]);
    const [userRequestsData, setUserRequests] = useState(userRequests);
    const [showModalDetailRequest, setShowModalDetailRequest] = useState(false);
    const [requestDetailData, setRequestDetailData] = useState(null);
    const openModal = (request,flow_of_approvers) => {
        setRequestDetailData(request);
        if(typeof(flow_of_approvers)==='string'){
            flow_of_approvers = JSON.parse(flow_of_approvers);
        };
        setFlowApprover(flow_of_approvers);
        setShowModalDetailRequest(true);
    }
    const closeModal = () => {
        setShowModalDetailRequest(false);
    }

    const handleApprover = (id_request) => (event) => {
        const field = 'status';
        const field_value = event.target.value;
        axios.post(route('Update_Request_Field'), { id_request,field, field_value })
            .then(response => {
                // Handle response if needed
                console.log(response.data.status);
            })
            .catch(error => {
                // Handle error if needed
                console.log(error);
            });
    }
    const handleDeleteRequest = (id) => {

        axios.delete(route('Delete_User_Request', { id }))
            .then(response => {
                // Handle response if needed
                if (response.data.status) {
                    // Remove the line below
                    const updatedUserRequests = userRequests.filter(request => request.id !== id);
                    setUserRequests(updatedUserRequests);
                }
            })
            .catch(error => {
                // Handle error if needed
                console.log(error);
            });
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Request List</h2>}
        >
            <Head title="Request List" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2">ID</th>
                                        <th className="px-4 py-2">Tên đề xuất</th>
                                        <th className="px-4 py-2">Người tạo</th>
                                        <th className="px-4 py-2">Trạng thái</th>
                                        <th className="px-4 py-2">Ngày tạo</th>
                                        <th className="px-4 py-2">Chi tiết</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userRequestsData.map((request, index) => (

                                        <tr key={index}>
                                            <td className="border px-4 py-2">{request.id}</td>
                                            <td className="border px-4 py-2"><span className='font-bold'>[{request.template_name}]</span></td>
                                            <td className="border px-4 py-2">{request.user_name}</td>
                                            <td className="border px-4 py-2">
                                                <select value ={request.status} onChange={(event) => handleApprover(request.id, event.target.value)}>
                                                    <option value="0">Chờ duyệt</option>
                                                    <option value="1">Đã duyệt</option>
                                                    <option value="2">Từ chối</option>
                                                </select>
                                            </td>
                                            <td className="border px-4 py-2">{request.created_at}</td>
                                            <td className="border px-4 py-2">
                                                <PrimaryButton onClick={()=>{openModal(request.content_request,request.flow_of_approvers)}} as="button"  className="block mt-4 text-blue-500">Chi tiết</PrimaryButton>
                                                <DangerButton onClick={()=>handleDeleteRequest(request.id)} as="button" className="block mt-4 text-500">Xóa</DangerButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showModalDetailRequest} onClose={closeModal}>

                    {requestDetailData && (() => {
                        const jsonObject = JSON.parse(requestDetailData);
                        return (
                            <div className='p-8'>
                                <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                                    {/* <h4 className="text-xl text-gray-900 font-bold mb-4">Thứ tự duyệt</h4>
                                    <div className="relative px-4">
                                        <div>
                                            <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
                                            <div className="flex items-center w-full my-6 -ml-1.5">
                                                <div className="w-1/12 z-10">
                                                    <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                                                </div>
                                                <div className="w-11/12">
                                                    <p className="text-sm">{userList[jsonObject['follower']]}</p>
                                                    <p className="text-xs text-gray-500">Chưa duyệt</p>
                                                </div>

                                            </div>
                                        </div>
                                        {
                                        flowApprover.map((approver, index) => (
                                            jsonObject['follower'] !== approver.user_id && (
                                                <div key={index}>
                                                    <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
                                                    <div className="flex items-center w-full my-6 -ml-1.5">
                                                        <div className="w-1/12 z-10">
                                                            <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                                                        </div>
                                                        <div className="w-11/12">
                                                            <p className="text-sm">{approver.name}</p>
                                                            <p className="text-xs text-gray-500">{approver.status ? 'Đã duyệt' : 'Chưa duyệt'}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        ))
                                        }
                                    </div> */}


                                </div>
                                <table className='table-auto border-collapse'>
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2">Tên trường</th>
                                            <th className="px-4 py-2">Giá trị</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(jsonObject).map(([key, value]) => (
                                            <tr key={key}>
                                                <td className='font-bold'>
                                                    {
                                                        key=="follower"?
                                                        "Quản lý trực tiếp:":
                                                        key=="id_user"?
                                                        "Người tạo":
                                                        key=="id_template"?
                                                        "Loại đề xuất":
                                                        inputDetailRequests[key]
                                                    }
                                                </td>
                                                <td className='m-3'>
                                                    {
                                                        key=="follower"?
                                                        userList[value]:
                                                        key=="id_user"?
                                                        userList[value]:
                                                        key=="id_template"?
                                                        value:
                                                        typeof value === 'object'?
                                                        <a className='text-green-500' href={value.file_path} download>
                                                            Tải file
                                                        </a>:value
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        );
                    })()}
            </Modal>
        </AuthenticatedLayout>
    );
}
