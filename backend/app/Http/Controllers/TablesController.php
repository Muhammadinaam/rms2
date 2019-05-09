<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Table;
use DB;

class TablesController extends Controller
{
    public function index()
    {
        $tables = Table::where('name', 'like', '%'.request()->search.'%')
            ->orWhere('floor', 'like', '%'.request()->search.'%')
            ->paginate(10);
        return $tables;
    }

    public function store()
    {
        $this->validate(request(), [
            'name' => 'required',
            'floor' => 'required',
        ]);

        try {
            
            DB::beginTransaction();

            $table = new Table();

            $this->saveRequestDataToItem($table);

            DB::commit();
            return ['success' => true, 'id' => $table->id];

        } catch (\Throwable $ex) {
            DB::rollBack();
            return ['success' => false, 'message' => $ex->getMessage()];
        }
    }

    public function edit($id)
    {
        return Table::find($id);
    }

    public function update($id)
    {
        $this->validate(request(), [
            'name' => 'required',
            'floor' => 'required',
        ]);

        try {
            
            DB::beginTransaction();

            $table = Table::find($id);

            $this->saveRequestDataToItem($table);

            DB::commit();
            return ['success' => true, 'id' => $table->id];

        } catch (\Throwable $ex) {
            DB::rollBack();
            return ['success' => false, 'message' => $ex->getMessage()];
        }
    }

    private function saveRequestDataToItem($table)
    {
        $table->name = request()->name;
        $table->floor = request()->floor;
        $table->is_activated = request()->is_activated;

        $table->save();
    }

    public function getFloors()
    {
        $floors = DB::table('tables')->select('floor')->groupBy('floor')->get()->pluck('floor');
        return $floors;
    }
}
