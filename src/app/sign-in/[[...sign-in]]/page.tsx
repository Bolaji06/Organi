import { SignIn } from "@clerk/nextjs";
import bg from "../../../../public/assets/login-bg.webp";
import styles from './styles.module.css'
export default function SignInPage() {
  return (
    <>
      <main
        className={`${styles.signin} flex justify-center items-center
        bg-cover bg-no-repeat bg-center h-screen pt-1 md:bg-none`}
      >
        <div className="md:ml-auto">
          <SignIn />  
        </div>
        
      </main>
    </>
  );
}
