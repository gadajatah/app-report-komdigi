<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
        'title'    => 'sometimes|nullable|string',
        'where_is' => 'sometimes|nullable|string',
        'phone'    => 'sometimes|nullable|string',
        'report'   => 'sometimes|nullable|string',
        'status'   => 'sometimes|nullable|in:menunggu,proses,selesai',
        ];
    }
}
