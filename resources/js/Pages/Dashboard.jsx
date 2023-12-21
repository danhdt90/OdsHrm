import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import { useState } from 'react';
import DangerButton from '@/Components/DangerButton';
export default function Dashboard({ auth ,allTemplate , userRequests ,needApprove}) {
    const [showModalNewRequest, setShowModalNewRequest] = useState(false);
    const openModal = () => {
        setShowModalNewRequest(true);
    }
    const closeModal = () => {
        setShowModalNewRequest(false);
    }

    const [showModalDetailRequest, setShowModalDetailRequest] = useState(false);
    const [requestDetailData, setRequestDetailData] = useState(null);

    const openModalDetailRequest = (request) => {
        setRequestDetailData(request);
        setShowModalDetailRequest(true);
    }
    const closeModalDetailRequest = () => {
        setShowModalDetailRequest(false);
    }
    const handleDeleteRequest = (id) => {
        return () => {
            axios.delete(route('Delete_User_Request', id)).then(response => {
                console.log(response.data);
                if (response.data.status === true) {
                    window.location.reload();
                }
            });
        }
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-4 grid-rows-1 gap-4">
                                <div className="row-span-2">
                                    <h3>Thông tin cá nhân</h3>
                                    <div className=''>
                                        <div class="-mx-6 px-6 py-4 text-center">
                                            <a href="#" title="home" className='text-center'>
                                                <img class="w-32" src={(auth.user.avatar)?'/storage/avatars/'+auth.user.avatar : 'https://th.bing.com/th/id/R.a9fc8abba0093589686a9550d21ee743?rik=1iof%2b%2bYe5k84QQ&pid=ImgRaw&r=0'} alt="" set="" />
                                            </a>
                                        </div>
                                        <div className=''>
                                            <p>Họ và tên: {auth.user.name}</p>
                                            <p>Email: {auth.user.email}</p>
                                            <p>Chức vụ: {auth.user.role == 99 ? 'Admin' : 'User'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-3 row-span-2">
                                    <PrimaryButton className='my-3' onClick={openModal}>Thêm Đề xuất</PrimaryButton>

                                    {(auth.user.role == 1 ||auth.user.role == 99) && (
                                        <>
                                            <div>
                                                <h1 className='font-bold'>Các đề xuất cần duyệt:</h1>
                                            </div>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th className="px-4 py-2">STT</th>
                                                        <th className="px-4 py-2">Request Name</th>
                                                        <th className="px-4 py-2">Người tạo</th>
                                                        <th className="px-4 py-2">Ngày tạo</th>
                                                        <th className="px-4 py-2">Chi tiết</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {needApprove.map((request, index) => (
                                                        <tr>
                                                            <td className="border px-4 py-2">{index+1}</td>
                                                            <td className="border px-4 py-2"><span className='font-bold'>[{request.template_name}]</span></td>
                                                            <td className="border px-4 py-2">{request.user_name}</td>
                                                            <td className="border px-4 py-2">{request.created_at}</td>
                                                            <td className="border px-4 py-2"><PrimaryButton onClick={()=>{openModalDetailRequest(request.content_request)}} method="get" as="button"  className="block mt-4 text-blue-500">Chi tiết</PrimaryButton></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </>
                                    )}
                                    <div className='my-5'>
                                        <h3 className='font-bold'>Các đề xuất đã tạo:</h3>
                                    </div>
                                    <table class="table-auto">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2">STT</th>
                                                <th className="px-4 py-2">Request Name</th>
                                                <th className="px-4 py-2">Status</th>
                                                <th className="px-4 py-2">Ngày tạo</th>
                                                 <th className="px-4 py-2">Chi tiết</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userRequests.map((request, index) => (
                                                    <tr>
                                                    <td className="border px-4 py-2">{index+1}</td>
                                                    <td className="border px-4 py-2"><span className='font-bold'>[{request.template_name}]</span>{request.user_name}</td>
                                                    <td className="border px-4 py-2">
                                                        {request.status==0?"Chờ duyệt":request.status==1?"Đã duyệt":"Từ chối"}
                                                    </td>
                                                    <td className="border px-4 py-2">{request.created_at}</td>
                                                    <td className="border px-4 py-2"><PrimaryButton onClick={()=>{openModalDetailRequest(request.content_request)}} method="get" as="button"  className="block mt-4 text-blue-500">Chi tiết</PrimaryButton>
                                                    <DangerButton onClick={handleDeleteRequest(request.id)}> Xóa Request </DangerButton>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                            <Modal show={showModalNewRequest} onClose={closeModal}>
                                <div className="p-6">
                                    <h3>Add new request</h3>
                                    <hr />
                                    {allTemplate.map((template, index) => (
                                        <Link key={index} method="get" as="button" href={route("Create_User_Request_Screen")} data={{ id_template: template.id }} className="block mt-4 text-blue-500">{template.template_name}</Link>
                                    ))}
                                </div>
                            </Modal>
                            <Modal show={showModalDetailRequest} onClose={closeModalDetailRequest}>
                                <div className="p-6">
                                    <h2 className="font-bold">Nội dung Request</h2>
                                    <hr />
                                    <div className='p-2'>
                                        {requestDetailData && (() => {
                                            const jsonObject  = JSON.parse(requestDetailData);
                                            return (
                                                <div>
                                                    {Object.entries(jsonObject).map(([key, value]) => (
                                                        <div key={key}>
                                                            <span>{key}</span> : <span>{typeof value === 'object' ? value.file_name : value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            );
                                        })()}
                                    </div>

                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
