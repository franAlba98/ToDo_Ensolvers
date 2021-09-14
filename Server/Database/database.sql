CREATE TABLE "Folder" (
    "idFolder" SERIAL NOT NULL,
    "name" VARCHAR(50),
    "folderCompleted" BOOLEAN,

    PRIMARY KEY ("idFolder")
);

CREATE TABLE "Item" (
    "idItem" SERIAL NOT NULL,
    "text" TEXT,
    "itemCompleted" BOOLEAN,
    "idFolder" INT NOT NULL,

    PRIMARY KEY ("idItem"),
    FOREIGN KEY ("idFolder") REFERENCES "Folder"
);