<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::table('comments', function (Blueprint $table) {
            // Thêm khóa ngoại cho user_id
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            // Thêm khóa ngoại cho request_id
            $table->unsignedBigInteger('request_id');
            $table->foreign('request_id')->references('id')->on('user_requests')->onDelete('cascade');

            // Thêm cột content

            $table->text('content');
        });
    }

    public function down()
    {
        Schema::table('comments', function (Blueprint $table) {
            // Xóa khóa ngoại
            $table->dropForeign(['user_id']);
            $table->dropForeign(['request_id']);

            // Xóa cột content
            $table->dropColumn('content');

            // Xóa thời gian tạo và cập nhật
            $table->dropTimestamps();
        });
    }
};
