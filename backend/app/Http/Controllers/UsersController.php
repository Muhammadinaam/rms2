<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\User;
use App\UserPermission;
use Illuminate\Support\Facades\Hash;
use DB;
use \stdClass;

class UsersController extends Controller
{
    public function index()
    {
        $users = User::
            where('name', 'like', '%'.request()->search.'%')
            ->orWhere('userid', 'like', '%'.request()->search.'%')
            ->orWhere('email', 'like', '%'.request()->search.'%')
            ->orWhere('user_type', 'like', '%'.request()->search.'%')
            ->paginate(10);
        return $users;
    }

    public function store()
    {
        $this->validate(request(), [
            'name' => 'required',
            'userid' => 'required|unique:users',
            'email' => 'unique:users|nullable',
            'password' => 'required',
        ]);

        try {    
            DB::beginTransaction();

            $user = new User();

            $this->saveRequestDataToUser($user);

            DB::commit();

            return ['success' => true, 'id' => $user->id];

        } catch (\Throwable $ex) {
            DB::rollBack();
            return ['success' => false, 'message' => $ex->getMessage()];
        }
    }

    private function saveRequestDataToUser($user)
    {
        $user->name = request()->name;
        $user->userid = request()->userid;
        $user->email = request()->email;

        if(request()->password != '')
        {
            $user->password = Hash::make(request()->password);
        }

        $user->user_type = request()->user_type;
        $user->is_activated = request()->is_activated;

        $user->save();

        UserPermission::where('user_id', $user->id)->delete();
        foreach(request()->permissions as $permission_idt => $value)
        {
            if($value) {
                $userPermission = new UserPermission();
                $userPermission->user_id = $user->id;
                $userPermission->permission_idt = $permission_idt;
                $userPermission->save();
            }
        }
    }

    public function edit($id)
    {
        $user = User::find($id);
        
        $permissions = $user->userPermissions;
        
        $userPermissions = new stdClass();
        
        foreach($permissions as $permission)
        {
            $userPermissions->{$permission->permission_idt} = true;
        }

        $user->permissions = $userPermissions;

        return $user;
    }

    public function update($id)
    {
        $this->validate(request(), [
            'name' => 'required',
            'userid' => 'required|unique:users,userid,' . $id,
            'email' => 'nullable|unique:users,email,' . $id,
        ]);

        try {    
            DB::beginTransaction();

            $user = User::find($id);

            $this->saveRequestDataToUser($user);

            DB::commit();

            return ['success' => true, 'id' => $user->id];

        } catch (\Throwable $ex) {
            DB::rollBack();
            return ['success' => false, 'message' => $ex->getMessage()];
        }
    }
}
