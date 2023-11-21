import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import { useState } from 'react';
import DangerButton from '@/Components/DangerButton';
export default function Create_request({ auth ,inputDetailRequests}) {
  
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tạo mới đề xuất:</h2>}
        >
            <Head title="Create Request" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="">Tạo mới đề xuất: </h1>
                           <hr />
                           <div className="bg-white">

                           </div>
                           <div class="p-6">
                            <form action="">
                                    {
                                    inputDetailRequests.map((input, index) => (
                                        <div class="my-6" key={index}>
                                            <label htmlFor="">{input.input_description}</label>
                                            
                                            <input type={input.input_type} name={input.name} id="" placeholder={input.placeholder} className="block w-full p-2 border border-gray-300 rounded-md" />
                                        </div>
                                    ))  
                                    }
                                    <PrimaryButton type="submit">Tạo mới</PrimaryButton>
                                    <DangerButton type="reset">Reset</DangerButton>
                            </form>
                           </div>
                           
                            
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
