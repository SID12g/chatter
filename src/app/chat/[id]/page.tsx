import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Chat({ params }: { params: { id: string } }) {
  const session: any = await getServerSession(authOptions);
  return (
    <div>
      {params.id + " 방"}
      <form method="POST" action="/api/chatting.">
        <input
          style={{ display: "none" }}
          defaultValue={session.user.user._id.toString()}
          name="owner"
        />
        <input placeholder="보낼거" name="chat" />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}
