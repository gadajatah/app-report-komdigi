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
            ->with('user')
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('where_is', 'like', "%{$search}%")
                    ->orWhere('status', 'like', "%{$search}%");
            });

        if (auth()->user()->getRoleNames()[0] !== "root") {
            $reports = $reports->where('user_id', auth()->user()->id); // ← filter by user_id
        }

        $reports = $reports->latest()
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
        $validated = $request->validated();

        if ($validated) {
            DB::beginTransaction();

            try {
                $report = new Report();
                $report->user_id = auth()->user()->id;
                $report->title = $validated['title'];
                $report->where_is = $validated['where_is'];
                $report->phone = $validated['phone'];
                $report->image = $validated['image'] ?? null;
                $report->report = $validated['report'];
                $report->status = 'menunggu';
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
    public function update(ReportRequest $request, Report $report)
    {
        $validated = $request->validated();

        if ($validated) {
            $report->update([
                'title' => $validated['title'],
                'where_is' => $validated['where_is'],
                'phone' => $validated['phone'],
                'image' => $validated['image'],
                'report' => $validated['report'],
                'status' => $validated['status'] ?? 'menunggu',
            ]);
        }
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
