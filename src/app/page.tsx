import Signin from "@/components/signin/signin";
import styles from "./page.module.css";
import Signout from "@/components/signout/signout";
import Signup from "@/components/signup/signup";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session: any = await getServerSession(authOptions);
  return (
    <main className={styles.main}>
      <div style={{ display: "flex" }}>
        {session ? session.user.user.username + " 님" : "로그인 필요"}
        <div style={{ width: 10 }} />
        {session ? (
          <Signout />
        ) : (
          <div>
            <Signin /> <Signup />
          </div>
        )}
      </div>
    </main>
  );
}
