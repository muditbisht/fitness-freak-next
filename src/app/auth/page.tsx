"use client"
import Login from '@/components/Login';
import AuthPageLayout from '@/components/layout/AuthPageLayout'
import { NextPage } from 'next';

const AuthPage: NextPage = () => <AuthPageLayout>
    <Login />
</AuthPageLayout>

export default AuthPage;