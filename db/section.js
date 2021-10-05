import Model, { constaint } from "./modelClass.js";

import db from "./db.js";
const Section = new Model(
  "Section",
  `SectionID ${constaint.Datatype.INT + constaint.UNIQUE}AUTO_INCREMENT ,
  name ${constaint.Datatype.VARCHAR() + constaint.NOT_NULL + constaint.UNIQUE},
    ${constaint.PRIMARY_KEY} (SectionID)`,
  db
);

export default Section;
