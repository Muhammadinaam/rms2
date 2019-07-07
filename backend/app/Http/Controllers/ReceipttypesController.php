<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Receipttype;
use DB;

class ReceipttypesController extends Controller
{
    public function index()
    {
        $data = Receipttype::where('name', 'like', '%'.request()->search.'%')
            ->paginate(10);
        return $data;
    }

    public function store()
    {
        $this->validate(request(), [
            'name' => 'required|unique:receipttypes,name',
        ]);

        try {
            
            DB::beginTransaction();

            $model = new Receipttype();

            $this->saveRequestDataToModel($model);

            DB::commit();
            return ['success' => true, 'id' => $model->id];

        } catch (\Throwable $ex) {
            DB::rollBack();
            return ['success' => false, 'message' => $ex->getMessage()];
        }
    }

    public function edit($id)
    {
        return Receipttype::find($id);
    }

    public function update($id)
    {
        $this->validate(request(), [
            'name' => 'required|unique:receipttypes,name,' . $id,
        ]);

        try {
            
            DB::beginTransaction();

            $model = Receipttype::find($id);

            $this->saveRequestDataToModel($model);

            DB::commit();
            return ['success' => true, 'id' => $model->id];

        } catch (\Throwable $ex) {
            DB::rollBack();
            return ['success' => false, 'message' => $ex->getMessage()];
        }
    }

    private function saveRequestDataToModel($model)
    {
        $model->name = request()->name;
        
        $model->amount_can_be_more_than_bill = request()->amount_can_be_more_than_bill;
        $model->customer_name_required = request()->customer_name_required;
        $model->auto_add = request()->auto_add;

        $model->is_activated = request()->is_activated;

        $model->save();
    }
}
