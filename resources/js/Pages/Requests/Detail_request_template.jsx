
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Dashboard({ auth,template }) {
  return (
      <AuthenticatedLayout
          user={auth.user}
          header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Template</h2>}
      >
          <Head title="Dashboard" />
          
          <div className="py-12">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  <div className="mx-6 bg-white overflow-hidden shadow-sm sm:rounded-lg divide-y">
                    <div className="p-6 flex place-content-around">
                      <h2>Request form</h2>
                      <PrimaryButton className='float-right space-around'>+ Add</PrimaryButton>
                    </div>
                    <div className="p-6">
                      
                    </div>
                  </div>
              </div>
          </div>
      </AuthenticatedLayout>
  );
}
