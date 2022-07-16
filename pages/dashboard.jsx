import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import Header from "../components/Header";
export default function Component() {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);
  if (session) {
    return (
      <>
        {/* <Header /> */}
        <div className="min-h-screen max-w-screen">
          <div></div>
        </div>
      </>
    );
  }
  // return (
  //   <>
  //     Not signed in <br />
  //     <button onClick={() => signIn()}>Sign in</button>
  //   </>
  // );
}
