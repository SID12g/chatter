import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

export default async function Chat({ params }: { params: { id: string } }) {
  const session: any = await getServerSession(authOptions);
  let db = (await connectDB).db("chat");
  let chats;

  chats = await db.collection("chatting").find({ group: params.id }).toArray();
  let date = new Date();
  const collection = db.collection("chatting");
  const changeStream = collection.watch();
  changeStream.on("change", async (result) => {
    console.log("change, ", date);
    chats = await db
      .collection("chatting")
      .find({ group: params.id })
      .toArray();
  });

  async function findUser(userid: string) {
    let db = (await connectDB).db("auth");
    let user = await db
      .collection("users")
      .find({ _id: new ObjectId(userid) })
      .toArray();
    console.log(user[0].username);
    return user[0].username;
  }

  return (
    <div>
      {params.id + " 방"}
      <form method="POST" action="/api/chatting/add">
        <input
          style={{ display: "none" }}
          defaultValue={session.user.user._id.toString()}
          name="owner"
        />
        <input
          style={{ display: "none" }}
          defaultValue={params.id}
          name="group"
        />
        <input placeholder="보낼거" name="chat" />
        <button type="submit">전송</button>
      </form>
      <div>
        {chats.map((a, i) => (
          <div key={i}>
            <div
              style={
                session.user.user._id.toString() == a.owner
                  ? { backgroundColor: "aqua", padding: 10 }
                  : { backgroundColor: "red", padding: 10 }
              }
            >
              {a.chat}
            </div>
            <br /> {a.owner}
            {a.createAt.toString().substring(3, 24)}
            <br />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
