<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/list', function () {
    $users = App\User::all();
    return response()->json(['data' => $users, 'status' => true]);
});

Route::post('/login', function (Request $request) {
    $data = $request->all();
    if (Auth::attempt(['email' => $data['email'], 'password' => $data['password']])) {
        return response()->json(['data' => Auth::user(), 'status' => true]);
    } else {
        return response()->json(['data' => 'Erro ao fazer login!', 'status' => false]);
    }
});

Route::get('/user/list', 'UserController@index');
Route::post('/user/create', 'UserController@create');
Route::put('/user/edit/{id}', 'UserController@edit');
Route::delete('/user/{id}', 'UserController@delete');
