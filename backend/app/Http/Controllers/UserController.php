<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function create(Request $request)
    {
        header(
            'Access-Control-Allow-Origins: *',
            'Origin, Content-Type, Authorization',
            'Access-Control-Allow-Credentials: true',
            'Access-Control-Allow-Methods: GET, HEAD, OPTIONS, POST, PUT'
        );

        $data = $request->all();
        $data['api_token'] = str_random(60);

        if (!User::where('email', $data['email'])->count()) {
            $data['password'] = bcrypt($data['password']);
            $user = User::create($data);
            return response()->json([
                'data' => $user, 'status' => true
            ]);
        }

        return response()->json([
            'data' => "Usuário já cadastrado!", 'status' => false,
            'headers' => 'Access-Control-Allow-Origin: http://localhost:4200'
        ]);
    }

    public function delete($id)
    {
        $player = User::findOrFail($id);
        $player->delete();

        return response()->json(null, 204);
    }
}
