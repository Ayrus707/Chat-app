import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb'; // or your prisma instance
import getCurrentUser from '@/app/actions/getCurrentUser'; // update path as per your structure

export async function DELETE() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Delete user from DB
    await prisma.user.delete({
      where: { id: currentUser.id },
    });

    return NextResponse.json({ message: 'Account deleted' });
  } catch (error) {
    console.error('[DELETE_ACCOUNT_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
