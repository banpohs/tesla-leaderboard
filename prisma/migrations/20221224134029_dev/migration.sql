-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_leaderboard" (
    "idx" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "studentID" TEXT NOT NULL,
    "seconds" INTEGER NOT NULL,
    "staff" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_leaderboard" ("createdAt", "idx", "name", "seconds", "studentID") SELECT "createdAt", "idx", "name", "seconds", "studentID" FROM "leaderboard";
DROP TABLE "leaderboard";
ALTER TABLE "new_leaderboard" RENAME TO "leaderboard";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
