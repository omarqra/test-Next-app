import Model, { constaint } from "./modelClass.js";

import db from "./db.js";
const Articles = new Model(
  "Articles",
  `ArticleID ${constaint.Datatype.INT + constaint.UNIQUE}AUTO_INCREMENT ,
    title ${constaint.Datatype.VARCHAR(100) + constaint.NOT_NULL},
    htmlcontent text ${constaint.NOT_NULL},
    imageurl ${constaint.Datatype.VARCHAR(255) + constaint.NOT_NULL},
    description ${constaint.Datatype.VARCHAR(255) + constaint.NOT_NULL},
    writer ${constaint.Datatype.VARCHAR() + constaint.NOT_NULL},
    ${constaint.PRIMARY_KEY} (ArticleID)`,
  db
);

export default Articles;
