import mongoose from "mongoose";

export const buildLeaderboardPipeline = (
  gameId: string,
  userId?: string
): any[] => {
  const matchStage: any = { gameId: new mongoose.Types.ObjectId(gameId) };
  if (userId) matchStage.userId = new mongoose.Types.ObjectId(userId);

  const pipeline: any[] = [
    { $match: matchStage },
    { $sort: { score: -1 } },
    {
      $setWindowFields: {
        partitionBy: "$gameId",
        sortBy: { score: -1 },
        output: {
          rank: { $rank: {} },
        },
      },
    },
    {
      $addFields: {
        medal: {
          $switch: {
            branches: [
              {
                case: { $eq: ["$rank", 1] },
                then: "https://res.cloudinary.com/adanna-nnajiofor/image/upload/v1746732118/Medal_gold_fm9lw0.png",
              },
              {
                case: { $eq: ["$rank", 2] },
                then: "https://res.cloudinary.com/adanna-nnajiofor/image/upload/v1746731540/Medal_silver_kd4q48.png",
              },
              {
                case: { $eq: ["$rank", 3] },
                then: "https://res.cloudinary.com/adanna-nnajiofor/image/upload/v1746731527/Medal_bronze_ayymxk.png",
              },
            ],
            default:
              "https://res.cloudinary.com/adanna-nnajiofor/image/upload/v1746731746/I_tried_medal_sguscj.png",
          },
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: 0,
        userId: 1,
        username: "$user.username",
        score: 1,
        rank: 1,
        medal: 1,
      },
    },
  ];

  if (!userId) {
    pipeline.push({ $skip: skip }, { $limit: limit });
  } else {
    pipeline.push({ $limit: 1 });
  }

  return pipeline;
};
