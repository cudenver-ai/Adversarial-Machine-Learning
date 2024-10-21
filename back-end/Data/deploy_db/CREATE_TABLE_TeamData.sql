CREATE TABLE IF NOT EXISTS TeamData (
	"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"TeamName" TEXT(256) NOT NULL,
	"LastSubmission" TEXT(256) NOT NULL,
	"SuccessRate" REAL NOT NULL,
	"PerturbationMagnitude" REAL NOT NULL,
	"AverageConfidence" REAL NOT NULL,
	"ConfidenceGap" REAL NOT NULL,
	"VisualSimilarity" REAL NOT NULL,
	"TotalScore" REAL NOT NULL,
	"Rank" INTEGER NOT NULL
);