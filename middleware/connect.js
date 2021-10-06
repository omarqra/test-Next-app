import nc from "next-connect";

const connect = () => {
  return nc({
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
  });
};

export default connect;

// class Connect {
//   creatConnect() {
//     return nc({
//       onNoMatch(req, res) {
//         res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//       },
//     });
//   }
// }

// export default Connect;
