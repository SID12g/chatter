export default function Chatting({
  id,
  userid,
}: {
  id: string;
  userid: string;
}) {
  const chats = [{}];
  return (
    <div>
      <form method="POST" action="/api/chatting/add">
        <input style={{ display: "none" }} defaultValue={userid} name="owner" />
        <input style={{ display: "none" }} defaultValue={id} name="group" />
        <input placeholder="보낼거" name="chat" />
        <button type="submit">전송</button>
      </form>
      <div>
        {chats.map((a: any, i: number) => (
          <div key={i}>
            <div
              style={
                userid == a.owner
                  ? { backgroundColor: "aqua", padding: 10 }
                  : { backgroundColor: "red", padding: 10 }
              }
            >
              {a.chat}
            </div>
            <br /> {a.owner}
            {a.createAt}
            <br />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
