<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImagesController extends Controller
{
    //

    public function storeImage()
    {
        $folder = request()->input('folder');

        $filename = uniqid() . '-' . time().'.'.request()->image->getClientOriginalExtension();
        request()->image->move(public_path('images/' . $folder), $filename);
        $file_with_path = $folder . '/' . $filename;
        
        return response()->json([
            'file_with_path' => $file_with_path,
        ]);
    }

    
}
