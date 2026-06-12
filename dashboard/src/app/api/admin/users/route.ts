import { NextResponse } from 'next/server';
import { UsersBFFService } from '../../../../bff/users.service';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// GET handler: Returns the list of users
export async function GET() {
  try {
    const users = await UsersBFFService.getUsers();
    return NextResponse.json(users, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500, headers: corsHeaders });
  }
}

// POST handler: Create a new user
export async function POST(request: Request) {
  try {
    const newUser = await request.json();
    const createdUser = await UsersBFFService.addUser(newUser);
    return NextResponse.json(createdUser, { status: 201, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500, headers: corsHeaders });
  }
}

// PATCH handler: Updates a user's status
export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    const updatedUser = await UsersBFFService.updateStatus(id, status);
    
    return NextResponse.json(updatedUser, { headers: corsHeaders });
  } catch (error: any) {
    if (error.message === 'User not found') {
      return NextResponse.json({ error: error.message }, { status: 404, headers: corsHeaders });
    }
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500, headers: corsHeaders });
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
