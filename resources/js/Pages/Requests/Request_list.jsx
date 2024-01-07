import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import { useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import axios from 'axios';
export default function Request_list({ auth ,userRequests,userList,inputDetailRequests}) {
    const [flowApprover,setFlowApprover] = useState([]);
    const [statusApprover,setStatusApprover] = useState({
        status:0,
        fully_accept:0,
        hr_status:0
    });
    const [userRequestsData, setUserRequests] = useState(userRequests);
    const [showModalDetailRequest, setShowModalDetailRequest] = useState(false);
    const [requestDetailData, setRequestDetailData] = useState(null);
    const openModal = (request,flow_of_approvers,status,fully_accept,hr_status) => {
        setRequestDetailData(request);
        setStatusApprover({
            status:status,
            fully_accept:fully_accept,
            hr_status:hr_status
        });
        if(typeof(flow_of_approvers)==='string'){
            flow_of_approvers = JSON.parse(flow_of_approvers);
            setFlowApprover(flow_of_approvers);
        };
        setShowModalDetailRequest(true);
    }
    const closeModal = () => {
        setShowModalDetailRequest(false);
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
                            <table className='w-full  border'>
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2">ID</th>
                                        <th className="px-4 py-2">Loại đề xuất</th>
                                        <th className="px-4 py-2">Tiêu đề</th>
                                        <th className="px-4 py-2">Người tạo</th>
                                        <th className="px-4 py-2">QLTT Duyệt</th>
                                        <th className="px-4 py-2">CEO Duyệt</th>
                                        <th className="px-4 py-2">Ngày tạo</th>
                                        <th className="px-4 py-2">Chi tiết</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userRequestsData.map((request, index) => (
                                        <tr key={index}>
                                            <td className="border px-4 py-2">{request.id}</td>
                                            <td className="border px-4 py-2"><span className='font-bold'>{request.template_name}</span></td>
                                            <td className="border px-4 py-2"><span>{request.request_name}</span></td>
                                            <td className="border px-4 py-2">{request.user_name}</td>
                                            <td className="border px-4 py-2">
                                                {request.status === 0 && <span className='text-yellow-500 '>Chờ duyệt</span>}
                                                {request.status === 1 && <span className='text-green-500 '>Đã duyệt</span>}
                                                {request.status === 2 && <span className='text-red-500 '>Từ chối</span>}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {request.fully_accept === 0 && <span className='text-yellow-500 font-bold'>Chờ duyệt</span>}
                                                    {request.fully_accept === 1 && <span className='text-green-500 font-bold'>Đã duyệt</span>}
                                                    {request.fully_accept === 2 && <span className='text-red-500 font-bold'>Từ chối</span>}
                                            </td>
                                            <td className="border px-4 py-2">{request.created_at}</td>
                                            <td className="border px-4 py-2">
                                                <PrimaryButton onClick={()=>{openModal(request.content_request,request.flow_of_approvers,request.status,request.fully_accept,request.hr_status)}} as="button"  className="block mt-4 text-blue-500">Chi tiết</PrimaryButton>
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
                                <div className="flex-1 bg-white rounded-lg mt-4">
                                    <h4 className="text-xl text-gray-900 font-bold mb-4">Thứ tự duyệt</h4>
                                    <div className="relative px-4">
                                        <div>
                                            <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
                                            {flowApprover.map((approver, index) => (
                                                <div key={index}>
                                                    <div className="flex items-center w-full my-6 -ml-1.5">
                                                        <div className="w-1/12 z-10">
                                                            <div className="w-3.5 h-3.5 bg-green-600 rounded-full">
                                                            </div>
                                                        </div>
                                                        <div className="w-11/12">
                                                            <p className="text-sm">
                                                                {approver.user_id === "qltt" ? "Quản lý trực tiếp" : approver.user_id === "hr" ? "HR Manager" : approver.user_id === "ceo" ? "CEO" : approver.user_id}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {approver.user_id === "qltt" ?
                                                                    statusApprover.status === 1 ? "Đã duyệt" :
                                                                    statusApprover.status === 2 ? "Từ chối" :
                                                                    "Chờ duyệt" :
                                                                approver.user_id === "hr" ?
                                                                    statusApprover.hr_status === 1 ? "Đã duyệt" :
                                                                    statusApprover.hr_status === 2 ? "Từ chối" :
                                                                    "Chờ duyệt" :
                                                                approver.user_id === "ceo" ?
                                                                    statusApprover.fully_accept === 1 ? "Đã duyệt" :
                                                                    statusApprover.fully_accept === 2 ? "Từ chối" :
                                                                    "Chờ duyệt" : ""}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <table className='w-full border'>
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2">Tên trường</th>
                                            <th className="px-4 py-2">Giá trị</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(jsonObject).map(([key, value]) => (

                                            <tr key={key}>
                                                <td className='font-bold border p-2'>
                                                    {
                                                        key=="follower"?
                                                        "Quản lý trực tiếp:":
                                                        key=="id_user"?
                                                        "Người tạo":
                                                        key=="id_template"?
                                                        null:
                                                        key=="request_name"?
                                                        "Tiêu đề":
                                                        inputDetailRequests[key]
                                                    }
                                                </td>
                                                <td className='m-3 border p-2'>
                                                    {
                                                        key=="follower"?
                                                        userList[value]:
                                                        key=="id_user"?
                                                        userList[value]:
                                                        key=="id_template"?
                                                        null:
                                                        typeof value === 'object'?
                                                        <a className='text-green-500 font-bold' href={value.file_path} download>
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
