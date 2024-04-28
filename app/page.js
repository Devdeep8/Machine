'use client'

import { useEffect } from 'react';
import Image from "next/image";
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { getSession } from 'next-auth/react'; // Import getSession
import {signIn,  useSession} from "next-auth/react"
import { useRouter } from "next/navigation";

export default function Home({  }) {
  const session = useSession()
  const router = useRouter()
  useEffect(() => {
    if(session.status === 'authenticated' && session.data != "null" ){
      router.push('/dashboard');
    }
  }, [session]);

  return (
    <>
      <main className="flex min-h-screen  flex-col">
        <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        </div>
        <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
          <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/4 md:px-20  ">
            <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal `}>
              <strong>Welcome to Stock-Management-App.</strong> This is Machine App{' '}
              <a href="https://devdeepp.vercel.app/" target='_blank' className="text-blue-500">
                Devdeep 
              </a>
            </p>
            {session.status === 'unauthenticated'  ? (
              <div className="flex items-center gap-5 self-start rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-teal-400 md:text-base">
              <button onClick={signIn} className="px-5 py-5 bg-teal-500 rounded-md flex justify-center items-center"> login </button> <ArrowRightIcon className="w-5 md:w-6 text-black"/>
              </div>
            ) : (
              <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal `}>
                 <strong>Welcome to Stock-Management-App.</strong>
                </p>
            )}

            {/* {!session ? (
            //   <Link href="/signup" className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base">
            //     <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
            //   </Link>
            // ) : (
            //   <p>Welcome, {session.user.name}!</p>
            //   // Render user-specific content here
            // )} */}
          </div>
          <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
            {/* Add Hero Images Here */}
            <Image
              src="/hero-desktop.png"
              width={1000}
              height={760}
              priority={true} // {false} | {true}
              className='hidden md:block'
              alt='screenshots of the dashboard project showing desktop version' 
            />
            <Image
              src="/hero-mobile.png"
              width={560}
              height={620}
              className=' block md:hidden'
              alt='screenshots of the dashboard project showing mobile version' 
            />
          </div>
        </div>
      </main>
    </>
  );
}

export async function getSessionProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}

