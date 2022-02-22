import { NextResponse, NextRequest } from 'next/server';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export function middleware(NextRequest,NextResponse) {
    const token = Cookies.get('userToken');
    console.log(token)
    // console.log(NextResponse)
    // return NextResponse
}