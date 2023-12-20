import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import { useState } from 'react';
export default function Request_list({ auth ,allLeaderAdmin,userRequests }) {
    const [showModalDetailRequest, setShowModalDetailRequest] = useState(false);
    const [requestDetailData, setRequestDetailData] = useState(null);
    const openModal = (request) => {
        setRequestDetailData(request);
        setShowModalDetailRequest(true);
    }
    const closeModal = () => {
        setShowModalDetailRequest(false);
    }
    const handleApprover = (e) => {
        console.log(e.target.value);
        e.preventDefault();
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
                                    {userRequests.map((request, index) => (
                                        <tr>
                                            <td className="border px-4 py-2">{request.id}</td>
                                            <td className="border px-4 py-2"><span className='font-bold'>[{request.template_name}]</span>{request.user_name}</td>
                                            <td className="border px-4 py-2">{request.user_name}</td>
                                            <td className="border px-4 py-2"></td>
                                            <td className="border px-4 py-2">
                                                <select onChange={handleApprover}>
                                                    <option value="0">Chờ duyệt</option>
                                                    <option value="1">Đã duyệt</option>
                                                    <option value="2">Từ chối</option>
                                                </select>
                                            </td>
                                            <td className="border px-4 py-2">{request.created_at}</td>
                                            <td className="border px-4 py-2"><PrimaryButton onClick={()=>{openModal(request.content_request)}} as="button"  className="block mt-4 text-blue-500">Chi tiết</PrimaryButton></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showModalDetailRequest} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="font-bold">Nội dung Request</h2>

                    {requestDetailData && (() => {
                        const jsonObject  = JSON.parse(requestDetailData);

                        return (
                            <div>
                                {Object.entries(jsonObject).map(([key, value]) => (
                                    <div key={key}>
                                        {/* {key} : {typeof value === 'object' ? JSON.stringify(value) : value} */}
                                        {key} : {typeof value === 'object' ? value.file_name : value}
                                    </div>
                                ))}
                            </div>
                        );
                    })()}
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
