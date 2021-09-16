CREATE TABLE "User" (
    "idUser" SERIAL NOT NULL UNIQUE,
    "userName" VARCHAR(100),
    "hash" VARCHAR,
    "salt" VARCHAR,

    PRIMARY KEY ("idUser")
);

CREATE TABLE "Folder" (
    "idFolder" SERIAL NOT NULL,
    "name" VARCHAR(50),
    "folderCompleted" BOOLEAN,
    "idUser" INT NOT NULL,

    PRIMARY KEY ("idFolder"),
    FOREIGN KEY ("idUser") REFERENCES "User"
);

CREATE TABLE "Item" (
    "idItem" SERIAL NOT NULL,
    "text" TEXT,
    "itemCompleted" BOOLEAN,
    "idFolder" INT NOT NULL,

    PRIMARY KEY ("idItem"),
    FOREIGN KEY ("idFolder") REFERENCES "Folder"
);