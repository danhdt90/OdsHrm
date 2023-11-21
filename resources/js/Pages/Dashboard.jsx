import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import { useState } from 'react';
export default function Dashboard({ auth ,allTemplate }) {
    const [showModalNewRequest, setShowModalNewRequest] = useState(false);
    const openModal = () => {
        setShowModalNewRequest(true);
    }
    const closeModal = () => {
        setShowModalNewRequest(false);
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
                            {auth.user.email}
                            {auth.user.role == 99 && (
                                <div>
                                    <h3>Quản lý request</h3>
                                    {/* Nội dung quản lý request */}
                                </div>
                            )}
                            {auth.user.role == 1 && (
                                <div>
                                    <h3>Các đề xuất cần duyệt</h3>
                                    {/* Nội dung các đề xuất cần duyệt */}
                                </div>
                            )}
                            {auth.user.role == 0 && (
                                <div>
                                    <h3>Tạo đề xuất</h3>
                                    
                                </div>
                            )}
                            <PrimaryButton onClick={openModal}>Thêm Đề xuất</PrimaryButton>
                            <Modal show={showModalNewRequest} onClose={closeModal}>
                                <div className="p-6">
                                    <h3>Add new request</h3>
                                    <hr />
                                    {allTemplate.map((template, index) => (
                                        <Link key={index} method="get" as="button" href={route("Create_User_Request")} data={{ id_template: template.id }} className="block mt-4 text-blue-500">{template.template_name}</Link>
                                    ))}
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
