CREATE TABLE IF NOT EXISTS AllSubmissions (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
	"incorrect_ratio" REAL NOT NULL,
	"avg_confidence_incorrect" REAL NOT NULL,
	"avg_confidence_gap" REAL NOT NULL,
	"avg_l2_perturbation" REAL NOT NULL,
	"avg_ssim" REAL NOT NULL,
	"score" REAL NOT NULL,
	"team_name" TEXT(256) NOT NULL,
	"time_stamp" TEXT(256) NOT NULL
);