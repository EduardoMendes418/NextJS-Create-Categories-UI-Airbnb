'use client'
import { useRouter } from 'next/navigation';
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Modal from '../modals';
import Heading from '../../Heading/heading';
import Input from '../../Inputs/input';
import Button from '../../Buttons/button';



const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const{
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            email:'',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials',{
            ... data,
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false);

            if(callback?.ok){
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose();
            }

            if(callback?.error){
                toast.error(callback.error);
            }
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcome back'
                subtitle='Login to your account!'
            />
            <Input
                id='email'
                label='E-mail'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
              <Input
                id='password'
                type='password'
                label='Password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent  = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr/>
            <Button 
                disabled
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => {}}
            />

            <Button 
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => {}}
            />
            <div className=' text-neutral-500 text-center mt-4 font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div
                    onClick={registerModal.onClose}
                    className='text-neutral-800 cursor-pointer hover:underline'
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

  return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title='Login'
            actionLabel='Continue'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
  );
}

export default LoginModal;