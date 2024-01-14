import React from 'react';
const RequestDetail = ({auth, requestDetailData, flowApprover, statusApprover, userList, inputDetailRequests }) => {
  if (!requestDetailData) {
    return null;
  }
  const jsonObject = JSON.parse(requestDetailData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData(e.target);
        await axios.post(route('Create_User_Request'), formData);
        window.location.href = route('dashboard');

    } catch (error) {
        console.error(error);
    }
}
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
                    {console.log(jsonObject)}

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
                                inputDetailRequests.find(input => input.input_name === key)?.input_description
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
};

export default RequestDetail;
