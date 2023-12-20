<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIdUserRequestToUserRequestApproverTable extends Migration
{
    public function up()
    {
        Schema::table('user_request_approver', function (Blueprint $table) {
            $table->unsignedBigInteger('id_user_request');

            // Tạo khóa ngoại
            $table->foreign('id_user_request')->references('id')->on('user_requests');
        });
    }

    public function down()
    {
        Schema::table('user_request_approver', function (Blueprint $table) {
            // Xóa khóa ngoại
            $table->dropForeign(['id_user_request']);
            $table->dropColumn('id_user_request');
        });
    }
}

