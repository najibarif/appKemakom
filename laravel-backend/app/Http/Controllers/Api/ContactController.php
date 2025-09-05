<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::all();
        
        return response()->json([
            'data' => $contacts
        ]);
    }

    public function show(Contact $contact)
    {
        return response()->json([
            'data' => $contact
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string|in:email,phone,address',
            'title' => 'required|string|max:255',
            'info' => 'required|string',
        ]);

        $contact = Contact::create($request->all());

        return response()->json([
            'data' => $contact
        ], 201);
    }

    public function update(Request $request, Contact $contact)
    {
        $request->validate([
            'type' => 'sometimes|string|in:email,phone,address',
            'title' => 'sometimes|string|max:255',
            'info' => 'sometimes|string',
        ]);

        $contact->update($request->all());

        return response()->json([
            'data' => $contact
        ]);
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();

        return response()->json([
            'message' => 'Contact deleted successfully'
        ]);
    }
}