<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReportRequest;
use App\Http\Resources\ReportResource;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $reports = Report::query()
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('where_is', 'like', "%{$search}%")
                    ->orWhere('status', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(9)
            ->withQueryString();

        return inertia('reports/index', [
            'reports' => fn () => ReportResource::collection($reports),
            'roles' => Role::query()->select(['id', 'name'])->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ReportRequest $request)
    {
        $validated = $request->validated;

        if ($validated) {
            DB::beginTransaction();

            try {
                $report = new Report();
                $report->title = $validated['title'];
                $report->where_is = $validated['where_is'];
                $report->phone = $validated['phone'];
                $report->image = $validated['image'];
                $report->report = $validated['report'];
                $report->save();

                DB::commit();
                flash('Laporan berhasil dibuat');
            } catch (\Exception $e) {
                DB::rollBack();

                info("error-store-report", [
                    'message' => $e->getMessage(),
                ]);
                flash('Server error.', [], 'error');
            }
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Report $report)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
        $report->delete();
        flash('Laporan berhasil dihapus');
    }
}
