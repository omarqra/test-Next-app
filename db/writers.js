import Model, { constaint } from "./modelClass.js";

import db from "./../DB/database.js";
const Writers = new Model(
  "Writers",
  ` 
    WriterID ${
      constaint.Datatype.VARCHAR() + constaint.UNIQUE + "AUTO_INCREMENT"
    }  ,
    name ${constaint.Datatype.VARCHAR() + constaint.NOT_NULL},
    password ${constaint.Datatype.VARCHAR() + constaint.NOT_NULL},
    imageUrl ${constaint.Datatype.VARCHAR(255) + constaint.NOT_NULL},
    articles ${constaint.Datatype.INT + constaint.DEFAULT + "0"},
    ${constaint.PRIMARY_KEY} (id)
    `,
  db
);

Writers.creatTable();
export default Writers;
